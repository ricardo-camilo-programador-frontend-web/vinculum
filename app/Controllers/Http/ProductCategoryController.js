"use strict";

/**
 * @swagger
 * /products/{id}/categories:
 *   post:
 *     summary: Add categories to a product
 *     tags: [Product Categories]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 *     responses:
 *       200:
 *         description: Categories added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       400:
 *         description: Bad request
 *
 *   delete:
 *     summary: Remove categories from a product
 *     tags: [Product Categories]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 *     responses:
 *       200:
 *         description: Categories removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       400:
 *         description: Bad request
 *
 *   get:
 *     summary: Returns the categories of a product
 *     tags: [Product Categories]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Product categories
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       400:
 *         description: Bad request
 */

const Product = use("App/Models/Product")

class ProductCategoryController {
    async _findProduct(productId) {
        return await Product.findOrFail(productId)
    }

    async store({ params, request }) {
        const product = await this._findProduct(params.id)
        const categoryIds = request.input("category_ids")
        await product.categories().attach(categoryIds)
        return product
    }

    async destroy({ params, request }) {
        const product = await this._findProduct(params.id)
        const categoryIds = request.input("category_ids")
        await product.categories().detach(categoryIds)
        return product
    }

    async show({ params }) {
        const product = await this._findProduct(params.id)
        await product.load("categories")
        return product
    }
}

module.exports = ProductCategoryController