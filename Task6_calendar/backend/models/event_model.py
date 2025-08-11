from sqlalchemy import Boolean,Column,Integer,String,ForeignKey
from database import Base
from sqlalchemy.orm import relationship, sessionmaker

class EventModel(Base):
    __tablename__="events"
id=Column(Integer,primary_key=True,index=True)
quote=Column(String(200),nullable=false)
author=Column(String(50),nullable=false)


