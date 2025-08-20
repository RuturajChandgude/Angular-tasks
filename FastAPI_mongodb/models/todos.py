from pydantic import BaseModel, Field
from typing import Optional
class Todo(BaseModel):
    name:str
    description:str
    complete:bool

class TodoUpdate(BaseModel):
    name:Optional[str]=None
    description:Optional[str]=None
    complete:Optional[bool]=None