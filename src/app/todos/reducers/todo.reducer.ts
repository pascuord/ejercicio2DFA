import { Action, createReducer, on } from '@ngrx/store';
import { TodoDTO } from '../models/todo.dto';
import {
  completeTodo,
  completeAllTodo,
  createTodo,
  deleteAllDoneTodo,
  deleteTodo,
  editTodo,
  getAllTodos,
  getAllTodosError,
  getAllTodosSuccess,
} from '../actions';

//export const initialState: TodoDTO[] = [new TodoDTO('Terminar practica 2')];

export interface TodoState {
  todos: TodoDTO[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: TodoState = {
  todos: [new TodoDTO('Terminar practica 2')],
  loading: false,
  loaded: false,
  error: null,
};

export const _todoReducer = createReducer(
  initialState,
  //on(createTodo, (state, { title }) => [...state, new TodoDTO(title)]),
  on(createTodo, (state, { title }) => ({
    ...state,
    loading: false,
    loaded: false,
    todos: [...state.todos, new TodoDTO(title)],
  })),
  on(completeTodo, (state, { id }) => ({
    ...state,
    loading: false,
    loaded: false,
    todos: [
      ...state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            done: true,
          };
        } else {
          return todo;
        }
      }),
    ],
  })),
  on(completeAllTodo, (state) => ({
    ...state,
    loading: false,
    loaded: false,
    todos: [
      ...state.todos.map((todo) => {
        if (todo.done === false) {
          return { ...todo, done: true };
        }else{
          return todo;
        }
      }),
    ],
  })),
  on(editTodo, (state, { id, title }) => ({
    ...state,
    loading: false,
    loaded: false,
    todos: [
      ...state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            title,
          };
        } else {
          return todo;
        }
      }),
    ],
  })),
  on(deleteTodo, (state, { id }) => ({
    ...state,
    loading: false,
    loaded: false,
    todos: [...state.todos.filter((todo) => todo.id !== id)],
  })),
  on(deleteAllDoneTodo, (state) => ({
    ...state,
    loading: false,
    loaded: false,
    todos: [...state.todos.filter((todo) => todo.done === false)],
  })),
  on(getAllTodos, (state) => ({ ...state, loading: true })),
  on(getAllTodosSuccess, (state, { todos }) => ({
    ...state,
    loading: false,
    loaded: true,
    todos: [...todos],
  })),
  on(getAllTodosError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: {
      url: payload.url,
      status: payload.status,
      message: payload.message,
    },
  }))
  /* on(completeTodo, (state, { id }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          done: true,
        };
      } else {
        return todo;
      }
    });
  }),
  on(editTodo, (state, { id, title }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title: title,
        };
      } else {
        return todo;
      }
    });
  }),
  on(deleteTodo, (state, { id }) => state.filter((todo) => todo.id !== id)) */
);

export function todoReducer(state: TodoState, action: Action) {
  return _todoReducer(state, action);
}
