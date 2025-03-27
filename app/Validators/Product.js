'use strict'

class Product {
	get validateAll() {
		return true // Valida todos os campos
	}

	get rules() {
		return {
			nome: 'required|string',
			descricao: 'string'
		}
	}
}

module.exports = Product
