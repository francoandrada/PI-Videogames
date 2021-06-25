const Sequelize = require('sequelize');
const { Videogame, Genre, Platform, genre_videogame } = require('../db');
const { GAMES_URL, BASE_URL } = require('../../constants');
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
                    // genres: g.genres.map(({ name }) => (name))
                    genres: g.genres.map(genre => genre.name)
                }
                return data;
            })
        )

        let gamesCut = games.slice(0, 15);
        let videogamesdb = await Videogame.findAll({
            attributes: ['id', 'name'],
            include: [{
                model: Genre,
                attributes: ['name']
            }]
        });

        let videoGamesDB = videogamesdb.map((game) => {
    
            try {
                let response = {
                    id: game.dataValues.id,
                    name: game.dataValues.name,
                    genres: game.dataValues.genres.map(el => el.dataValues.name),
                }
                // console.log({ response });
                return response
            } catch (error) {
                console.error(error)
            }
        })

        let videoJoin = [...gamesCut, ...videoGamesDB];
        // console.log(videoJoin[videoJoin.length - 1].genres)
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
    const { name, description, released, rating, genreName, platformName } = req.body;
    const genres = await Genre.findAll({
        attributes: ['id', 'name']
    });
    const platforms = await Platform.findAll({
        attributes: ['id', 'name']
    });



    //var areGenres = genres.filter((genre) => genreName.includes(genre.name));
    try {
        if (!name || !description || !rating || !released ||  !genreName || !platformName) {
            return res.status(500).json({
                messaje: 'Some of the fields are empty'
            });
        }
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
const getOneVideogame = async (req, res, next) => {
    const { id } = req.params;
    try {
        if (id.includes("-")) {
            const videogameDb = await Videogame.findOne({
                attributes: ['name', 'description', 'rating', 'released'],
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
            
            let videodb = {
                name :videogameDb.dataValues.name,
                description: videogameDb.dataValues.description,
                rating: videogameDb.dataValues.rating,
                genres: videogameDb.dataValues.genres.map(el => el.dataValues.name),
                platforms: videogameDb.dataValues.platforms.map(el => el.dataValues.name),
            }

            return res.json({
                messaje: 'Videogame find succesfully',
                data: videodb
            });
        }
        else if (!id.includes("-") && !!parseInt(id) && id.length < 7) {

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
        } else {
            return res.status(500).json({ messaje: 'Id not valid' })
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
        if (!nombre) {
            return res.status(500).json({ messaje: "Name not entered" });
        }

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

        var apiFiltred = resultsApi.filter(game => game.name.toLowerCase().includes(nombre.toLowerCase()))

        const videogame = await Videogame.findAll({
            attributes: ['name', 'description'],
            where: { name: { [Op.iLike]: `%${nombre}%` } },
            include: [{
                model: Genre,
                attributes: ['name']
            }]
        })

        console.log(videogame)

        let videoGamesDB = videogame.map((game) => {
    
            try {
                let response = {
                    id: game.dataValues.id,
                    name: game.dataValues.name,
                    genres: game.dataValues.genres.map(el => el.dataValues.name),
                }
                // console.log({ response });
                return response
            } catch (error) {
                console.error(error)
            }
        })


        let gamesCut = apiFiltred.slice(0, 15);

        let videoJoin = [...gamesCut, ...videoGamesDB];
        if (videoJoin.length >= 1) {
            //let filtrado = videojoin.length >= 15 ? videoJoin.slice(0, 15) : videoJoin;
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


const videogamesByGenre = async (req, res, next) => {
    var genreName = req.query.genre;

    try {
        if (!genreName) {
            return res.status(500).json({ messaje: "Name not entered" });
        }

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

        var apiFiltred = resultsApi.filter(game => game.genres.includes(genreName))
        const videogame = await Videogame.findAll({
            include: [{
                model: Genre,
                where: {
                    name: genreName
                },
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

const sortVideogames = async (req, res, next) => {
    var sortType = req.query.sortBy;

    try {
        if (!sortType) {
            return res.status(500).json({ messaje: "Sort type not entered" });
        }

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
                        rating: g.rating,
                        background_image: g.background_image,
                        genres: g.genres.map(({ name }) => (name))
                    }
                    resultsApi.push(data)
                })
            )
        }


        if (sortType === 'A-Z') {
            function compareAscAz(a, b) {

                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();
                if (nameA < nameB) {
                    return -1;
                }

                if (nameA > nameB) {
                    return 1;
                }

                return 0
            }

            var videogame = await Videogame.findAll({
                order: [
                    ['name', 'ASC']
                ],
                include: [{
                    model: Genre,
                    attributes: ['name']
                }]
            })


            var apiFiltred = resultsApi.sort(compareAscAz);

        } else if (sortType === 'Z-A') {
            function compareDescZa(a, b) {
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();
                if (nameA < nameB) {
                    return 1;
                }

                if (nameA > nameB) {
                    return -1;
                }

                return 0
            }

            var videogame = await Videogame.findAll({
                order: [
                    ['name', 'DESC']
                ],
                include: [{
                    model: Genre,
                    attributes: ['name']
                }]
            })

            var apiFiltred = resultsApi.sort(compareDescZa);

        } else if (sortType === 'Highest Rating') {
            function compareDescRating(a, b) {
                return b.rating - a.rating
            }

            var videogame = await Videogame.findAll({
                order: [
                    ['rating', 'DESC']
                ],
                include: [{
                    model: Genre,
                    attributes: ['name']
                }]
            })

            var apiFiltred = resultsApi.sort(compareDescRating);

        } else if (sortType === 'Lower Rating') {
            function compareAscRating(a, b) {
                return a.rating - b.rating
            }

            var videogame = await Videogame.findAll({
                order: [
                    ['rating', 'ASC']
                ],
                include: [{
                    model: Genre,
                    attributes: ['name']
                }]
            })

            var apiFiltred = resultsApi.sort(compareAscRating);
        } else {
            return res.status(500).json({ messaje: 'SortType not valid' })
        }

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

module.exports = {
    getVideogames,
    createVideogame,
    getOneVideogame,
    videogamesByName,
    videogamesByGenre,
    sortVideogames
}
