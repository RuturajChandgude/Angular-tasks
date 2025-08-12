from pydantic import BaseModel
from typing import Optional
from datetime import date
class EventCreate(BaseModel):
    date:date
    quote:str
    author:str

class EventUpdate(BaseModel):
    date:Optional[date]=None
    quote:Optional[str]=None
    author:Optional[str]=None


class EventShow(EventCreate):
    id:int
    class config:
        orm_mode=True