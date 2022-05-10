const { User } = require('../models/users.model')
const { Transfer } = require('../models/transfers.model')
const { catchAsync } = require('../utils/catchAsync')

const createUser = catchAsync(async(req, res, next) => {
  const { name, password } = req.body

  const numberRandom = () => Math.floor(Math.random() * (999999 - 100000) + 100000)
  let accountNumber = numberRandom()

  let accountNumberExist = await User.findOne({where: { accountNumber }})

  while(accountNumberExist !== null){
    accountNumber = numberRandom()
    accountNumberExist = await User.findOne({where: { accountNumber }})
  }

  const newUser = await User.create({
    name,
    password,
    accountNumber,
  })

  res.status(201).json({
    message: 'The user has been created correctly',
    data: {
      userId: newUser.id,
      accountNumber: newUser.accountNumber,
      amount: newUser.amount,
      name: newUser.name
    }
  })
})

const loginUser = catchAsync(async(req, res, next) => {
  const { accountNumber, password } = req.body
  
  const userIsExists = await User.findOne({where: {accountNumber, password}})

  if(userIsExists) {
    res.status(201).json({
      message: 'Logging user is correct',
      data: {
        userId: userIsExists.id,
        accountNumber: userIsExists.accountNumber,
        amount: userIsExists.amount,
        name: userIsExists.name
      }
    })
  } else {
    res.status(400).json({
      message: 'The information user is not correct',
    })
  }
})

const getTotalTransferByUser = catchAsync(async (req, res, next) => {
  const { user } = req

  const transfersUser = await Transfer.findAll({where: { userId: user.id }})
  
  if(!transfersUser){
    return res.status(404).json({
      status: 'failed',
      message: "This user haven't transfers"
    })
  }

  res.status(200).json({
    status: 'success',
    data : {
      transfersUser
    }
  })
})

module.exports = {
  createUser,
  loginUser,
  getTotalTransferByUser
}