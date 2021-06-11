const Sequelize = require('sequelize');
const { Videogame, Genre } = require('../db');
const { GAMES_URL, BASE_URL, PLATFORM_URL } = require('../../constants');
const { API_KEY } = process.env;
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const Op = Sequelize.Op;






// Agregar generos
const getVideogames = async (req, res, next) => {
    const page = req.query.page
    try {

        if (page < 2 || page == undefined) {
            var url = `${BASE_URL}${GAMES_URL}?key=${API_KEY}`;
        } else {
            var url = `${BASE_URL}${GAMES_URL}?key=${API_KEY}&page=${page}`;
        }

        let { data: { next, results } } = await axios.get(url);
        const games = await Promise.all(
            results.map((g) => {
                let data = {
                    id: g.id,
                    name: g.name,
                    background_image: g.background_image,
                    genres: g.genres.map(({ name }) => (name))
                }
                return data;
            })
        )

        //let gamesCut = gamesList.slice(0, 1);
        let videogamesdb = await Videogame.findAll({
            include: Genre
        });
        let videoJoin = [...games, ...videogamesdb];
        videoJoin ?
            res.json({
                messaje: "Videogames found successfully",
                data: videoJoin
            }) : res.status(500).json({
                messaje: 'Something goes wrong',
                data: {}
            });
    } catch (e) {
        res.status(500).json({
            messaje: 'Something goes wrong',
            data: {}
        });
    }
}

const createVideogame = async (req, res, next) => {
    const { name, description, rating, platforms, genreName } = req.body;
    const genres = await Genre.findAll({
        atributes: ['id', 'name']
    });

    //var areGenres = genres.filter((genre) => genreName.includes(genre.name));

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
            for (let i = 0; i < genreName.length; i++) {
                for (let j = 0; j < genres.length; j++) {
                    if (genres[j].name.toLowerCase() === genreName[i].toLowerCase()) {
                        await newVideogame.addGenre(genres[j].id);
                    }
                }
            }

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
// Como buscar datos de los 100 juegos de la api sin que tarde 8 segundos
const getOneVideogame = async (req, res, next) => {
    const { id } = req.params;
    try {
        if (id.includes("-")) {
            const videogameDb = await Videogame.findOne({
                atributes: ['name', 'description', 'release_date', 'rating', 'platforms'],
                where: {
                    id
                },
                include: Genre
            })
            return res.json({
                messaje: 'Videogame find succesfully',
                data: videogameDb
            });
         } 
        else {
            var url = `${BASE_URL}${GAMES_URL}/${id}?key=${API_KEY}`;
            let { data } = await axios.get(url);
            const videogameApi = {
                id: data.id,
                name: data.name,
                description: data.description,
                released: data.released,
                rating: data.rating,
                background_image: data.background_image,
                genres: data.genres.map(({ name }) => (name)),
                platforms: data.platforms.map(({ platform: {name} }) => (name))
            }
            return res.json({
                messaje: 'Videogame find succesfully',
                data: videogameApi
            });
        }
    } catch (e) {
        res.status(500).json({
            messaje: 'Something goes wrong',
            data: {}
        });
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
        console.log(e);
        res.status(500).json({
            messaje: 'Something goes wrong',
            data: {}
        });
    }
}

const getPlatforms = async (req, res) => {
    const { data: { results } } = await axios.get(`${BASE_URL}${PLATFORM_URL}?key=${API_KEY}`);
    const platforms = await Promise.all(results.map(({ name }) => (name)));
    res.json(platforms);
    //return platforms;
}

module.exports = {
    getVideogames,
    createVideogame,
    getOneVideogame,
    videogamesByName,
    getPlatforms
}
