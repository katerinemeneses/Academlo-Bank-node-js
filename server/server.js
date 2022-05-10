const { app } = require('./app')
const { db } = require('./utils/database')
const { User } = require('./models/users.model')
const { Transfer } = require('./models/transfers.model')

db.authenticate()
  .then(() => console.log('Database authenticated'))
  .catch(err => console.log(err))

User.hasMany(Transfer)
Transfer.belongsTo(User)

db.sync()
  .then(() => console.log('Database Synced'))
  .catch(err => console.log(err))

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`)
})