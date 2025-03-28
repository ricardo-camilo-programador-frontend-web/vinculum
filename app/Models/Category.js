"use strict"

const Model = use("Model")
const { v4: uuidv4 } = require("uuid")

class Category extends Model {
	static boot() {
		super.boot()
		this.addHook("beforeCreate", async category => {
			category.id = uuidv4()
		})
	}

	static get table() {
		return "categories"
	}

	static get primaryKey() {
		return "id"
	}

	static get incrementing() {
		return false
	}

	products() {
		return this.belongsToMany("App/Models/Product", "category_id", "product_id", "id", "id").pivotTable("product_category")
	}
}

module.exports = Category
