import axios from 'axios';
import { SET_VIDEOGAMES, SET_VIDEOGAME_DETAIL, SET_GENRES } from './actionsNames';


//dispatch es una funcion de la store de redux que sirve para enviar acciones
export function getAllVideogames(page) {
    return (dispatch) => {
        axios.get(`http://localhost:3001/videogames?page=${page}`).then(response => {
            dispatch({ type: SET_VIDEOGAMES, payload: response.data })
        })
    }
}

export function getAllGenres() {
    return (dispatch) => {
        axios.get('http://localhost:3001/genres').then(response => {
            dispatch({ type: SET_GENRES, payload: response.data })
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


