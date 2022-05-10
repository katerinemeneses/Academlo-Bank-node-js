const express = require('express')
const { transferValidation } = require('../middlewares/validations.middlewares')
const { accountNumberExist, haveEnoughAmount, isNegativeOrZero } = require('../middlewares/transfer.middlewares')
const { createTransfer } = require('../controllers/transfer.controllers')

const transferRouters = express.Router()

transferRouters.route('/')
  .post(transferValidation, accountNumberExist, haveEnoughAmount, isNegativeOrZero, createTransfer)

module.exports = {
  transferRouters
}