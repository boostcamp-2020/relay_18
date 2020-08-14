const {Router} = require('express')

const router = Router()
const service = require('./service')

router.get('/ocr',service.getOcr)

module.exports = router