const { Platform } = require('../db');


const getPlatforms = async (req, res) => {
    try {
        const platforms  = await Platform.findAll();
        if (platforms) {
            res.json({
                messaje: "Platforms found successfully",
                data: platforms
            })
        }else {
            res.sendStatus(404);
        }
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    getPlatforms
}