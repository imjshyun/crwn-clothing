import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'; // store obj를 전체 앱에 제공하기 위해 필요하다.
import { PersistGate } from 'redux-persist/integration/react'; // react에서 사용하기 위해서

import './index.css';
import App from './App';

import { store, persistor } from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
