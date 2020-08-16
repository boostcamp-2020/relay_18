const {Router} = require('express');

const router = Router();
const service = require('./service/index');

router.use('/user',service);

module.exports = router;