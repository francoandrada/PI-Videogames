import axios from 'axios';
import { SET_VIDEOGAMES, SET_VIDEOGAME_DETAIL, SET_GENRES, SET_VIDEOGAMES_NAME, SET_VIDEOGAMES_GENRE } from './actionsNames';


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

export function getVideogamesByName(name) {
    return (dispatch) => {
        axios.get(`http://localhost:3001/videogames/byName?name=${name}`)
        .then(response => {
            dispatch({ type: SET_VIDEOGAMES_NAME, payload: response.data })
        }).catch(error => {
            if (error.response?.status !== 404) alert('Something goes wrong')
            dispatch({ type: SET_VIDEOGAMES_NAME, payload: null })
        })
    }
}

export function getVideogamesByGenre(genre) {
    return (dispatch) => {
        axios.get(`http://localhost:3001/videogames/byGenre?genre=${genre}`)
        .then(response => {
            dispatch({ type: SET_VIDEOGAMES_GENRE, payload: response.data })
        }).catch(error => {
            if (error.response?.status !== 404) alert('Something goes wrong')
            dispatch({ type: SET_VIDEOGAMES_GENRE, payload: null })
        })
    }
}

