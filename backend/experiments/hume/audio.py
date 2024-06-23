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

async def download_audio_from_firebase(video_id: str) -> BytesIO:
    bucket = storage.bucket()
    blob = bucket.blob(f"videos/{video_id}")
    if not blob.exists():
        raise ValueError("Video not found in Firebase Storage")

    audio_stream = BytesIO()
    blob.download_to_file(audio_stream)
    audio_stream.seek(0)  # Reset stream position to the beginning
    return audio_stream

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
    
    audio_stream = await download_audio_from_firebase(video_id)
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
                    results[(float(formatted_emotions['timestamp']["start"]), float(formatted_emotions['timestamp']['end']))] = formatted_emotions['emotions']
        
        return results

if __name__ == "__main__":
    video_id = "ForrestGump.mp3"  # Replace with the path to your MP3 file in Firebase
    results = asyncio.run(analyze_audio_with_hume(video_id))
    print(results)
