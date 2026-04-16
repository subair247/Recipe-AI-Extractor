import os
from sqlalchemy import create_all
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()

# Get the database URL from your .env file
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

# Create the engine (connects Python to PostgreSQL)
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Create a session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    """
    Dependency to get a database session.
    Ensures the connection is closed after the request is done.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()