import React, { useCallback } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { todoListSelectorFamily } from 'src/study-todo/atoms/todoState';
import { TodoListState } from 'src/study-todo/types/state';

interface TodoItemProps {
  item: TodoListState;
}
export default function TodoItem({ item }: TodoItemProps) {
  const resetByItem = useResetRecoilState(todoListSelectorFamily(item.id));
  const setByItem = useSetRecoilState(todoListSelectorFamily(item.id));

  const editItemText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setByItem({
        ...item,
        text: e.target.value,
      });
    },
    [setByItem, item]
  );

  const toggleItemCompletion = useCallback(() => {
    setByItem({
      ...item,
      isComplete: !item.isComplete,
    });
  }, [setByItem, item]);

  const deleteItem = useCallback(() => {
    resetByItem();
  }, [resetByItem]);

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
