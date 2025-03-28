'use strict'

const Schema = use('Schema')

class ProductCategorySchema extends Schema {
  up() {
    this.create('product_category', (table) => {
      table.increments('id').primary()
      table.uuid('product_id').references('id').inTable('products').onDelete('CASCADE')
      table.uuid('category_id').references('id').inTable('categories').onDelete('CASCADE')
      table.unique(['product_id', 'category_id'])
    })
  }


  down() {
    this.drop('product_category')
  }
}

module.exports = ProductCategorySchema
