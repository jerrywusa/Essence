from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from firebase_admin import credentials, initialize_app, storage
from hume import HumeStreamClient
from hume.models.config import ProsodyConfig, FaceConfig    

from moviepy.editor import VideoFileClip

from io import BytesIO
import base64

import os, json
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


# Initialize Firebase
cred = credentials.Certificate('serviceAccountKey.json')
initialize_app(cred, {'storageBucket': os.getenv("FIREBASE_BUCKET_NAME")})

# FastAPI app
app = FastAPI()

# Hume API key
HUME_API_KEY = os.getenv("HUME_API_KEY")

bucket = storage.bucket()
