const express = require('express')
const { createUserValidations, loginValidation } = require('../middlewares/validations.middlewares')
const { createUser, loginUser, getTotalTransferByUser } = require('../controllers/user.controllers')
const { userExist } = require('../middlewares/user.middlewares')

const userRouters = express.Router()

//borrar
const { User } = require('../models/users.model')
const { Transfer } = require('../models/transfers.model')

//borrar
userRouters.route('/')
  .get(async(req, res, next)=> {

    const user = await User.findAll()
    const transfer = await Transfer.findAll()

    try {
      res.status(200).json({
        user,
        transfer
      })
    } catch (error) {
      next(error)
    }
  })

userRouters.route('/signup')
  .post(createUserValidations, createUser)

userRouters.route('/login')
  .post(loginValidation, loginUser)

userRouters.route('/:id/history')
  .get(userExist, getTotalTransferByUser)

module.exports = {
  userRouters
}