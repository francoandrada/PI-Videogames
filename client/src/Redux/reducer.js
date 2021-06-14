
import { SET_VIDEOGAMES, SET_VIDEOGAME_DETAIL} from './actionsNames';

const initialState = {
    videogames: undefined,
    videogameDetail: undefined
}


export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case SET_VIDEOGAMES: {
            return {
                ...state,
                videogames: action.payload
            }
        }
        case SET_VIDEOGAME_DETAIL: {
            return {
                ...state,
                videogameDetail: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

