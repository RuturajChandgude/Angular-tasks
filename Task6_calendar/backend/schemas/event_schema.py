from pydantic import BaseModel
from typing import Optional

class EventCreate(BaseModel):
    quote:str
    author:str

class EventUpdate(BaseModel):
    quote:Optional[str]:None
    author=Optional[str]:None

