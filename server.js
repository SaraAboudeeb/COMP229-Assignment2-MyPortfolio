import 'dotenv/config'
import mongoose from 'mongoose'
import config from './config/config.js'
import app from './server/express.js'
import seedAdmin from './server/helpers/seedAdmin.js'

mongoose.connect(config.mongoUri)
  .then(async () => {
    console.log('Connected to the database!')
    // make the admin account after connecting
    await seedAdmin()
  })
  .catch((err) => console.error('Database connection error:', err.message))

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to My Portfolio application.' })
})

app.listen(config.port, (err) => {
  if (err) console.log(err)
  console.info('Server started on port %s.', config.port)
})