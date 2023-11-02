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

export const todoIdState = atom<TodoListState['id'][]>({
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
        set(todoIdState, (prevValue) =>
          prevValue.filter((item) => item !== id)
        );
        return;
      }
      set(todoItemAtomFaily(id), newValue);
      set(todoIdState, (prev) => Array.from(new Set([...prev, newValue.id])));
    },
});

export const todoListFilterState = atom<string>({
  key: 'todoListFilterState',
  default: 'Show All',
});

export const filteredTodoIdStateState = selector({
  key: 'filteredTodoListSelectorFamily',
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const ids = get(todoIdState);
    const completeIds = ids.filter(
      (item) => get(todoItemAtomFaily(item)).isComplete
    );
    const uncompletedIds = ids.filter(
      (item) => !get(todoItemAtomFaily(item)).isComplete
    );
    switch (filter) {
      case 'Show Completed':
        return completeIds;
      case 'Show Uncompleted':
        return uncompletedIds;
      default:
        return ids;
    }
  },
});

export const todoListStatsState = selector({
  key: 'todoListStatsState',
  get: ({ get }) => {
    const ids = get(filteredTodoIdStateState);
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
