from openai import OpenAI
import os
from dotenv import load_dotenv
import json

load_dotenv()
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

audio_file = open("../../media/ForrestGump.mp3", "rb")
transcription = client.audio.transcriptions.create(
    model="whisper-1", 
    file=audio_file, 
#   response_format="json"  # Set response format to JSON
    response_format= "vtt"
)

print(transcription)

# Parse the JSON response to extract timestamps
words_with_timestamps = []
for segment in transcription['segments']:
    for word in segment['words']:
        words_with_timestamps.append({
            'word': word['word'],
            'start_time': word['start'],
            'end_time': word['end']
        })

# Print the words with their timestamps
for item in words_with_timestamps:
    print(f"Word: {item['word']}, Start: {item['start_time']}, End: {item['end_time']}")
