import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';

import { createStore, applyMiddleware } from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
        <MuiThemeProvider>
            <App/>
        </MuiThemeProvider>, document.getElementById('root'));
registerServiceWorker();
