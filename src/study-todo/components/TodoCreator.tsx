import { useState, useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { todoListSelectorFamily } from 'src/study-todo/atoms/todoState';

export default function TodoItemCreator() {
  const [inputValue, setInputValue] = useState('');
  const [newId, setNewId] = useState(0);
  const setTotoItem = useSetRecoilState(todoListSelectorFamily(newId));

  const addItem = useCallback(() => {
    setTotoItem({
      id: newId,
      text: inputValue,
      isComplete: false,
    });
    setNewId((prev) => prev + 1);
    setInputValue('');
  }, [inputValue, newId, setTotoItem]);

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
