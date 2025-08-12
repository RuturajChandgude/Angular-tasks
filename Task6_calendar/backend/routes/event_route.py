from fastapi import APIRouter,Depends,HTTPException,status
from sqlalchemy.orm import Session
from schemas.event_schema import EventCreate,EventUpdate,EventShow
from models.event_model import EventModel
from database import get_db
from service import event_service
from typing import List
router=APIRouter(prefix="/events",tags=["Events"])

@router.post("",response_model=EventShow,status_code=status.HTTP_201_CREATED)
def create_event(event:EventCreate,db:Session=Depends(get_db)):
    return event_service.create_event(db,event)

@router.patch("/{event_id}",response_model=EventShow)
def update_event(event_id:int,updates:EventUpdate,db:Session=Depends(get_db)):
    return event_service.update_event(db,event_id,updates)


@router.get("",response_model=List[EventShow])
def get_all_events(db:Session=Depends(get_db)):
    return event_service.get_all_events(db)
