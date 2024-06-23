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

@app.post("/analyze-audio")
async def analyze_audio_endpoint(video_id: str):
    try:
        results = await analyze_audio_with_hume(video_id)
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