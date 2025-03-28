'use strict'

class Category {
	get validateAll() {
		return true
	}

	get rules() {
		return {
			name: 'required|string|unique:categories',
			description: 'string'
		}
	}
}

module.exports = Category
