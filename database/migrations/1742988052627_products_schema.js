'use strict'

const Schema = use('Schema')

class ProductsSchema extends Schema {
  up() {
    this.create('products', (table) => {
      table.uuid('id').primary()
      table.string('name').notNullable()
      table.text('description')
      table.decimal('price', 8, 2).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('products')
  }
}

module.exports = ProductsSchema
