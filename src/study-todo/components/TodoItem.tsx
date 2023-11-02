import React, { memo, useCallback } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { todoListSelectorFamily } from 'src/study-todo/atoms/todoState';

interface TodoItemProps {
  id: number;
}

function TodoItem({ id }: TodoItemProps) {
  const resetByItem = useResetRecoilState(todoListSelectorFamily(id));
  const [todo, setTodo] = useRecoilState(todoListSelectorFamily(id));

  const editItemText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTodo((prev) => ({
        ...prev,
        text: e.target.value,
      }));
    },
    [setTodo]
  );
  const toggleItemCompletion = useCallback(() => {
    setTodo((prev) => ({
      ...prev,
      isComplete: !prev.isComplete,
    }));
  }, [setTodo]);

  const deleteItem = useCallback(() => {
    resetByItem();
  }, [resetByItem]);

  return (
    <div>
      <input type="text" value={todo.text} onChange={editItemText} />
      <input
        type="checkbox"
        checked={todo.isComplete}
        onChange={toggleItemCompletion}
      />
      <button onClick={deleteItem}>X</button>
    </div>
  );
}
export default memo(TodoItem);
