// import { types } from '../actions/ActionTypes';

import { types } from "../actions/ActionType";

const initialState = {
    restaurentfavIds: [],
};


export function CharacterFavReducer(state = initialState, action) {
    switch (action.type) {
        case types.FAVORITE_RESTAURENT_IDS:
            return {
                ...state,
                restaurentfavIds: action.data,
            }
        default:
            return state
    }
}
