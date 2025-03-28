'use strict'

const Model = use("Model")
const { v4: uuidv4 } = require("uuid")

class Product extends Model {
	static boot() {
		super.boot()
		this.addHook("beforeCreate", async product => {
			product.id = uuidv4()
		})
	}

	static get table() {
		return "products"
	}

	static get primaryKey() {
		return "id"
	}

	static get incrementing() {
		return false
	}

	get rules() {
		return {
			name: "required|string",
			description: "string"
		}
	}

	categories() {
		return this.belongsToMany("App/Models/Category", "product_id", "category_id", "id", "id").pivotTable("product_category")
	}
}

module.exports = Product
