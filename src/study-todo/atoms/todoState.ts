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

export const todoIdsState = atom<TodoListState['id'][]>({
  key: 'todoIdState',
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
        set(todoIdsState, (prevValue) =>
          prevValue.filter((item) => item !== id)
        );
        return;
      }
      set(todoItemAtomFaily(id), newValue);
      set(todoIdsState, (prev) => {
        if (prev.includes(newValue.id)) {
          return [...prev];
        }
        return [...prev, newValue.id];
      });
    },
});

export const todoListFilterState = atom<string>({
  key: 'todoListFilterState',
  default: 'Show All',
});

export const filteredTodoIdsStateState = selector({
  key: 'filteredTodoListSelectorFamily',
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const ids = get(todoIdsState);

    switch (filter) {
      case 'Show Completed':
        return ids.filter((item) => get(todoItemAtomFaily(item)).isComplete);
      case 'Show Uncompleted':
        return ids.filter((item) => !get(todoItemAtomFaily(item)).isComplete);
      default:
        return ids;
    }
  },
});

export const todoListStatsState = selector({
  key: 'todoListStatsState',
  get: ({ get }) => {
    const ids = get(filteredTodoIdsStateState);
    const totalNum = ids.length;
    const totalCompletedNum = ids.filter(
      (item) => get(todoItemAtomFaily(item)).isComplete
    ).length;
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
