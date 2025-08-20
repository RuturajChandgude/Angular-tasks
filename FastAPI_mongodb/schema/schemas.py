from pydantic import BaseModel
from typing import Optional
def individual_serial(todo)->dict:
    return {
     "id":str(todo["_id"]),
     "name":todo["name"],
     "description":todo["description"],
     "complete":todo["complete"]
    }

def list_serial(todos)->list:
    return [individual_serial(todo) for todo in todos] 

class TodoUpdate(BaseModel):
    name:Optional[str]=None
    description:Optional[str]=None
    complete:Optional[bool]=None