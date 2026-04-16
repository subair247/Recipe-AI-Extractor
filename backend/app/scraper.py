import requests
from bs4 import BeautifulSoup

def scrape_recipe_url(url: str):
    """
    Scrapes the raw text content from a recipe URL while 
    mimicking a real browser to avoid 403 Forbidden errors.
    """
    try:
        # This 'User-Agent' tells the website you are a real Chrome browser
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept-Language": "en-US,en;q=0.9",
        }
        
        # We use a timeout so the app doesn't hang if the site is slow
        response = requests.get(url, headers=headers, timeout=15)
        
        # If we still get a 403, it means the site is very well protected
        if response.status_code == 403:
            print(f"Error 403: Access denied for {url}")
            return "Error: Site blocked the scraper. Please try a different recipe website."
            
        response.raise_for_status()
        
        # Parse the HTML content
        soup = BeautifulSoup(response.content, "html.parser")
        
        # CLEANUP: Remove unnecessary tags that confuse the AI
        for element in soup(["script", "style", "nav", "footer", "header", "aside"]):
            element.decompose()
            
        # Get the text, using a space to separate elements
        page_text = soup.get_text(separator=' ', strip=True)
        
        # Limit the text length so we don't send too many tokens to Gemini
        return page_text[:8000]

    except requests.exceptions.RequestException as e:
        print(f"Network Error: {e}")
        return None
    except Exception as e:
        print(f"Unexpected Scraper Error: {e}")
        return None