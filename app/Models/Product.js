'use strict'

const Model = use('Model')
const uuid = require('uuid/v4')

class Product extends Model {
	static boot() {
		super.boot()
		this.addHook('beforeCreate', async (product) => {
			product.id = uuid()
		})
	}

	static get table() {
		return 'products'
	}

	static get primaryKey() {
		return 'id'
	}

	static get incrementing() {
		return false
	}

	categories() {
		return this.belongsToMany('App/Models/Category')
			.pivotTable('produto_categoria')
	}
}

module.exports = Product
