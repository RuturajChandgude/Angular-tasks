from sqlalchemy.orm import Session
from models.event_model import EventModel
from schemas.event_schema import EventCreate,EventUpdate,EventShow

def create_event(db:Session,event_data:EventCreate):
    event=EventModel(**event_data.dict())
    db.add(event)
    db.commit()
    db.refresh(event)
    return event

def update_event(db:Session,event_id:int,updates:EventUpdate):
    event=db.query(EventModel).filter(EventModel.id==event_id).first()
    if not event:
        return None

    update_data=updates.dict(exclude_unset=True)
    for key,value in update_data.items():
        setattr(event,key,value)
    # db.add(event)
    db.commit()
    db.refresh(event)
    return event

def get_all_events(db:Session):
    return db.query(EventModel).all()


