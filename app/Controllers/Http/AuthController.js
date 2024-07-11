'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')

class AuthController {
  async login ({ request, auth, response }) {
    const { email, password } = request.all()

    try {
      // Check if the user exists
      const user = await User.findByOrFail('email', email)

      // Verify the password
      const passwordVerified = await Hash.verify(password, user.password)
      if (!passwordVerified) {
        return response.status(400).json({ message: 'Invalid credentials' })
      }

      // Generate a token
      const token = await auth.generate(user)

      return response.json({ type: token.type, token: token.token, refreshToken: token.refreshToken })
    } catch (error) {
      return response.status(500).json({ message: 'Login failed', error: error.message })
    }
  }
}

module.exports = AuthController
