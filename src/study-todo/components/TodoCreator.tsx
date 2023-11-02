import { useState, useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { todoListSelectorFamily } from 'src/study-todo/atoms/todoState';

let id = 0;
function getId() {
  return id++;
}

export default function TodoItemCreator() {
  const [inputValue, setInputValue] = useState('');
  const newId = getId();
  const setTotoItem = useSetRecoilState(todoListSelectorFamily(newId));

  const addItem = useCallback(() => {
    setTotoItem({
      id: newId,
      text: inputValue,
      isComplete: false,
    });
    setInputValue('');
  }, [inputValue, setTotoItem, newId]);

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
