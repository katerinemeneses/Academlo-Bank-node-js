const { catchAsync } = require('../utils/catchAsync')
const { User } = require('../models/users.model')

const userExist = catchAsync(async (req, res, next) => {
  const { id } = req.params

  const user = await User.findOne({where: { id }})

  if(!user){
    return res.status(404).json({
      status: 'failed',
      message: "The user is not exist"
    })
  }

  req.user = user

  next()
})

module.exports = {
  userExist
}