import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
 
  private todosSubject=new BehaviorSubject<Todo[]>([]);
  todo$=this.todosSubject.asObservable()
  private currentId=0
  constructor() { }

  addTodo(text:string){
    const newTodo:Todo={
      id:this.currentId++,
      text,
      completed:false
    }
    const current=this.todosSubject.value;
    this.todosSubject.next([...current,newTodo])
  
  }

  toggleTodo(id:number){
   const updated=this.todosSubject.value.map(todo=>
    todo.id===id?{...todo,completed:!todo.completed}:todo
   )
   

   this.todosSubject.next(updated)
   
  }

  deleteTodo(id:number){
    const updated=this.todosSubject.value.filter(todo=>todo.id!==id)
    this.todosSubject.next(updated)
  }


}
export interface Todo{
  id:number;
  text:string;
  completed:boolean
}
