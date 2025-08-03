import requests
from bs4 import BeautifulSoup
import json
import time
import re

def scrape_additional_fields(url):
    res = requests.get(url)
    if res.status_code != 200:
        print(f"Failed to get {url}")
        return "", "", ""

    soup = BeautifulSoup(res.text, "html.parser")
    text = soup.get_text(separator="\n", strip=True)

    def extract_after(label):
        pattern = rf"{label}:\s*([\w\d\s/&\-()%]+)"
        match = re.search(pattern, text, re.IGNORECASE)
        return match.group(1).strip() if match else ""

    full_match = re.search(r"ASVAB REQUIREMENT:\s*(.*?)\n", text, re.IGNORECASE)
    asvab = full_match.group(1).strip() if full_match else ""

    environment = extract_after("AVERAGE INDOOR/OUTDOOR WORK CONDITIONS")

    deployment_match = re.search(r"DEPLOYMENT TEMPO/RATE.*?\n([^\n]+)", text, re.IGNORECASE)
    deployment = deployment_match.group(1).strip() if deployment_match else ""

    return asvab, environment, deployment


def scrape_summary(url):
    res = requests.get(url)
    if res.status_code != 200:
        print(f"Failed to get {url}")
        return ""

    soup = BeautifulSoup(res.text, "html.parser")

    header = None
    for tag in soup.find_all(re.compile("^h[1-6]$")):
        if "airmen describing" in tag.get_text(strip=True).lower():
            header = tag
            break

    if not header:
        print(f"No header found in {url}")
        return ""

    content = []
    for sibling in header.find_next_siblings():
        if sibling.name and re.match(r"h[1-6]", sibling.name):
            break
        text = sibling.get_text(separator="\n", strip=True)
        if text:
            content.append(text)

    return "\n\n".join(content).strip()

with open("asfc_data_pre.json") as f:
    jobs = json.load(f)

for job in jobs:
    print(f"Scraping for {job['mos_code']} {job['title']}")
    job['summary'] = scrape_summary(job['source'])
    asvab, environment, deployment = scrape_additional_fields(job['source'])
    job['asvab'] = asvab
    job['environment'] = re.split(r"\bAverage Hours Worked\b", environment, flags=re.IGNORECASE)[0].strip()
    job['deployment'] = deployment
    time.sleep(1)

with open("asfc_data_final.json", "w") as f:
    json.dump(jobs, f, indent=2)
