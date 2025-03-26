'use strict'

const Schema = use('Schema')

class ProductsSchema extends Schema {
  up() {
    this.create('products', (table) => {
      table.uuid('id').primary()
      table.string('nome').notNullable()
      table.text('descricao')
      table.timestamps()
    })
  }

  down() {
    this.drop('products')
  }
}

module.exports = ProductsSchema
