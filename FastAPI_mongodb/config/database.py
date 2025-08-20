from pymongo import MongoClient

client=MongoClient("mongodb+srv://ruturaj2id:ruturaj2id@fastapimongodb.r8hzx9k.mongodb.net/?retryWrites=true&w=majority&appName=fastapimongodb")

db=client.todo_db

collection_name=db["todo_collection"]