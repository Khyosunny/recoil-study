import React, { useCallback, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { todoListState } from 'src/study-todo/atoms/todoState';
import { TodoListState } from 'src/study-todo/types/state';
import {
  removeItemAtIndex,
  replaceItemAtIndex,
} from 'src/study-todo/util/todoUtil';

interface TodoItemProps {
  item: TodoListState;
}
export default function TodoItem({ item }: TodoItemProps) {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const index = useMemo(
    () => todoList.findIndex((listItem) => listItem === item),
    [item, todoList]
  );

  const editItemText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newList = replaceItemAtIndex<TodoListState>(todoList, index, {
        ...item,
        text: e.target.value,
      });
      setTodoList(newList);
    },
    [item, index, todoList, setTodoList]
  );

  const toggleItemCompletion = useCallback(() => {
    const newList = replaceItemAtIndex<TodoListState>(todoList, index, {
      ...item,
      isComplete: !item.isComplete,
    });

    setTodoList(newList);
  }, [item, index, todoList, setTodoList]);

  const deleteItem = useCallback(() => {
    const newList = removeItemAtIndex<TodoListState>(todoList, index);
    setTodoList(newList);
  }, [index, todoList, setTodoList]);

  return (
    <div>
      <input type="text" value={item.text} onChange={editItemText} />
      <input
        type="checkbox"
        checked={item.isComplete}
        onChange={toggleItemCompletion}
      />
      <button onClick={deleteItem}>X</button>
    </div>
  );
}
