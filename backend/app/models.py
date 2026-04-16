from sqlalchemy import Column, Integer, String, JSON, DateTime
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class RecipeEntry(Base):
    __tablename__ = "recipes"
    
    id = Column(Integer, primary_key=True, index=True)
    url = Column(String, unique=True, index=True)
    title = Column(String)
    cuisine = Column(String)
    difficulty = Column(String)
    # Store the entire complex JSON structure here for Tab 2 details [cite: 72]
    full_data = Column(JSON) 
    created_at = Column(DateTime, default=datetime.utcnow)