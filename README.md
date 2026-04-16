# RecipeAI Extractor & History Dashboard 🍳

A sophisticated Full-Stack application developed as a **Final Year Project**. This tool leverages Artificial Intelligence and Natural Language Processing (NLP) to scrape raw recipe data from any website and convert it into a structured, user-friendly dashboard.

## 🌟 Key Features
- **Dynamic AI Extraction**: Integrates Google Gemini 1.5 Flash to intelligently identify ingredients and instructions from unstructured web text.
- **Robust Fallback Mechanism**: Features an Intelligent Mock System that ensures 100% UI stability by detecting URL keywords (e.g., "cookie", "rice") and providing high-fidelity data even during API downtime.
- **Real-Time History Management**: A dedicated history tab to track, store, and revisit previously extracted recipes using React state management.
- **Modern UI/UX**: A clean, responsive interface built with React and custom CSS, featuring interactive modals and loading states.

## 🛠️ Tech Stack
| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js, Tailwind CSS / Custom CSS |
| **Backend** | FastAPI (Python 3.12+) |
| **AI/LLM** | Google Gemini 1.5 Flash, LangChain |
| **Scraping** | BeautifulSoup4, Requests |
| **Deployment** | Vercel / Render |

## 🚀 Installation & Setup

### 1. Backend Setup (FastAPI)
```bash
cd backend
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Install dependencies:
pip install fastapi uvicorn langchain-google-genai beautifulsoup4 requests
# Start the server:
uvicorn app.main:app --reload