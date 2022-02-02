import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [logger];

// const store = createStore(rootReducer, applyMiddleware(...middlewares));
const store = createStore(rootReducer, applyMiddleware(...middlewares));

const persistor = persistStore(store);

// export default store;
export { store, persistor };

/**
 * store.js / root-reducer.js / index.js
 *
 * SessionStorage는 탭을 닫지않는 이상 자료가 유지되고
 * LocalStorage는 브라이저 데이터를 지우지 않는 이상 자료가 유지된다
 *  window.localStorage.setItem('myItem', JSON.stingify(객체))
 *  window.localStorage.getItem('myItem')
 *  window.localStorage.removeItem('myItem')
 *
 * npm i redux-persist를 사용하자
 * - localStorage/sessionStorage를 매우 쉽게 사용하게 해준다
 * - 설정이 약간 있다. store대신 persistStore를 사용해 브라우저가 store을 우리의 옵션에 따라 캐쉬화하 한다.
 * - rootReducer도 약간 바꾼다. 설정을 추가해 storage종류, persist할 state를 지정하고 사용
 * - index.js에서 PersistGate사용. persist버전의 store를 전달해 App 감싸자
 */
