import User from '../models/user.model.js'

// make the admin account from the .env file
// the password is hashed by the user model
const seedAdmin = async () => {
  const name = process.env.ADMIN_NAME || 'Admin'
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD

  if (!email || !password) {
    console.log('Admin not created: add ADMIN_EMAIL and ADMIN_PASSWORD to .env')
    return
  }

  try {
    const user = await User.findOne({ email: email })
    if (user) {
      if (user.role !== 'admin') {
        user.role = 'admin'
        await user.save()
      }
      console.log('Admin account is ready.')
      return
    }
    const admin = new User({ name: name, email: email, password: password, role: 'admin' })
    await admin.save()
    console.log('Admin account created.')
  } catch (err) {
    console.log('Admin error:', err.message)
  }
}

export default seedAdmin