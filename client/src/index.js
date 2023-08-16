import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store, {persistor} from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import {Provider} from 'react-redux'
import GlobalStyles from './components/GlobalStyle'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GlobalStyles>
        <App />
      </GlobalStyles>
    </PersistGate>
  </Provider>
);


