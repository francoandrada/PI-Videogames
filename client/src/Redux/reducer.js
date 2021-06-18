
import { SET_VIDEOGAMES, SET_VIDEOGAME_DETAIL, SET_GENRES, SET_VIDEOGAMES_NAME, SET_VIDEOGAMES_GENRE} from './actionsNames';

const initialState = {
    videogames: undefined,
    videogameDetail: undefined,
    genres: []
}


export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case SET_VIDEOGAMES: {
            return {
                ...state,
                videogames: action.payload
            }
        }
        case SET_VIDEOGAMES_NAME: {
            return {
                ...state,
                videogames: action.payload
            }
        }
        case SET_VIDEOGAMES_GENRE: {
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
        case SET_GENRES: {
            return {
                ...state,
                genres: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

