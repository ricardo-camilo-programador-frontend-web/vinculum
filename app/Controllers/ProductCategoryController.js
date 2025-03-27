"use strict";

const Product = use("App/Models/Product");

class ProductCategoryController {
    async store({ params, request }) {
        const product = await Product.findOrFail(params.id)
        const categoryIds = request.input('category_ids')
        await product.categories().attach(categoryIds)
        return product
    }

    async destroy({ params, request }) {
        const product = await Product.findOrFail(params.id)
        const categoryIds = request.input('category_ids')
        await product.categories().detach(categoryIds)
        return product
    }
}

module.exports = ProductCategoryController
