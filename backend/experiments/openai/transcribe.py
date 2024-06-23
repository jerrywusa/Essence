import os
import base64
import requests
from pydub import AudioSegment
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get the OPENAI_API_KEY from environment variables
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# Ensure the API key is loaded correctly
if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY not found in environment variables")

def load_and_preprocess_audio(file_path):
    # Load the audio file
    audio = AudioSegment.from_file(file_path, format="mp3")
    
    # Convert the audio to WAV format for Whisper (if required)
    wav_audio = audio.export(format="wav")
    return wav_audio

def send_audio_to_whisper(audio_data):
    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/octet-stream",
    }
    response = requests.post(
        "https://api.openai.com/v1/audio/transcriptions",  # Hypothetical endpoint
        headers=headers,
        data=audio_data
    )
    if response.status_code != 200:
        raise Exception(f"Error: {response.status_code}, {response.text}")
    return response.json()

def process_transcription_result(transcription_result):
    word_timestamps = {}
    for item in transcription_result['words']:
        timestamp = item['start']
        word = item['word']
        word_timestamps[timestamp] = word
    return word_timestamps

def transcribe_audio(file_path):
    audio_data = load_and_preprocess_audio(file_path)
    transcription_result = send_audio_to_whisper(audio_data.read())
    word_timestamps = process_transcription_result(transcription_result)
    return word_timestamps

if __name__ == "__main__":
    file_path = "path/to/your/file.mp3"  # Replace with the path to your audio file
    word_timestamps = transcribe_audio(file_path)
    print(word_timestamps)
