import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../todo.service';
import { FormsModule } from '@angular/forms';
import { TodoItemComponent } from '../todo-item/todo-item.component';
@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule,FormsModule,TodoItemComponent],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  taskText:string=''
  constructor(public todoService:TodoService){}

  addTask(){
    if(this.taskText.trim()){
      this.todoService.addTodo(this.taskText)
      this.taskText=''
    }
  }
}
