const { Videogame } = require('../db');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { GAMES_URL, BASE_URL } = require('../../constants');



const getVideogames = async (req, res, next) => {
    //const videogameApi = axios.get(`${BASE_URL}${GAMES_URL}`);
    //function getVideogames( req, res, next) {
    // return Videogame.findAll()
    //     .then((videogames) => res.send(videogames))
    //     .catch((err) => next(err));
    try {
        const videogames = await Videogame.findAll();
        res.json({
            data: videogames
        })
    } catch (e) {
        next(e)
    }
}

const createVideogame = async (req, res, next) => {
    const { name, description, rating, plataforms } = req.body;
    try {
        let newVideogame = await Videogame.create({
            id: uuidv4(),
            name,
            description,
            rating,
            plataforms
        }, {
            fields: ['id', 'name', 'description', 'rating', 'plataforms']
        });

        if (newVideogame) {
            return res.json({
                messaje: 'Videogame created succesfully',
                data: newVideogame
            });
        }
    } catch (e) {
        res.status(500).json({
            messaje: 'Something goes wrong',
            data: {}
        });
    }
}

const getOneVideogame = async (req, res) => {
    const { id } = req.params;
    try {
        const videogame = await Videogame.findOne({
            where: {
                id
            }
        });
        if (videogame) {
            return res.json({
                messaje: 'Videogame created succesfully',
                data: videogame
            });
        }
    } catch (e) {
        next(e)
    }
}

module.exports = {
    getVideogames,
    createVideogame,
    getOneVideogame
}
