import requests
from bs4 import BeautifulSoup
import json

SCRAPER_API_KEY = "9683bbfd7fd19df9cc0dad1568bf6b83"


def fetch_html(url):
    proxy_url = f"http://api.scraperapi.com?api_key={SCRAPER_API_KEY}&url={url}"

    response = requests.get(proxy_url, timeout=30)

    if response.status_code != 200:
        raise Exception(f"ScraperAPI failed: {response.status_code}")

    return response.text


def extract_json_ld(soup):
    scripts = soup.find_all("script", type="application/ld+json")

    for script in scripts:
        try:
            data = json.loads(script.string)

            if isinstance(data, list):
                for item in data:
                    if item.get("@type") == "Recipe":
                        return str(item)

            elif isinstance(data, dict) and data.get("@type") == "Recipe":
                return str(data)

        except:
            continue

    return None


def scrape_recipe_url(url: str):
    try:
        html = fetch_html(url)

        soup = BeautifulSoup(html, "html.parser")

        # ✅ BEST: structured data
        structured = extract_json_ld(soup)
        if structured:
            return structured[:8000]

        # fallback text
        for tag in soup(["script", "style", "nav", "footer", "header", "aside"]):
            tag.decompose()

        text = soup.get_text(separator=" ", strip=True)

        return text[:8000] if text else None

    except Exception as e:
        print("Scraper Error:", e)
        return None