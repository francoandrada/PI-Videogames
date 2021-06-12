const Sequelize = require('sequelize');
const { Videogame, Genre, Platform } = require('../db');
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
    const { name, description, rating, genreName, platformName } = req.body;
    const genres = await Genre.findAll({
        attributes: ['id', 'name']
    });
    const platforms = await Platform.findAll({
        attributes: ['id', 'name']
    });

    //var areGenres = genres.filter((genre) => genreName.includes(genre.name));
    try {
        //  let newVideogame = await Videogame.create({
        //      id: uuidv4(),
        //      name,
        //      description,
        //      rating,
        //      platforms
        //  }, {
        //      fields: ['id', 'name', 'description', 'rating', 'platforms'],
        //  });
        var newVideogame = await Videogame.findOrCreate({
            where: { name: name },
            defaults: { id: uuidv4(), description: description, rating: rating }
        });

        if (!!newVideogame) {
            for (let i = 0; i < genreName.length; i++) {
                for (let j = 0; j < genres.length; j++) {
                    if (genres[j].name.toLowerCase() === genreName[i].toLowerCase()) {
                        await newVideogame[0].addGenre(genres[j].id);
                    }
                }
            }
            for (let i = 0; i < platformName.length; i++) {
                for (let j = 0; j < platforms.length; j++) {
                    if (platforms[j].name.toLowerCase() === platformName[i].toLowerCase()) {
                        await newVideogame[0].addPlatform(platforms[j].id);
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
                attributes: ['name', 'description', 'rating', ['createdAt', 'release_date']],
                where: {
                    id
                },
                include: [
                    {
                        model: Genre,
                        attributes: ['id', 'name']
                    },
                    {
                        model: Platform,
                        attributes: ['id', 'name']
                    }
                ]
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
                platforms: data.platforms.map(({ platform: { name } }) => (name))
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

//Cambiar para que busque con minusculas
const videogamesByName = async (req, res, next) => {
    var nombre = req.query.name;

    try {
        //var url = `${BASE_URL}${GAMES_URL}/${nombre}?key=${API_KEY}`;
        var resultsApi = [];
        var url = `${BASE_URL}${GAMES_URL}?key=${API_KEY}`;
        for (let i = 1; i <= 5; i++) {
            if (i == 1) {
                var { data: { results } } = await axios.get(url);
            } else {
                var { data: { results } } = await axios.get((url).concat(`&page=${i}`));
            }
            await Promise.all(
                results.map((g) => {
                    let data = {
                        id: g.id,
                        name: g.name,
                        background_image: g.background_image,
                        genres: g.genres.map(({ name }) => (name))
                    }
                    resultsApi.push(data)
                })
            )
        }
        //var { data } = await axios.get(url);
        //var resultsApi = {
        //    id: data.id,
        //    name: data.name,
        //    background_image: data.background_image,
        //    genres: data.genres.map(({ name }) => (name)),
        //    }
        var apiFiltred = resultsApi.filter(game => game.name.includes(nombre))
        const videogame = await Videogame.findAll({
            attributes: ['name', 'description'],
            where: { name: { [Op.iLike]: `%${nombre}%` } },
            include: [{
                model: Genre,
                attributes: ['name']
            }]
        })
        let videoJoin = [...apiFiltred, ...videogame];
        if (videoJoin.length >= 1) {
            let filtrado = videogame.length >= 15 ? videogame.slice(0, 15) : videogame;
            res.json({
                messaje: 'Video games found succesfully',
                data: videoJoin
            });
        } else {
            res.status(404).json({
                messaje: 'Video games not found ',
                data: {}
            });
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
