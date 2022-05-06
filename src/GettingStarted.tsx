// 리코일 시작하기
import React from 'react';
import {
  RecoilRoot,
  atom,
  useRecoilState,
  selector,
  useRecoilValue,
} from 'recoil';

export default function App() {
  return (
    <RecoilRoot>
      <CharacterCounter />
    </RecoilRoot>
  );
}

const textState = atom({
  key: 'textState', // unique ID
  default: '', // default value
});

function CharacterCounter() {
  return (
    <>
      <TextInput />
      <CharacterCount />
    </>
  );
}

function TextInput() {
  const [text, setText] = useRecoilState(textState);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
}

const charCountState = selector({
  key: 'charCountState',
  get: ({ get }) => {
    const text = get(textState);

    return text.length;
  },
});

function CharacterCount() {
  const count = useRecoilValue(charCountState);

  return <>Character Count: {count}</>;
}
