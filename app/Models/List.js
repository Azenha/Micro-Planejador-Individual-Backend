'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class List extends Model {
    items () {
      return this.hasMany('App/Models/Item')
    }
  
    user () {
      return this.belongsTo('App/Models/User')
    }
  }

module.exports = List
