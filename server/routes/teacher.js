const express = require('express');
var router = express.Router();
const dbManager = require('../connections/dbConnection');
const { check, validationResult } = require('express-validator');


router.post('/login',[
    check("teacher_ID")
    .not().isEmpty().withMessage(" ID cannot be empty"),
    check('password')
    .not().isEmpty().withMessage("password cannot be empty")
], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            errors: errors.array()
        });
    }
    res.status(202).json({
        success: "ok"
    })
} )
module.exports = router;