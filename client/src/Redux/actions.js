import axios from 'axios';
import { SET_VIDEOGAMES, SET_VIDEOGAME_DETAIL } from './actionsNames';

export function getAllVideogames() {
    return (dispatch) => {
        axios.get('http://localhost:3001/videogames').then(response => {
            dispatch({ type: SET_VIDEOGAMES, payload: response.data })
        })
    }
}

export function getVideogame(id) {
    return (dispatch) => {
        axios.get(`http://localhost:3001/videogames/${id}`)
        .then(response => {
            dispatch({ type: SET_VIDEOGAME_DETAIL, payload: response.data })
        }).catch(error => {
            if (error.response?.status !== 404) alert('Something goes wrong')
            dispatch({ type: SET_VIDEOGAME_DETAIL, payload: null })
        })
    }
}

export function clearVideogame() {
    return  { type: SET_VIDEOGAME_DETAIL, payload: undefined }
}


