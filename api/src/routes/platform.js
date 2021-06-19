const {Router} = require('express');
const { getPlatforms } = require('../controllers/PlatformController');
const router = Router();


// /platforms

router.get('/', getPlatforms);


module.exports = router;