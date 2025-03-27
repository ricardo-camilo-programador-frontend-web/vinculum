"use strict";

const { use } = require("@adonisjs/fold");
const Category = use("App/Models/Category");

class CategoryController {
  async index() {
    return await Category.all();
  }

  async store({ request }) {
    const categoryData = request.only(["nome"]);
    const newCategory = await Category.create(categoryData);
    return newCategory;
  }

  async update({ params, request }) {
    const category = await Category.findOrFail(params.id);
    const categoryData = request.only(["nome"]);
    category.merge(categoryData);
    await category.save();
    return category;
  }

  async destroy({ params }) {
    const category = await Category.findOrFail(params.id);
    await category.delete();
  }
}

module.exports = CategoryController;
