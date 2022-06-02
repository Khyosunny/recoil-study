import { useState, useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  todoListSelectorFamily,
  todoListState,
} from 'src/study-todo/atoms/todoState';

let id = 0;
function getId() {
  return id++;
}

export default function TodoItemCreator() {
  const [inputValue, setInputValue] = useState('');
  const setTodoList = useSetRecoilState(todoListState);
  const setTotoItem = useSetRecoilState(todoListSelectorFamily(getId()));

  const addItem = useCallback(() => {
    // setTodoList((oldTodoList) => [
    //   ...oldTodoList,
    //   {
    //     id: getId(),
    //     text: inputValue,
    //     isComplete: false,
    //   },
    // ]);
    setTotoItem({
      id: getId(),
      text: inputValue,
      isComplete: false,
    });
    setInputValue('');
  }, [setTotoItem, inputValue]);

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
