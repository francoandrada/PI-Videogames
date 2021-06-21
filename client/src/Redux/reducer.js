
import { SET_VIDEOGAMES, SET_VIDEOGAME_DETAIL, SET_GENRES, SET_VIDEOGAMES_NAME, SET_VIDEOGAMES_GENRE, SET_VIDEOGAMES_SORT, SET_PLATFORMS, CREATE_VIDEOGAME} from './actionsNames';

const initialState = {
    videogamesCreate: null,
    videogames: undefined,
    videogameDetail: undefined,
    genres: [],
    platforms: []
}


export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_VIDEOGAME: {
            return {
                ...state,
                videogamesCreate: action.payload
            }
        }
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
        case SET_VIDEOGAMES_SORT: {
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
        case SET_PLATFORMS: {
            return {
                ...state,
                platforms: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

