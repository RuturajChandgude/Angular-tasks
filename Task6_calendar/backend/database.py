from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import Session
from typing import Annotated, List
from sqlalchemy.ext.declarative import declarative_base
from fastapi import APIRouter,Depends
URL_DATABASE='mysql+pymysql://root:root@localhost:3306/calendar'

engine=create_engine(URL_DATABASE)

SessionLocal=sessionmaker(autocommit=False,autoflush=False,bind=engine)

Base=declarative_base()

def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()

