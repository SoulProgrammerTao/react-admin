import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import localStorage from "./utils/localStorage";
import memoryStorage from "./utils/memoryStorage";
memoryStorage.userInfo = localStorage.getUser()

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
