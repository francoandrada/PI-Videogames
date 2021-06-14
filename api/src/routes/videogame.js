//import { Router } from 'express';
const {Router} = require('express');
const { getVideogames, createVideogame, getOneVideogame, videogamesByName} = require('../controllers/VideogameController');
const router = Router();


//videogames/busqueda
router.get('/busqueda', videogamesByName);

// /videogames
router.get('/', getVideogames);
router.post('/', createVideogame);

// /videogames/:id
router.get('/:id', getOneVideogame);


module.exports = router;