﻿var express = require('express');
var router = express.Router();
var UserService = require('_services/user.service');

// routes
router.get('/current', getCurrent);
router.get('/search', search);
router.get('/', getAll);
router.get('/:_id', getById);
router.post('/', create);
router.put('/:_id', update);
router.delete('/:_id', _delete);

module.exports = router;

function getCurrent(req, res, next) {
    res.send(req.user);
}

function search(req, res, next) {
    var userService = new UserService(req.user);
    userService.search(req.query.q)
        .then(users => res.send(users))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    var userService = new UserService(req.user);
    userService.getAll()
        .then(users => res.send(users))
        .catch(err => next(err));
}

function getById(req, res, next) {
    var userService = new UserService(req.user);
    userService.getById(req.params._id)
        .then(user => user ? res.send(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function create(req, res, next) {
    var userService = new UserService(req.user);
    var user = req.body;
    user.createdBy = req.user.sub;
    userService.create(user)
        .then(() => res.sendStatus(200))
        .catch(err => next(err));
}

function update(req, res, next) {
    var userService = new UserService(req.user);
    userService.update(req.params._id, req.body)
        .then(() => res.sendStatus(200))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    var userService = new UserService(req.user);
    userService.delete(req.params._id)
        .then(() => res.sendStatus(200))
        .catch(err => next(err));
}