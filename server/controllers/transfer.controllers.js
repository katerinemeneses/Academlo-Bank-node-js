const { Transfer } = require('../models/transfers.model')
const { User } = require('../models/users.model')
const { catchAsync } = require('../utils/catchAsync')

const createTransfer = catchAsync(async(req, res, next) => {
  const { amountTransfer, accountNumberReceiver, accountNumberSent } = req.newTransfer
  const { userHasReceived } = req
  const { userHasSent } = req
  
  const newAmount = userHasSent.amount - amountTransfer
  const newAmountReceiver = userHasReceived.amount + amountTransfer
  
  await User.update({ amount: newAmount},
    {
      where: { accountNumber: accountNumberSent }
    }
  )

  await User.update({ amount: newAmountReceiver},
    {
      where: { accountNumber: accountNumberReceiver }
    }
  )

  const transfer = await Transfer.create({
    amount: amountTransfer,
    userId: userHasSent.id,
    receiverUserId: userHasReceived.id,
    userNameReceiver: userHasReceived.name
  })

  res.status(201).json({
    status: 'success',
    message: 'The transfer has been executed succesfully',
    transfer
  })

})

module.exports = {
  createTransfer
}