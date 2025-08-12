from sqlalchemy import Boolean,Column,Date,Integer,String
from database import Base
from datetime import date

class EventModel(Base):
    __tablename__="events"
    id=Column(Integer,primary_key=True,index=True)
    date=Column(Date,nullable=False)
    quote=Column(String(200),nullable=False)
    author=Column(String(50),nullable=False)


