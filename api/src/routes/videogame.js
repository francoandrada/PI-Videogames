//import { Router } from 'express';
const {Router} = require('express');
const { getVideogames, createVideogame, getOneVideogame, videogamesByName, videogamesByGenre} = require('../controllers/VideogameController');
const router = Router();


//videogames/byName
router.get('/byName', videogamesByName);
router.get('/byGenre', videogamesByGenre);

// /videogames
router.get('/', getVideogames);
router.post('/', createVideogame);

// /videogames/:id
router.get('/:id', getOneVideogame);


module.exports = router;