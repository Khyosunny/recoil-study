import React, { useState, useCallback } from 'react';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

interface TodoListState {
  id: number;
  text: string;
  isComplete: boolean;
}

const todoListState = atom<TodoListState[]>({
  key: 'todoListState',
  default: [],
});

export default function TodoList() {
  const todoList = useRecoilValue(todoListState);

  return (
    <>
      <TodoItemCreator />
      {/* {todoList.map((todoItem) => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))} */}
    </>
  );
}

function TodoItemCreator() {
  const [inputValue, setInputValue] = useState('');
  const setTodoList = useSetRecoilState(todoListState);

  const addItem = () => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
      },
    ]);
    setInputValue('');
  };

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  return (
    <div>
      <input type="text" value={inputValue} onChange={onChange} />
      <button onClick={addItem}>Add</button>
    </div>
  );
}

let id = 0;
function getId() {
  return id++;
}
