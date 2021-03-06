const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Reservations Model
const Reservation = require('../models/reservation');
const Table = require('../models/table');
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

//Get all by table
router.get('/table/:id', (req, res, next) => {
    var id = req.params.id;
    //res.status(200).json(req.params.id);
    GetLatestTable(id, response => {
        Table.findOne({_id: id})
            .exec()
            .then(doc => {
                res.status(200).json({
                    table: doc,
                    reservation: response});
            }).catch(err => {
                console.log(err);
                res.status(500).json({
                    error : err
                });
            });
    });
});

function GetLatestTable(tableId, callback){
    Reservation.findOne({table: tableId})
        .sort({reference: -1})
        .exec((err, doc) => {
            if (doc != null) {
                return callback(doc);
            } else {
                return callback(null);
            }
        });
}


//insert
router.post('/', (req, res, next) => {
    GetNewReference(response => {
        const newReservation = new Reservation({
            _id: new mongoose.Types.ObjectId(),
            table: req.body.table,
            user: req.body.user,
            reference: response,
            guest: req.body.guest,
            paid: req.body.paid
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
            });
    });
});

function GetNewReference(callback) {
    var newRef = "SLS-" + new Date().getFullYear().toString().substr(-2) + ("0" + (new Date().getMonth() + 1)).slice(-2) + "-";
    var lastRef = newRef + "0001";

    Reservation.findOne({ reference: new RegExp(newRef, 'i') })
        .sort({ reference: -1 })
        .exec((err, doc) => {
            if (doc != null) {
                var arr = doc.reference.split("-");
                var inc = parseInt(arr[2]) + 1;
                lastRef = newRef + ("0000" + inc).slice(-4);
                return callback(lastRef);
            } else {
                return callback(lastRef);
            }
        });
}

//get by id
router.get('/:id', (req, res, next) => {
    console.log("Return form GetNew : ");
    GetNewReference(response => {
        console.log(response);
    });
    const id = req.params.id;
    Reservation.findById(id)
        .populate('table', 'code seat decription')
        .populate('user', 'badgeId nick fullName')
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

    Reservation.update({ _id: id }, { $set: req.body })
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