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
- `set?` : selector 는 첫 번째 매개변수로 콜백 객체와 새로운 입력 값을 전달하는 함수다.
  - `get()` : 다른 atom 이나 selector로부터 값을 찾는데 사용되는 함수이다. 이 함수는 atom 이나 selector를 구독하지 않는다.
  - `set()` : 업스트림 Recoil 상태의 값을 설정할 때 사용되는 함수이다. 첫 번째 매개변수는 Recoil 상태, 두 번째 매개변수는 새로운 값이다. 새로운 값은 업데이트 함수나 재설정 액션을 전파하는 DefaultValue 객체일 수 있다.
  - `reset()` : 업스트림 Recoil 상태를 기본값으로 재설정하는데 사용되는 함수이다. 유일한 매개변수는 Recoil 상태이다.
