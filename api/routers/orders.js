const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Orders model
const Order = require('../models/order');
//get all
router.get('/', (req, res, next) => {
    Order.find()
        .populate('reservation', 'guest reference createDate')
        .populate('product', 'code initial name description price')
        .populate('user', 'userId badgeId  nick')
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
    const newOrder = new Order({
        _id: new mongoose.Types.ObjectId(),
        reservation: req.body.reservation,
        product: req.body.product,
        user: req.body.user,
        status: req.body.status,
        quantity: req.body.quantity,
        createDate: req.body.createDate,
        lastStatus: req.body.lastStatus,
        lastTime: req.body.lastTime
    });

    newOrder.save()
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
    Order.findById(id)
        .populate('reservation', 'guest reference createDate')
        .populate('product', 'code initial name description price')
        .populate('user', 'userId badgeId  nick')
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

    Order.update({ _id: id }, { $set: updateOps })
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
    Order.remove({ _id: id })
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