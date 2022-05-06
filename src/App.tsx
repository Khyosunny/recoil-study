import React from 'react';
import { RecoilRoot } from 'recoil';
import TodoList from './study-todo/Atoms';

export default function App() {
  return (
    <RecoilRoot>
      <TodoList />
    </RecoilRoot>
  );
}
