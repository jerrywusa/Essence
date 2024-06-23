import cv2
import base64
import asyncio
import websockets

async def send_video():
    uri = "ws://localhost:8000/ws"
    async with websockets.connect(uri) as websocket:
        cap = cv2.VideoCapture(0)
        try:
            while True:
                ret, frame = cap.read()
                if not ret:
                    break
                # Encode the frame as JPEG
                _, buffer = cv2.imencode('.jpg', frame)
                # Convert the buffer to base64
                frame_data = base64.b64encode(buffer).decode('utf-8')
                # Send the base64 frame to the server
                await websocket.send(frame_data)
                await asyncio.sleep(0.03)  # Control the frame rate

                # Receive the processed results from the server
                response = await websocket.recv()
                print(response)  # Print or handle the received results
        except KeyboardInterrupt:
            print("Video transmission stopped.")
        finally:
            cap.release()

asyncio.run(send_video())
