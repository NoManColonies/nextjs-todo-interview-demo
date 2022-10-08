import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { User } from "./user";

export enum TodoType {
  TODO = "TODO",
  DOING = "DOING",
  DONE = "DONE",
}

export type Todo = {
  id: string;
  title: string;
  content: string;
  type: TodoType;
  createdBy: User;
};

export interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

export type TodoContent = {
  title: string;
  content: string;
  createdBy: User;
  type: TodoType;
};

export type TodoEditContent = {
  id: string;
  title: string;
  content: string;
};

export type MoveTodoContent = {
  id: string;
  type: TodoType;
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<TodoContent>) {
      const { payload } = action;
      state.todos.push({
        ...payload,
        id: uuidv4(),
      });
    },
    updateTodo(state, action: PayloadAction<TodoEditContent>) {
      const { payload } = action;
      const todo = state.todos.find((filter) => filter.id === payload.id);
      if (todo) {
        todo.title = payload.title;
        todo.content = payload.content;
      }
    },
    moveTodo(state, action: PayloadAction<MoveTodoContent>) {
      const { payload } = action;
      const todo = state.todos.find((filter) => filter.id === payload.id);

      if (todo) todo.type = payload.type;
    },
    deleteTodo(state, action: PayloadAction<string>) {
      const { payload } = action;
      const todoIndex = state.todos.findIndex(
        (filter) => filter.id === payload
      );
      if (todoIndex !== -1) state.todos.splice(todoIndex, 1);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTodo, updateTodo, moveTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
