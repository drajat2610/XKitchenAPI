const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Reservations Model
const Reservation = require('../models/reservation');
//get all
router.get('/', (req, res, next) => {
    Reservation.find()
        .populate('table', 'code seat decription')
        .populate('user', 'badgeId nick fullName')
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
//insert
router.post('/', (req, res, next) => {
    const newReservation = new Reservation({
        _id: new mongoose.Types.ObjectId(),
        table: req.body.table,
        user: req.body.user,
        guest: req.body.guest,
        createDate: req.body.createDate
    });

    newReservation.save()
        .then(result => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
});

//get by id
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Reservation.findById(id)
        .populate('table', 'code seat decription' && 'user', 'badgeId nick fullName')
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});

//update
router.patch('/:id', (req, res, next) => {
    const id = req.params.id;
    const updateOps = {};

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Reservation.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});

//delete
router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    Reservation.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});

module.exports = router;