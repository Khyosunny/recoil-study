import { useRecoilValue } from 'recoil';
import { filteredTodoListState } from 'src/study-todo/atoms/todoState';
import TodoItemCreator from './TodoCreator';
import TodoItem from './TodoItem';
import TodoListFilters from './TodoListFilters';

export default function TodoList() {
  const todoList = useRecoilValue(filteredTodoListState);

  return (
    <>
      <TodoListFilters />

      <TodoItemCreator />
      {todoList.map((todoItem) => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}
    </>
  );
}
