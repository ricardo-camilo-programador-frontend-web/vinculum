'use strict'

const Schema = use('Schema')

class CategoriesSchema extends Schema {
  up() {
    this.create('categories', (table) => {
      table.uuid('id').primary()
      table.string('name').notNullable().unique()
      table.text('description')
      table.timestamps()
    })
  }

  down() {
    this.drop('categories')
  }
}

module.exports = CategoriesSchema
