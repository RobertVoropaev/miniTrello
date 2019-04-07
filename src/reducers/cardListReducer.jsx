import {CHANGE_CARD_LIST} from "../actions/change_cardList"
import {initialState} from "../constant/initialState";


const cardListReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_CARD_LIST:
            return {...state, ...action.payload};
        default:
            return state;
    }
};

export default cardListReducer;