import { useRecoilValue } from 'recoil';
import { filteredTodoIdStateState } from 'src/study-todo/atoms/todoState';
import TodoItem from './TodoItem';

export default function TodoListContainer() {
  const todoIdList = useRecoilValue(filteredTodoIdStateState);
  return (
    <>
      {todoIdList.map((id) => (
        <TodoItem key={id} id={id} />
      ))}
    </>
  );
}
