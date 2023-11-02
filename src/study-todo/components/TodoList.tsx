import TodoItemCreator from './TodoCreator';
import TodoListFilters from './TodoListFilters';
import TodoListStats from './TodoListStats';
import TodoListContainer from './TodoListContainer';

export default function TodoList() {
  return (
    <>
      <TodoListStats />
      <TodoListFilters />
      <TodoItemCreator />
      <TodoListContainer />
    </>
  );
}
