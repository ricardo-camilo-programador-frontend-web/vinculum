'use strict'

class Category {
	get validateAll() {
		return true
	}

	get rules() {
		return {
			nome: 'required|string|unique:categories'
		}
	}
}

module.exports = Category
