'use strict'

class Product {
	get validateAll() {
		return true
	}

	get rules() {
		return {
			name: 'required|string',
			description: 'string',
			price: 'required|number'
		}
	}
}

module.exports = Product
