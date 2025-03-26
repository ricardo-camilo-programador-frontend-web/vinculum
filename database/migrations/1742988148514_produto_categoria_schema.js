'use strict'

const Schema = use('Schema')

class ProdutoCategoriaSchema extends Schema {
  up() {
    this.create('produto_categoria', (table) => {
      table.uuid('produto_id').references('id').inTable('products').onDelete('CASCADE')
      table.uuid('categoria_id').references('id').inTable('categories').onDelete('CASCADE')
      table.primary(['produto_id', 'categoria_id'])
    })
  }

  down() {
    this.drop('produto_categoria')
  }
}

module.exports = ProdutoCategoriaSchema
