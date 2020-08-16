const express = require('express');
const router = express.Router();
const createPWD = require('../../../modules/createPWD');
const db = require('../../../sequelize/models/index');


router.post('/', async (req, res, next) => {
    try {
        let { user_id, user_pwd,user_name,user_school,user_address,user_birthday } = req.body;
        if (!user_id || !user_pwd) throw Error();
        let newPWD = await createPWD(user_pwd);
        await db.user.create({id: user_id,password: newPWD,name: user_name,school: user_school,address: user_address,birthday: user_birthday})
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