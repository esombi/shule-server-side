const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const assigService = require('./assign.service');

//routes
router.post('/register', registerSchema, register);
//router.get('/current', authorize(), getCurrent);
//router.get('/:id', authorize(), getById);
router.put('/:id',  updateSchema, update);
router.delete('/:id',  _delete);

module.exports = router;

function registerSchema(req, res, next) {
    const schema = Joi.object({
        Assignment_given: Joi.number().required(),
        Assignment_completed: Joi.number().required(),
        Assignment_pending: Joi.number().required(),
        remark: Joi.string().optional(),
       studentId: Joi.number().required(),
       parentId: Joi.number().required(),
       teacherId: Joi.number().required()

    });
        validateRequest(req, next, schema);
    }
    function register(req, res, next) {
        assigService.create(req.body)
            .then(() => res.json({ message: 'student assignment added' }))
            .catch(next);
    }

    function updateSchema(req, res, next) {
        const schema = Joi.object({
            Assignment_given: Joi.number().empty(''),
            Assignment_completed: Joi.number().empty(''),
            Assignment_pending: Joi.number().empty(''),
            remark: Joi.string().min(6).empty('')
        });
        validateRequest(req, next, schema);
    }

    function update(req, res, next) {
        assigService.update(req.params.id, req.body)
            .then(user => res.json(user))
            .catch(next);
    }    

    function _delete(req, res, next) {
        assigService.delete(req.params.id)
            .then(() => res.json({ message: 'Student deleted successfully' }))
            .catch(next);
    }
    