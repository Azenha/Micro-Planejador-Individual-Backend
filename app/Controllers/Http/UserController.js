'use strict'

const User = use('App/Models/User')

class UserController {
  async index ({ response }) {
    const users = await User.all()

    return response.json(users)
  }

  async store ({ request, response }) {
    const userData = request.only(['username', 'email', 'password'])

    try {
      const user = await User.create(userData)
      console.log('User created:', user) // Log the created user
      return response.status(201).json(user)
    } catch (error) {
      console.error('User creation failed:', error) // Log any errors
      return response.status(400).json({ message: 'User creation failed', error: error.message })
    }
  }

  async show ({ params, response }) {
    const user = await User.find(params.id)

    if (!user) {
      return response.status(404).json({ message: 'User not found' })
    }

    return response.json(user)
  }

  async update ({ params, request, response }) {
    const userData = request.only(['username', 'email', 'password'])

    const user = await User.find(params.id)

    if (!user) {
      return response.status(404).json({ message: 'User not found' })
    }

    user.merge(userData)
    await user.save()

    return response.json(user)
  }

  async destroy ({ params, response }) {
    const user = await User.find(params.id)

    if (!user) {
      return response.status(404).json({ message: 'User not found' })
    }

    await user.delete()

    return response.status(204).json({ message: 'User deleted' })
  }
}

module.exports = UserController
