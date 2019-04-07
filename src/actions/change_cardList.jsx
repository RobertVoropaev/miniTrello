export const CHANGE_CARD_LIST = "CHANGE_CARD_LIST";

export const changeCardListAction = (newState) => ({
    type: CHANGE_CARD_LIST,
    payload: newState,
});
