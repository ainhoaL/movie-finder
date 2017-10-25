import { SELECT_MOVIE } from '../actions/index';

export default function(state = [], action) {
    switch(action.type) {
        case SELECT_MOVIE:
            return action.payload;
        default:
            return state;
    }
}