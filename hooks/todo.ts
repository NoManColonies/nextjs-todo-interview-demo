import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../stores";
import {
  addTodo,
  deleteTodo,
  moveTodo,
  MoveTodoContent,
  Todo,
  TodoContent,
  TodoEditContent,
  updateTodo,
} from "../stores/slices/todo";

export type TodoStates = {
  todos: Todo[];
};

export type CreateTodoCb = (todo: TodoContent) => void;
export type UpdateTodoCb = (todo: TodoEditContent) => void;
export type DeleteTodoCb = (todo: string) => void;
export type MoveTodoCb = (todo: MoveTodoContent) => void;

export type TodoHandlers = {
  useCreateTodo: CreateTodoCb;
  useEditTodo: UpdateTodoCb;
  useDeleteTodo: DeleteTodoCb;
  useMoveTodo: MoveTodoCb;
};

export function useTodo(): [TodoStates, TodoHandlers] {
  const todos = useSelector((state: RootState) => state.todoReducer.todos);
  const dispatch = useDispatch();

  const useCreateTodo = useCallback(
    (todo: TodoContent) => dispatch(addTodo(todo)),
    [dispatch]
  );
  const useEditTodo = useCallback(
    (todo: TodoEditContent) => dispatch(updateTodo(todo)),
    [dispatch]
  );
  const useDeleteTodo = useCallback(
    (todo: string) => dispatch(deleteTodo(todo)),
    [dispatch]
  );
  const useMoveTodo = useCallback(
    (todo: MoveTodoContent) => dispatch(moveTodo(todo)),
    [dispatch]
  );

  const memorizedStates = useMemo(() => ({ todos }), [todos]);
  const memorizedCallbacks = useMemo(
    () => ({ useCreateTodo, useEditTodo, useDeleteTodo, useMoveTodo }),
    [useCreateTodo, useEditTodo, useDeleteTodo, useMoveTodo]
  );

  return [memorizedStates, memorizedCallbacks];
}
