from fastapi import APIRouter
from models.todos import Todo

from config.database import collection_name

from schema.schemas import individual_serial, list_serial, TodoUpdate
from bson import ObjectId

router=APIRouter()

@router.get("/")
async def get_todos():
    todos=list_serial(collection_name.find())
    return todos

@router.get("/{id}")
async def get_todo_by_id(id:str):
    todo=individual_serial(collection_name.find_one({"_id":ObjectId(id)}))
    return todo

@router.post("/")
async def post_todo(todo:Todo):
    collection_name.insert_one(dict(todo))

@router.put("/{id}")
async def put_todo(id:str,todo:Todo):
    collection_name.find_one_and_update({"_id":ObjectId(id)},{"$set":dict(todo)})

@router.patch("/{id}")
async def partial_update_todo(id:str,todo:TodoUpdate):
    update_data={k:v for k,v in todo.dict().items() if v is not None}
    if update_data:
        collection_name.find_one_and_update(
            {"_id":ObjectId(id)},
            {"$set":update_data}
        )
    return {"msg":"Todo updated successfully"}

@router.delete("/{id}")
async def delete_todo(id:str):
    collection_name.find_one_and_delete({"_id":ObjectId(id)})