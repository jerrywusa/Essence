from fastapi import FastAPI, HTTPException, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.websockets import WebSocketDisconnect

from firebase_admin import credentials, initialize_app, storage
from hume import HumeStreamClient
from hume.models.config import ProsodyConfig, FaceConfig    

from hume_audio import analyze_audio_with_hume
import base64

import cv2
import numpy as np

import os
import asyncio
from dotenv import load_dotenv
load_dotenv()  

origins = ["*"]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Hume API key
HUME_API_KEY = os.getenv("HUME_API_KEY")

def flatten_emotions(emotions):
    flat_list = []
    for time_range in emotions:
        flat_list.extend(e['name'] for e in emotions[time_range])
    return flat_list

def compare_emotions(professional, user):
    professional_flat = flatten_emotions(professional)
    user_flat = flatten_emotions(user)
    
    professional_set = set(professional_flat)
    user_set = set(user_flat)
    
    overlap = professional_set & user_set
    total_emotions = professional_set | user_set
    
    overlap_score = len(overlap)
    total_possible_score = len(total_emotions)
    
    return overlap_score, total_possible_score

@app.post("/analyze-audio")
async def analyze_audio_endpoint(video_id: str):
    try:
        user = await analyze_audio_with_hume(video_id)
        professional = {
        "(3.1, 4.5)": [
            {"name": "Confusion", "score": 37.05},
            {"name": "Disappointment", "score": 23.48},
            {"name": "Distress", "score": 20.18}
        ],
        "(4.6, 9.5)": [
            {"name": "Calmness", "score": 26.38},
            {"name": "Contemplation", "score": 23.04},
            {"name": "Awkwardness", "score": 18.4}
        ],
        "(9.6, 14.1)": [
            {"name": "Sadness", "score": 42.54},
            {"name": "Fear", "score": 38.9},
            {"name": "Confusion", "score": 38.68}
        ],
        "(13.7, 18.6)": [
            {"name": "Contemplation", "score": 42.01},
            {"name": "Calmness", "score": 34.61},
            {"name": "Realization", "score": 24.12}
        ],
        "(18.7, 23.2)": [
            {"name": "Determination", "score": 19.23},
            {"name": "Contemplation", "score": 15.99},
            {"name": "Calmness", "score": 12.79}
        ]}
        total_score = 0
        max_score = 0
        
        for time_range in professional:
            if time_range in user:
                prof_emotions = [e['name'] for e in professional[time_range]]
                user_emotions = [e['name'] for e in user[time_range]]
                
                for i, prof_emotion in enumerate(prof_emotions):
                    if i < len(user_emotions):
                        max_score += 3
                        if prof_emotion == user_emotions[i]:
                            total_score += 3
                        elif prof_emotion in user_emotions:
                            total_score += 1

        overlap_score, total_possible_score = compare_emotions(professional, user)
        performance_score = (overlap_score / total_possible_score) * 100 if total_possible_score > 0 else 0
        results = {
            "professional": professional,
            "user": user,
            "total_score": overlap_score,
            "max_score": total_possible_score,
            "performance_score": performance_score
        }
        return JSONResponse(content=results)
    except HTTPException as e:
        return JSONResponse(status_code=e.status_code, content={"detail": e.detail})
    except Exception as e:
        return JSONResponse(status_code=500, content={"detail": str(e)})

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    client = HumeStreamClient(HUME_API_KEY)
    config = FaceConfig()

    async with client.connect([config]) as socket:
        try:
            while True:
                data = await websocket.receive_text()
                # Decode the base64 data to get the image bytes
                image_data = base64.b64decode(data)
                # Convert the bytes to a numpy array
                np_arr = np.frombuffer(image_data, np.uint8)
                # Decode the numpy array into an image
                frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

                # Encode the frame in a format suitable for Hume AI
                is_success, encoded_image = cv2.imencode(".jpg", frame)
                if not is_success:
                    continue

                # Send the encoded image to Hume AI
                encoded_chunk = base64.b64encode(encoded_image.tobytes())
                result = await socket.send_bytes(encoded_chunk)

                # Process Hume AI response and send results back to the WebSocket client
                if result and 'face' in result and 'predictions' in result['face']:
                    for prediction in result['face']['predictions']:
                        emotions = prediction['emotions']

                        # Sort emotions by score in descending order and get the top four
                        sorted_emotions = sorted(emotions, key=lambda x: x['score'], reverse=True)[:4]

                        # Format the output
                        formatted_emotions = {
                            "timestamp": prediction['frame'],
                            "emotions": [
                                {"name": emotion['name'], "score": round(emotion['score'] * 100, 2)}
                                for emotion in sorted_emotions
                            ]
                        } 

                        # Print formatted emotions
                        emotions_str = ", ".join([f"{e['name']}: {e['score']}%" for e in formatted_emotions['emotions']])
                        print(f"Frame {formatted_emotions['timestamp']} - {emotions_str}")

                        # Send the formatted emotions back to the WebSocket client
                        await websocket.send_json(formatted_emotions)
                await asyncio.sleep(0.1)

        except WebSocketDisconnect:
            print("Client disconnected")
        finally:
            await websocket.close()