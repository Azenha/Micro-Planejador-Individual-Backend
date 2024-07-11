'use strict'

const List = use('App/Models/List')
const Item = use('App/Models/Item')

class ItemController {
  async index ({ auth, params, response }) {
    try {
      const user = await auth.getUser()
      const list = await List.query()
        .where('id', params.lists_id)
        .where('user_id', user.id)
        .first()

      if (!list) {
        return response.status(404).json({ message: 'List not found' })
      }

      const items = await Item.query().where('list_id', params.lists_id).fetch()

      return response.json(items)
    } catch (error) {
      return response.status(500).json({ message: 'Failed to fetch items' })
    }
  }

  async store ({ auth, params, request, response }) {
    try {
      const user = await auth.getUser()
      const list = await List.query()
        .where('id', params.lists_id)
        .where('user_id', user.id)
        .first()

      if (!list) {
        return response.status(404).json({ message: 'List not found' })
      }

      const itemData = request.only(['description', 'completed', 'quantity', 'unit', 'value'])

      const item = new Item()
      item.fill(itemData)
      item.list_id = list.id

      await item.save()

      return response.status(201).json(item)
    } catch (error) {
      return response.status(500).json({ message: 'Failed to create item' })
    }
  }

  async show ({ auth, params, response }) {
    try {
      const user = await auth.getUser()
      const item = await Item.query()
        .where('id', params.id)
        .whereHas('list', (builder) => {
          builder.where('user_id', user.id)
        })
        .first()

      if (!item) {
        return response.status(404).json({ message: 'Item not found' })
      }

      return response.json(item)
    } catch (error) {
      return response.status(500).json({ message: 'Failed to fetch item' })
    }
  }

  async update ({ auth, params, request, response }) {
    try {
      const user = await auth.getUser()
      const item = await Item.query()
        .where('id', params.id)
        .whereHas('list', (builder) => {
          builder.where('user_id', user.id)
        })
        .first()

      if (!item) {
        return response.status(404).json({ message: 'Item not found' })
      }

      const itemData = request.only(['description', 'completed', 'quantity', 'unit', 'value'])

      item.merge(itemData)
      await item.save()

      return response.json(item)
    } catch (error) {
      return response.status(500).json({ message: 'Failed to update item' })
    }
  }

  async destroy ({ auth, params, response }) {
    try {
      const user = await auth.getUser()
      const item = await Item.query()
        .where('id', params.id)
        .whereHas('list', (builder) => {
          builder.where('user_id', user.id)
        })
        .first()

      if (!item) {
        return response.status(404).json({ message: 'Item not found' })
      }

      await item.delete()

      return response.status(204).json({ message: 'Item deleted' })
    } catch (error) {
      return response.status(500).json({ message: 'Failed to delete item' })
    }
  }
}

module.exports = ItemController
