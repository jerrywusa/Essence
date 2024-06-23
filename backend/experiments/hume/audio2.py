import os
import base64
import asyncio
from io import BytesIO
from pydub import AudioSegment
from pydub.utils import make_chunks
from hume import HumeStreamClient
from hume.models.config import ProsodyConfig
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials, storage
import json
from moviepy.editor import VideoFileClip
import subprocess

# Load environment variables from .env file
load_dotenv()

# Initialize Firebase
cred = credentials.Certificate("../../serviceAccountKey.json")
firebase_admin.initialize_app(cred, {'storageBucket': os.getenv("FIREBASE_BUCKET_NAME")})

# Get the HUME_API_KEY from environment variables
HUME_API_KEY = os.getenv("HUME_API_KEY")

# Ensure the API key is loaded correctly
if not HUME_API_KEY:
    raise ValueError("HUME_API_KEY not found in environment variables")

async def download_video_from_firebase(video_id: str) -> BytesIO:
    bucket = storage.bucket()
    blob = bucket.blob(f"videos/{video_id}")
    if not blob.exists():
        raise ValueError(f"Video {video_id} not found in Firebase Storage")

    video_stream = BytesIO()
    try:
        blob.download_to_file(video_stream)
        video_stream.seek(0)  # Reset stream position to the beginning
    except Exception as e:
        raise ValueError(f"Failed to download video: {e}")
    return video_stream

def reprocess_video_with_ffmpeg(input_path: str, output_path: str):
    try:
        subprocess.run(['ffmpeg', '-i', input_path, '-c', 'copy', output_path], check=True)
    except subprocess.CalledProcessError as e:
        raise ValueError(f"Failed to reprocess video with ffmpeg: {e}")

def extract_audio_from_video(video_stream: BytesIO) -> BytesIO:
    # Save the video stream to a temporary file
    temp_video_path = "temp_video.mp4"
    try:
        with open(temp_video_path, "wb") as temp_video_file:
            temp_video_file.write(video_stream.read())
    except Exception as e:
        raise ValueError(f"Failed to write video to temp file: {e}")

    # Reprocess the video with ffmpeg to fix potential issues
    reprocessed_video_path = "reprocessed_video.mp4"
    reprocess_video_with_ffmpeg(temp_video_path, reprocessed_video_path)

    # Load the reprocessed video using moviepy
    try:
        video = VideoFileClip(reprocessed_video_path)
    except Exception as e:
        raise ValueError(f"Failed to load reprocessed video file: {e}")

    # Extract audio
    temp_audio_path = "temp_audio.mp3"
    try:
        video.audio.write_audiofile(temp_audio_path, codec='mp3')
    except Exception as e:
        raise ValueError(f"Failed to extract audio: {e}")

    # Read the audio back into a BytesIO stream
    audio_stream = BytesIO()
    try:
        with open(temp_audio_path, "rb") as temp_audio_file:
            audio_stream.write(temp_audio_file.read())
        audio_stream.seek(0)  # Reset stream position to the beginning
    except Exception as e:
        raise ValueError(f"Failed to read audio file: {e}")

    # Close the video file to release the file handle
    video.close()

    return temp_video_path, reprocessed_video_path, temp_audio_path, audio_stream

def encode_audio_chunks(audio_stream: BytesIO, chunk_length_ms=4500):
    # Load the MP3 file from the BytesIO stream
    audio = AudioSegment.from_file(audio_stream, format="mp3")
    
    # Split the audio into chunks
    chunks = make_chunks(audio, chunk_length_ms)
    
    # Encode each chunk to base64
    encoded_chunks = []
    for i, chunk in enumerate(chunks):
        chunk_bytes = chunk.export(format="mp3").read()
        encoded_chunk = base64.b64encode(chunk_bytes)
        encoded_chunks.append(encoded_chunk)
    
    return encoded_chunks

async def analyze_audio_with_hume(video_id: str):
    client = HumeStreamClient(HUME_API_KEY)
    config = ProsodyConfig()
    
    video_stream = await download_video_from_firebase(video_id)
    temp_video_path, reprocessed_video_path, temp_audio_path, audio_stream = extract_audio_from_video(video_stream)
    encoded_chunks = encode_audio_chunks(audio_stream)

    async with client.connect([config]) as socket:
        results = {}
        for i, encoded_chunk in enumerate(encoded_chunks):
            result = await socket.send_bytes(encoded_chunk)
            
            if result and 'prosody' in result and 'predictions' in result['prosody']:
                for prediction in result['prosody']['predictions']:
                    begin = prediction['time']['begin']
                    end = prediction['time']['end']
                    emotions = prediction['emotions']

                    # Sort emotions by score in descending order
                    sorted_emotions = sorted(emotions, key=lambda x: x['score'], reverse=True)

                    # Get the top 3 emotions
                    top_emotions = sorted_emotions[:3]

                    # Format the output
                    formatted_emotions = {
                        "timestamp": {
                                "start": f"{begin:.1f}",
                                "end": f"{end:.1f}"
                            },
                        "emotions": [
                            {"name": emotion['name'], "score": round(emotion['score'] * 100, 2)}
                            for emotion in top_emotions
                        ]
                    }

                    # Print formatted emotions
                    emotions_str = ", ".join([f"{e['name']}: {e['score']}%" for e in formatted_emotions['emotions']])
                    print(f"Timestamp {formatted_emotions['timestamp']} - {emotions_str}")

                    # Add to results dictionary
                    results[f"({formatted_emotions['timestamp']['start']}, {formatted_emotions['timestamp']['end']})"] = formatted_emotions['emotions']
        
        # Clean up the temporary files after processing
        os.remove(temp_video_path)
        os.remove(reprocessed_video_path)
        os.remove(temp_audio_path)

        return results

if __name__ == "__main__":
    video_id = "user_2iFXbXatWxHFSmk6oSxy9BHiVuF_1719125034209.mp4"
    results = asyncio.run(analyze_audio_with_hume(video_id))
    with open(f"{video_id}_results.json", "w") as json_file:
        json.dump(results, json_file, indent=4)
    print(results)
