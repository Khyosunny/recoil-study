# Recoil

## Atom

- `Atom` 은 상태(state)의 일부를 나타낸다. 어떤 컴포넌트에서나 읽고 쓸 수 있다. atom 의 값을 읽는 컴포넌트들은 암묵적으로 atom 을 구독한다. 리덕스의 store 같은 개념이다. atom이 업데이트 되면, 해당 atom 을 구독하고 있는 모든 컴포넌트들은 리렌더링 된다.
- `default` : atom 의 초깃값 또는 Promise 또는 동일한 타입의 값을 나타내는 다른 atom 이나 selector
- `key` : unique 한 key 값

### atom 과 자주 사용되는 Hooks

- `useRecoilState()` : atom 을 읽거나 쓰려고 할 때 사용되는 훅. atom 에 컴포넌트를 등록한다.
- `useRecoilValue()` : atom 읽기 전용 훅. atom 에 컴포넌트를 등록한다.
- `useSetRecoilState()` : atom 을 set 할 때 사용되는 훅
- `useResetRecoilState()` : atom 을 초깃값으로 초기화할 때 사용되는 훅

## Selector

- `Selector` 는 파생된 상태(derived state)의 일부를 나타낸다. 파생된 state는 state의 변화다. 주어진 state를 수정하는 **순수 함수**에 전달된 state의 결과물로 생각하면 된다.
- `key` : selector를 구분할 수 있는 unique 한 key 값
- `get` : derived state 를 return 한다.
