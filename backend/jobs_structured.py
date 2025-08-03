import json

with open("afsc_data.json", "r") as f:
    afsc_jobs = json.load(f)

afsc_summaries = "\n".join(
f"{job['mos_code']}: {job['title']} - {job['summary']}\n Relevant tags: {job['tags']}\nDeployment Rate: {job['deployment']}\nWork Environment: {job['environment']}\nASVAB Requirements: {job['asvab']}\n \n{'-'*40}" for job in afsc_jobs
)

with open("afscs.txt", "w", encoding="utf-8") as f:
    f.write(afsc_summaries)
