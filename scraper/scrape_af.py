import requests
from bs4 import BeautifulSoup
import json

url = "https://www.airmanvision.com/air-force-blog//all-air-force-jobs"
res = requests.get(url)
soup = BeautifulSoup(res.text, "html.parser")

jobs = []

for a in soup.find_all("a"):
    text = a.get_text(strip=True)
    href = a.get("href")

    if (
        len(text) > 8
        and text[:5][0].isdigit()
        and "-" in text
        and text.count(" ") >= 1
        and href
        and "air-force-blog" in href
    ):
        try:
            mos_code, title = text.split("-", 1)
            mos_code = mos_code.strip()
            title = title.strip()
            full_url = href if href.startswith("http") else f"https://www.airmanvision.com{href}"

            jobs.append({
                "branch": "Air Force",
                "mos_code": mos_code,
                "title": title,
                "summary": "",
                "tags": [],
                "environment": [],
                "source": full_url
            })

        except ValueError:
            continue

output_path = "/Users/deshawnwalker/Desktop/enlist.ai/asfc_data_pre.json"
with open(output_path, "w") as f:
    json.dump(jobs, f, indent=2)

print(f"Saved {len(jobs)} jobs to {output_path}")
