const Schema = use('Schema')

class AddFieldsToItemsSchema extends Schema {
  up () {
    this.table('items', (table) => {
      // Add new columns to the items table
      table.integer('quantity').nullable()
      table.string('unit').nullable()
      table.float('value').nullable()
    })
  }

  down () {
    this.table('items', (table) => {
      // Drop the columns if we roll back the migration
      table.dropColumn('quantity')
      table.dropColumn('unit')
      table.dropColumn('value')
    })
  }
}

module.exports = AddFieldsToItemsSchema
