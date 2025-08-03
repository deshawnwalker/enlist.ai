import openai
from openai import OpenAI
import json
import time
import ast
import re
from dotenv import load_dotenv
import os

load_dotenv()

TAG_LIST = [
    "Operations", "Engineering", "Intelligence", "Medical", "Logistics", "Maintenance", "Transportation", "Communications",
    "Cybersecurity", "Administration", "Aviation", "Technical", "Mechanical", "Electrical", "Analytical", "Physical Fitness",
    "Communication", "Leadership", "Attention to Detail", "Troubleshooting", "Teamwork", "Aircraft", "Computers", "Machinery",
    "Field Work", "Lab Work", "Indoor Work", "Outdoor Work", "Classified Systems", "Remote Sensing", "Surveillance",
    "Combat Support", "Reconnaissance", "Humanitarian", "Tactical Support", "Nuclear Operations", "Intelligence Collection",
    "Cyber Operations", "Aircrew"
]

def safe_extract_list(text):
    match = re.search(r"\[.*?\]", text, re.DOTALL)
    if match:
        return ast.literal_eval(match.group(0))
    raise ValueError("No valid list found in model output.")

def generate_tags(job):
    prompt = f"""
    Here is a description of an Air Force job:

    Title: {job["title"]}
    Summary: {job["summary"]}
    ASVAB: {job.get("asvab", "")}
    Environment: {job.get("environment", "")}
    Deployment: {job.get("deployment", "")}

    Using context and any additional information you can gather, choose 3 to 5 relevant tags from this list:
    {", ".join(TAG_LIST)}

    Return ONLY a valid Python list of strings. The tags should be chosen in a way that will make matching jobs to user preferences streamlined and accurate.
    """

    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2
    )

    content = response.choices[0].message.content.strip()
    return safe_extract_list(content)


def tag_all_jobs(input_file="/Users/deshawnwalker/Desktop/enlist.ai/afsc_data_final.json", output_file="/Users/deshawnwalker/Desktop/enlist.ai/afsc_data_with_tags.json"):
    with open(input_file) as f:
        jobs = json.load(f)

    for job in jobs:
        if not job.get("tags"):
            try:
                print(f"Tagging {job['mos_code']} - {job['title']}")
                job["tags"] = generate_tags(job)
                time.sleep(1)
            except Exception as e:
                print(f"Failed to tag {job['mos_code']}: {e}")
                job["tags"] = []

    with open(output_file, "w") as f:
        json.dump(jobs, f, indent=2)

    print(f"\nFinished tagging {len(jobs)} jobs.")

if __name__ == "__main__":
    tag_all_jobs()
