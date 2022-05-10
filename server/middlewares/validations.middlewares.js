const { body, validationResult } = require('express-validator')

const createUserValidations = [
  body('name')
    .notEmpty().withMessage('Name cannot be empty'),
  body('password')
    .notEmpty().withMessage('Password cannot be empty')
    .isLength({ min: 8 }).withMessage('The minimal characters for the password is 8')
]

const loginValidation = [
  body('accountNumber')
    .notEmpty().withMessage('Account number cannot be empty'),
  body('password')
    .notEmpty().withMessage('password cannot be empty')
    .isLength({ min: 8 }).withMessage('The minimal characters for the password is 8')
]

const transferValidation = [
  body('amount')
    .notEmpty().withMessage('Amount cannot be empty'),
  body('accountNumberReceiver')
    .notEmpty().withMessage('Account number cannot be empty')
]

module.exports = {
  createUserValidations,
  loginValidation,
  transferValidation
}