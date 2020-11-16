const express = require('express');
const transactionRouter = express.Router();
const controller = require('../services/transactionService')

transactionRouter.get('/find', controller.findAll)
transactionRouter.get('/findOne/:id', controller.findOne)
transactionRouter.get('/', controller.findAnoMes)
transactionRouter.post('/', controller.create)
transactionRouter.patch('/update/:id', controller.update)
transactionRouter.delete('/delete/:id', controller.deleteDado)


module.exports = transactionRouter;
