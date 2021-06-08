//import { Router } from 'express';
const {Router} = require('express');
const { getVideogames, createVideogame, getOneVideogame, videogamesByName} = require('../controllers/VideogameController');
const router = Router();


// /videogames

router.get('/busqueda', videogamesByName);
router.get('/', getVideogames);
router.post('/', createVideogame);

// /videogames/:id
router.get('/:id', getOneVideogame);

// /videogames/?name=

module.exports = router;