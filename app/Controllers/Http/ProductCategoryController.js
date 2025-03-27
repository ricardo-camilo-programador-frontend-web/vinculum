"use strict";

/**
 * @swagger
 * /products/{id}/categories:
 *   post:
 *     summary: Adiciona categorias a um produto
 *     tags: [ProductCategories]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
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
 *                   type: integer
 *     responses:
 *       200:
 *         description: Categorias adicionadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */

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
