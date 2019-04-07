import React from 'react'
import ReactDOM from 'react-dom';
import App from './components/App'
import {Provider} from 'react-redux'
import {initialState} from "./constant/initialState";
import {createStore} from "redux";
import cardListReducer from "./reducers/cardListReducer";
import {storeFactory} from "./reducers/storeFactory";


export const store = storeFactory(initialState);

const render = () => ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider> ,
    document.getElementById("root"));


store.subscribe(render);

render();