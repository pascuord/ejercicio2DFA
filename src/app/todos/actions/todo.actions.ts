import { createAction, props } from '@ngrx/store';
import { TodoDTO } from '../models/todo.dto';

export const createTodo = createAction(
  '[TODO] Create todo',
  props<{ title: string }>()
);

export const completeTodo = createAction(
  '[TODO] Complete todo',
  props<{ id: number }>()
);

export const completeAllTodo = createAction('[TODO] Complete all todo');

export const editTodo = createAction(
  '[TODO] Edit todo',
  props<{ id: number; title: string }>()
);

export const deleteTodo = createAction(
  '[TODO] Delete todo',
  props<{ id: number }>()
);

export const deleteAllDoneTodo = createAction('[TODO] Delete all todo');

export const getAllTodos = createAction('[TODOS] Get all');

export const getAllTodosSuccess = createAction(
  '[TODOS] Get all success',
  props<{ todos: TodoDTO[] }>()
);

export const getAllTodosError = createAction(
  '[TODOS] Get all error',
  props<{ payload: any }>()
);
