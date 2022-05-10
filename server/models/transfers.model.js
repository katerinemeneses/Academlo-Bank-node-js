const { DataTypes } = require('sequelize')
const { db } = require('../utils/database')

const Transfer = db.define('transfer', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  userId: {
    allowNull: false,
    foreignKey: true,
    type: DataTypes.INTEGER
  },
  receiverUserId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  userNameReceiver: {
    allowNull:false,
    type: DataTypes.STRING
  }
})

module.exports = {
  Transfer
}