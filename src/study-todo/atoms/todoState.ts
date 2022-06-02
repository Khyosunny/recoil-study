import {
  atom,
  atomFamily,
  DefaultValue,
  selector,
  selectorFamily,
} from 'recoil';
import { TodoListState } from 'src/study-todo/types/state';

export const todoItemAtomFaily = atomFamily<TodoListState, number>({
  key: 'todoItem',
  default: (id) => ({
    id,
    text: '',
    isComplete: false,
  }),
});

export const todoListState = atom<TodoListState[]>({
  key: 'todoListState',
  default: [],
});

export const todoListSelectorFamily = selectorFamily<TodoListState, number>({
  key: 'todoListSelectorFamily',
  get:
    (id) =>
    ({ get }) =>
      get(todoItemAtomFaily(id)),
  set:
    (id) =>
    ({ get, set, reset }, newValue) => {
      if (newValue instanceof DefaultValue) {
        reset(todoItemAtomFaily(id));
        set(todoListState, (prevValue) =>
          prevValue.filter((item) => item.id !== id)
        );
        return;
      }

      set(todoItemAtomFaily(id), newValue);
      set(todoListState, (prev) =>
        prev.some((item) => item.id === id)
          ? prev.map((item) =>
              item.id === id ? { ...item, ...newValue } : { ...item }
            )
          : [...prev, newValue]
      );
    },
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

export const todoListStatsState = selector({
  key: 'todoListStatsState',
  get: ({ get }) => {
    const todoList = get(todoListState);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
});
