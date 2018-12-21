import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import authReducer from './store/reducers/auth';
import goalReducer from './store/reducers/goals';
import { AuthState } from './store/types/auth';
import { GoalsState } from './store/types/goals';

export interface AppState {
  auth: AuthState;
  goals: GoalsState;
}

const rootReducer = combineReducers<AppState>({
  auth: authReducer,
  goals: goalReducer
});

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk),
));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>

);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
