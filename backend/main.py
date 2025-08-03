from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
import os
from pathlib import Path
from dotenv import load_dotenv
import json

load_dotenv(dotenv_path=Path(__file__).resolve().parents[1] / ".env")
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
app = FastAPI()

with open("afscs.txt", "r", encoding="utf-8") as f:
    afsc_summaries = f.read()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://enlist-ai.vercel.app"],  # 👈 Your Vercel frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserProfile(BaseModel):
    age: Optional[int] = None
    completed_highschool: Optional[bool] = None
    attended_college: Optional[bool] = None
    finished_college: Optional[bool] = None
    college_major: Optional[str] = None
    highest_degree: Optional[str] = None
    trade_experience: List[str] = []
    tag_interests: List[str] = []
    priorities: List[str] = []
    additional_info: Optional[str] = None


@app.post("/recommend")
def recommend_afsc(profile: UserProfile):
    print("Received profile:")
    print(profile)


    prompt = f"""
    You are a career advisor for the U.S. Air Force. Based on the following user profile, recommend 3 Air Force Specialty Codes (AFSCs) that align with the user's background, interests, and goals.

    Be specific. Use only jobs from the provided list. For each recommended AFSC, include:
    1. The AFSC code and title
    2. A short summary (3-4 sentences) explaining the job, including typical duties and lifestyle.
    2. 3. A personalized explanation (4–5 sentences) for why this job fits the user's profile. Make clear connections to the user's background, interests, and goals.


    ---

    User Profile:
    - Age: {profile.age}
    - High School Graduate: {"Yes" if profile.completed_highschool else "No"}
    - Attended College: {"Yes" if profile.attended_college else "No"}
    - College Degree Completed: {"Yes" if profile.finished_college else "No"}
    - College Major: {profile.college_major}
    - Highest Degree: {profile.highest_degree}
    - Trade Experience: {", ".join(profile.trade_experience) if profile.trade_experience else "None"}
    - Interests (Tags): {", ".join(profile.tag_interests) if profile.tag_interests else "None"}
    - Career Priorities: {", ".join(profile.priorities) if profile.priorities else "None"}
    - Additional Info: {profile.additional_info or "None"}

    ---
    Use the following criteria to weigh your recommendations (in priority order):
    1) Tag/Interest Match
    2) Additional info
    3) College / trade experience aligns with role
    4) Match to stated career priorities
    5) Age (only where relevant)

    Available AFSC Jobs:
    {afsc_summaries}

    Return the recommendations in a structured format like:
    
    [
    curlybrace
        "code": "1D7X1",
        "title": "Cyber Defense Operation",
        "summary": "...",
        "justification": "..."
    curlybrace,
    ...
    ]
    
    """
    print("Sending prompt to GPT...")

    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[
            {"role": "system", "content": "You are a helpful and accurate career advisor for the U.S. Air Force."},
            {"role": "user", "content": prompt},
        ],
        temperature=0.5,
        max_tokens=1000
    )
    print("GPT responded!")


    gpt_output = response.choices[0].message.content
    return {"recommendations": gpt_output}
