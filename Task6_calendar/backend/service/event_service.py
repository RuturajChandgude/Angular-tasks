from sqlalchemy.orm import Session
from schemas.event_schema import EventCreate,EventUpdate,EventShow
from repo import event_repo
from fastapi import HTTPException

def create_event(db:Session,event_data:EventCreate):
    return event_repo.create_event(db,event_data)


def update_event(db:Session,event_id:int,updates:EventUpdate):
    return event_repo.update_event(db,event_id,updates)

def get_all_events(db:Session):
    return event_repo.get_all_events(db)

def delete_event(db:Session,event_id:int):
    return event_repo.delete_event(db,event_id)