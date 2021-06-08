//import { Router } from 'express';
const {Router} = require('express');
const { getGenres } = require('../controllers/GenreController');
const router = Router();


// /genres

router.get('/', getGenres);


module.exports = router;