'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Item extends Model {
    static get table () {
      return 'items'
    }
  
    list () {
      return this.belongsTo('App/Models/List')
    }
  }

module.exports = Item
