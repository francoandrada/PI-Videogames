const Sequelize = require('sequelize');
const { Videogame } = require('../db');
const { GAMES_URL, BASE_URL } = require('../../constants');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const Op = Sequelize.Op;


// Agregar generos
const getVideogames = async (req, res, next) => {
    //const videogameApi = axios.get(`${BASE_URL}${GAMES_URL}`);
    //function getVideogames( req, res, next) {
    // return Videogame.findAll()
    //     .then((videogames) => res.send(videogames))
    //     .catch((err) => next(err));
    try {
        const videogames = await Videogame.findAll();
        let filtrado = videogames.length >= 15 ? videogames.slice(0, 15) : videogames;
        res.json({
            messaje: 'hola',
            data: filtrado
        })
    } catch (e) {
        next(e)
    }
}

const createVideogame = async (req, res, next) => {
    const { name, description, rating, platforms } = req.body;
    try {
        let newVideogame = await Videogame.create({
            id: uuidv4(),
            name,
            description,
            rating,
            platforms
        }, {
            fields: ['id', 'name', 'description', 'rating', 'platforms']
        });

        if (newVideogame) {
            return res.json({
                messaje: 'Videogame created succesfully',
                data: newVideogame
            });
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({
            messaje: 'Something goes wrong',
            data: {}
        });
    }
}

// name, description, release_date, rating, platforms
const getOneVideogame = async (req, res, next) => {
    const { id } = req.params;
    try {
        const videogame = await Videogame.findOne({
            atributes: [  ],
            where: {
                id
            }
        });
        if (videogame) {
            return res.json({
                messaje: 'Videogame find succesfully',
                data: videogame
            });
        }
    } catch (e) {
        next(e)
    }
}

const videogamesByName = async (req, res, next) => {
    var nombre = req.query.name;

    try {
        const videogame = await Videogame.findAll({
            where: { name: { [Op.iLike]: `%${nombre}%` } }
        })
        if (videogame) {
            let filtrado = videogame.length >= 15 ? videogame.slice(0, 15) : videogame;
            res.json({
                messaje: 'Video games found succesfully',
                data: filtrado
            });
        } else {
            res.sendStatus(404)
        }

    } catch (e) {
        // res.status(500).json({
        //     messaje: 'Something goes wrong',
        //     data: {}
        // });
        //        console.log(e)
    }
}

module.exports = {
    getVideogames,
    createVideogame,
    getOneVideogame,
    videogamesByName
}
