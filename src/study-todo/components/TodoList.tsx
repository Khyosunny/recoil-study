import { useRecoilValue } from 'recoil';
import { todoListState } from 'src/study-todo/atoms/todoListState';
import TodoItemCreator from './TodoCreator';
import TodoItem from './TodoItem';

export default function TodoList() {
  const todoList = useRecoilValue(todoListState);

  return (
    <>
      <TodoItemCreator />
      {todoList.map((todoItem) => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}
    </>
  );
}
