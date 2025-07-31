import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo, TodoService } from '../todo.service';

import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule,MatCheckboxModule,MatIconModule,MatButtonModule,FormsModule],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
constructor(public todoservice:TodoService){}
@Input() todo!:Todo
@Output() delete =new EventEmitter<number>()
@Output() toggle=new EventEmitter<number>()

}
