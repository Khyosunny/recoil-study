import { atom, selector } from 'recoil';
import { TodoListState } from 'src/study-todo/types/state';

export const todoListState = atom<TodoListState[]>({
  key: 'todoListState',
  default: [],
});

export const todoListFilterState = atom<string>({
  key: 'todoListFilterState',
  default: 'Show All',
});

export const filteredTodoListState = selector({
  key: 'filteredTodoListState',
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case 'Show Completed':
        return list.filter((item) => item.isComplete);
      case 'Show Uncompleted':
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
});
