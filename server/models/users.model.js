const { DataTypes } = require('sequelize')
const { db } = require('../utils/database')

const User = db.define('user', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  accountNumber: {
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  amount: {
    allowNull: false,
    defaultValue: 1000,
    type: DataTypes.INTEGER
  },
  status: {
    allowNull: false,
    defaultValue: 'active',
    type: DataTypes.STRING
  }
})

module.exports = {
  User
}