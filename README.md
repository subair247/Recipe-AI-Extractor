🍳 RecipeAI Extractor & Dashboard
A full-stack web application that extracts and displays structured recipe data from user input, built as a Final Year Project. The system focuses on reliability, clean UI, and seamless frontend–backend integration.

🌟 Key Features


Recipe Extraction via API
Fetches structured recipe data (ingredients, instructions, images) using a stable backend API integration.


End-to-End Full Stack Flow
React frontend communicates with a FastAPI backend deployed on cloud platforms.


Dynamic UI Rendering
Displays recipes with ingredients, step-by-step instructions, and images in real-time.


History Tracking (Frontend State)
Stores previously fetched recipes during the session for quick access.


Responsive UI
Clean and user-friendly interface built with React and Tailwind CSS.



🛠️ Tech Stack
LayerTechnologyFrontendReact.js, Tailwind CSSBackendFastAPI (Python)API IntegrationExternal Recipe APIDeploymentVercel (Frontend), Render (Backend)

🚀 Live Demo


Frontend: (your Vercel link)


Backend API: (your Render link)



⚙️ Installation & Setup
Backend (FastAPI)
cd backendpython -m venv venv# Windowsvenv\Scripts\activatepip install -r requirements.txtuvicorn app.main:app --reload

Frontend (React)
cd frontendnpm installnpm start

🔐 Environment Variables
Frontend (.env)
REACT_APP_API_URL=https://your-backend-url.onrender.com

📌 Limitations


Relies on external API → limited dataset


No database persistence (history resets on refresh)


Scraper-based extraction is not fully reliable (experimental)



🚧 Future Improvements


Add database (MongoDB / PostgreSQL)


Hybrid system (API + scraper fallback)


Improved NLP-based extraction


User authentication & saved recipes



🧠 Why this version is better


✔ Honest (huge for recruiters)


✔ Matches your actual working system


✔ Shows deployment + architecture skills


✔ Doesn’t overclaim AI




