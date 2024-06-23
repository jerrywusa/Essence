from openai import AsyncOpenAI
import os
import json
import asyncio
from dotenv import load_dotenv
load_dotenv()

def create_client():
    return AsyncOpenAI(
        api_key=os.environ.get("OPENAI_API_KEY"),
    )

def setup_content(script, professional, user, performance_score):
    performance_score = int(performance_score)
    return f"""
        // Script
        {script}

        // Prompt
        Based on these scores that I got from a emotional quotient software that judges the emotions of someone based on their facial expressions and vocal emotions, give advice to the actor on how they may improve their display of emotions when enacting this scene to fit the emotions that should be depicted from this scene. We will also be giving context of what the scores were of the professional actor than enacted that scene. Compare these scores to see how close and accurate it was to the real actor. 

        // Output
        I want the result in this specific format:
        Give advice for both facial expressions and vocal expressions. Be as concise as possible. Give me 2 sentences
    
        
        // Json Data
        Real Actor Emotional Evaluation Score:
        {professional}

        My Emotional Evaluation Score :
        {user}
        
        Performance Score out of 100:
        {performance_score}
        """

async def get_response(client, content):
    return await client.chat.completions.create(
        model="gpt-4-turbo-preview",
        messages=[
            {"role": "system", "content": "You are a professional movie director and acting coach helping aspiring actors perfect how to portray emotions within scenes."},
            {"role": "user", "content": content}
        ],
    )
    
async def get_advice(script, professional, user, performance_score):
    client = create_client()
    content = setup_content(script, professional, user, performance_score)
    response = await get_response(client, content)
    return response.choices[0].message.content