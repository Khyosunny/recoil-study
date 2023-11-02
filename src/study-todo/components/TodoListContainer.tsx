import { useRecoilValue } from 'recoil';
import { filteredTodoIdsStateState } from 'src/study-todo/atoms/todoState';
import TodoItem from './TodoItem';

function TodoListContainer() {
  const todoIdList = useRecoilValue(filteredTodoIdsStateState);
  return (
    <div>
      {todoIdList.map((id) => (
        <TodoItem key={`${id}_id`} id={id} />
      ))}
    </div>
  );
}

export default TodoListContainer;
