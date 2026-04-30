import requests
from bs4 import BeautifulSoup
import random
import time


# Rotate user agents (basic anti-bot evasion)
USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_5) AppleWebKit/537.36 Chrome/119.0.0.0 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/118.0.0.0 Safari/537.36",
]


def get_headers():
    return {
        "User-Agent": random.choice(USER_AGENTS),
        "Accept-Language": "en-US,en;q=0.9",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Connection": "keep-alive",
    }


def fetch_with_retry(url, retries=3):
    for attempt in range(retries):
        try:
            response = requests.get(
                url,
                headers=get_headers(),
                timeout=15
            )

            # 🔴 Handle bot blocking / payment walls
            if response.status_code in [402, 403]:
                print(f"Blocked ({response.status_code}) on attempt {attempt+1}")

                # 👉 fallback to ScraperAPI (ONLY if you add API key)
                scraper_api_key = None  # <-- PUT YOUR KEY HERE if using
                if scraper_api_key:
                    proxy_url = f"http://api.scraperapi.com?api_key={scraper_api_key}&url={url}"
                    response = requests.get(proxy_url, timeout=20)
                else:
                    time.sleep(2)  # small delay before retry
                    continue

            response.raise_for_status()
            return response.text

        except requests.exceptions.RequestException as e:
            print(f"Retry {attempt+1} failed: {e}")
            time.sleep(2)

    return None


def extract_json_ld(soup):
    """
    Try extracting structured recipe data (BEST method).
    """
    scripts = soup.find_all("script", type="application/ld+json")

    for script in scripts:
        try:
            import json
            data = json.loads(script.string)

            # Some sites wrap data in a list
            if isinstance(data, list):
                for item in data:
                    if item.get("@type") == "Recipe":
                        return str(item)

            elif isinstance(data, dict) and data.get("@type") == "Recipe":
                return str(data)

        except Exception:
            continue

    return None


def scrape_recipe_url(url: str):
    """
    Main scraping function:
    1. Fetch HTML with retries
    2. Try structured data (JSON-LD)
    3. Fallback to cleaned text
    """

    try:
        html = fetch_with_retry(url)

        if not html:
            return "Error: Failed to fetch recipe (blocked or network issue)."

        soup = BeautifulSoup(html, "html.parser")

        # ✅ BEST: Try structured data first
        structured_data = extract_json_ld(soup)
        if structured_data:
            return structured_data[:8000]

        # 🔧 CLEANUP (fallback method)
        for element in soup(["script", "style", "nav", "footer", "header", "aside"]):
            element.decompose()

        page_text = soup.get_text(separator=" ", strip=True)

        if not page_text:
            return "Error: No readable content found."

        return page_text[:8000]

    except Exception as e:
        print(f"Unexpected Scraper Error: {e}")
        return None