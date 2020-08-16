const express = require('express');
const router = express.Router();
const createPWD = require('../../../modules/createPWD');
const db = require('../../../sequelize/models/index');



router.post('/', async (req, res, next) => {
    try {
        let { id, password, name,school,address,birthday } = req.body;
        if (!id || !password) throw Error();
        let newPWD = await createPWD(password);
        await db.user.create({id: id,password: newPWD,name: name, status:false, school: school,address: address,birthday: birthday})
        .then( result =>{
            res.status(201).json({ok:true, message:"회원가입을 축하드립니다"});
        })
        .catch( err => {
            res.status(409).send({ok:false, message:"중복입니다!!"});
        })

    } catch (err) {
        res.status(400).json({ok:false, message:"제대로 작성하세여!!"});
    }
});


module.exports = router;