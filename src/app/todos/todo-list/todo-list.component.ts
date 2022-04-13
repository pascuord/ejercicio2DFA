import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { getAllTodos, deleteAllDoneTodo, completeAllTodo } from '../actions';
import { TodoDTO } from '../models/todo.dto';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: TodoDTO[] = [];

  constructor(
    private store: Store<AppState>,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    //this.store.select('todos').subscribe((todos) => (this.todos = todos));
    //this.todoService.getAllTodos().subscribe((todos) => (this.todos = todos));
    this.store.select('todosApp').subscribe(todosResponse=>{
      this.todos = todosResponse.todos;
    });

    this.store.dispatch(getAllTodos());
  }

  deleteAllTodo(){
    this.store.dispatch(deleteAllDoneTodo());
  }

  completeAllTodo(){
    this.store.dispatch(completeAllTodo());
  }
}
