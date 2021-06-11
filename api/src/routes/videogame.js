//import { Router } from 'express';
const {Router} = require('express');
const { getVideogames, createVideogame, getOneVideogame, videogamesByName, getPlatforms} = require('../controllers/VideogameController');
const router = Router();


//videogames/busqueda
router.get('/busqueda', videogamesByName);
router.get('/platforms', getPlatforms )

// /videogames
router.get('/', getVideogames);
router.post('/', createVideogame);

// /videogames/:id
router.get('/:id', getOneVideogame);


module.exports = router;