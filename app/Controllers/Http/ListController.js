'use strict'

const List = use('App/Models/List')

class ListController {
  async index ({ auth, response }) {
    try {
      const user = await auth.getUser()
      const lists = await user.lists().fetch()

      return response.json(lists)
    } catch (error) {
      return response.status(500).json({ message: 'Failed to fetch lists' })
    }
  }

  async store ({ auth, request, response }) {
    try {
      const user = await auth.getUser()
      const { name } = request.only(['name'])

      const list = new List()
      list.fill({ name })

      await user.lists().save(list)

      return response.status(201).json(list)
    } catch (error) {
      return response.status(500).json({ message: 'Failed to create list' })
    }
  }

  async show ({ auth, params, response }) {
    try {
      const user = await auth.getUser()
      const list = await List.query()
        .where('id', params.id)
        .where('user_id', user.id)
        .with('items')
        .first()

      if (!list) {
        return response.status(404).json({ message: 'List not found' })
      }

      return response.json(list)
    } catch (error) {
      return response.status(500).json({ message: 'Failed to fetch list' })
    }
  }

  async update ({ auth, params, request, response }) {
    try {
      const user = await auth.getUser()
      const list = await List.query()
        .where('id', params.id)
        .where('user_id', user.id)
        .first()

      if (!list) {
        return response.status(404).json({ message: 'List not found' })
      }

      const { name } = request.only(['name'])

      list.merge({ name })
      await list.save()

      return response.json(list)
    } catch (error) {
      return response.status(500).json({ message: 'Failed to update list' })
    }
  }

  async destroy ({ auth, params, response }) {
    try {
      const user = await auth.getUser()
      const list = await List.query()
        .where('id', params.id)
        .where('user_id', user.id)
        .first()

      if (!list) {
        return response.status(404).json({ message: 'List not found' })
      }

      await list.delete()

      return response.status(204).json({ message: 'List deleted' })
    } catch (error) {
      return response.status(500).json({ message: 'Failed to delete list' })
    }
  }
}

module.exports = ListController
