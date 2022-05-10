const { catchAsync } = require('../utils/catchAsync')
const { User } = require('../models/users.model')


const accountNumberExist = catchAsync(async(req, res, next) => {
  const { amountTransfer, accountNumberReceiver, accountNumberSent } = req.body

  const userHasReceived = await User.findOne({ 
    where: {
      accountNumber: accountNumberReceiver
    }
  })

  const userHasSent = await User.findOne({
    where : {
      accountNumber: accountNumberSent
    }
  })

  if(!userHasReceived && !userHasSent) {
    return res.status(404).json({
      status: 'Error',
      message: 'Account number user receiver has not found'
    })
  }

  const newTransfer = {
    accountNumberReceiver,
    accountNumberSent,
    amountTransfer
  }

  req.newTransfer = newTransfer
  req.userHasReceived = userHasReceived
  req.userHasSent = userHasSent
  next()
})

const haveEnoughAmount = catchAsync(async(req, res, next) => {
  const { amountTransfer, accountNumberSent } = req.newTransfer

  const userSent = await User.findOne({ where: { accountNumber: accountNumberSent } })

  if(userSent.amount < amountTransfer ) {
    return res.status(404).json({
      status: 'failed',
      message: "The user amount is not enough"
    })
  }

  next()
})

const isNegativeOrZero = catchAsync(async(req, res, next) => {
  const { amountTransfer } = req.newTransfer

  if(amountTransfer <= 0) {
    return res.status(400).json({
      status: 'error',
      message: 'The amount transfer is not correct'
    })
  }

  next()
})

module.exports = {
  accountNumberExist,
  haveEnoughAmount,
  isNegativeOrZero
}