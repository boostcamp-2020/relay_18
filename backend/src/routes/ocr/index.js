const {Router} = require('express')

const router = Router()
const service = require('./service')

router.post('/ocr',service.getOcr)

module.exports = router