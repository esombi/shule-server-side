const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const courseService = require('./courses.service');

//routes
router.post('/register', registerSchema, register);
//router.get('/:id',  getById);
//router.put('/:id',  updateSchema, update);
//router.delete('/:id',  _delete); 

module.exports = router; 

function registerSchema(req, res, next) { 
    const schema = Joi.object({
        courses: Joi.string().required(),
        teacherId: Joi.number().required(),
        studentId:Joi.number().required()

    });
    validateRequest(req, next, schema);
}
function register(req, res, next) {
    courseService.create(req.body)
        .then(() => res.json({ message: 'Course Added Successfully' }))
        .catch(next);
}