const { Genre } = require('../db');


const getGenres = async (req, res) => {
    try {
        const genres  = await Genre.findAll({
            order: [['name', 'ASC']]
        });
        if (genres) {
            res.json({
                messaje: "Genres found successfully",
                data: genres
            })
        }else {
            res.sendStatus(404);
        }
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    getGenres
}