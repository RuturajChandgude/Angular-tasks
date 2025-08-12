from fastapi import FastAPI
from database import Base,engine
from fastapi.middleware.cors import CORSMiddleware
from models.event_model import EventModel
from routes import event_route
app=FastAPI(
    title="Calendar",
    description="API Endpoints",
)

origins = [
    "http://localhost:4200"
]
app.add_middleware(
        CORSMiddleware,
        allow_origins="http://localhost:4200",
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

Base.metadata.create_all(bind=engine)
app.include_router(event_route.router)