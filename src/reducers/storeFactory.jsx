import {createStore, applyMiddleware} from "redux";
import {initialState} from "../constant/initialState";
import cardListReducer from "../reducers/cardListReducer";

const saver = store => next => action => {
    let result = next(action);
    localStorage['miniTrello'] = JSON.stringify(store.getState());
    return result;
};

const initStorage = (initState = initialState) => {
    return localStorage['miniTrello'] ? JSON.parse(localStorage['miniTrello']) : initState;
}

export const storeFactory = (initState = initialState) => (
    applyMiddleware(saver)(createStore)(cardListReducer, initStorage(initState))
);