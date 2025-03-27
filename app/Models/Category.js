'use strict'

const Model = use('Model')
const uuid = require('uuid/v4')

class Category extends Model {
	static boot() {
		super.boot()
		this.addHook('beforeCreate', async (category) => {
			category.id = uuid()
		})
	}

	static get table() {
		return 'categories'
	}

	static get primaryKey() {
		return 'id'
	}

	static get incrementing() {
		return false
	}

	products() {
		return this.belongsToMany('App/Models/Product')
			.pivotTable('produto_categoria')
	}
}

module.exports = Category
