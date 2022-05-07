import { atom } from 'recoil';
import { TodoListState } from '../types/state';

export const todoListState = atom<TodoListState[]>({
  key: 'todoListState',
  default: [],
});
