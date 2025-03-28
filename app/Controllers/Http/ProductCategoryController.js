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
 *         description: Categorias adicionadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produto n  o encontrado
 *       400:
 *         description: Bad request
 *
 *   delete:
 *     summary: Remove categorias de um produto
 *     tags: [ProductCategories]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Categorias removidas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produto n  o encontrado
 *       400:
 *         description: Bad request
 *
 * /products/{id}/categories:
 *   get:
 *     summary: Retorna as categorias de um produto
 *     tags: [ProductCategories]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Categorias do produto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produto n  o encontrado
 *       400:
 *         description: Bad request
 */

const Product = use("App/Models/Product");

class ProductCategoryController {
    async store({ params, request }) { // Adiciona categorias a um produto
        const product = await Product.findOrFail(params.id)
        const categoryIds = request.input('category_ids')
        await product.categories().attach(categoryIds)
        return product
    }

    async destroy({ params, request }) { // Remove categorias de um produto
        const product = await Product.findOrFail(params.id)
        const categoryIds = request.input('category_ids')
        await product.categories().detach(categoryIds)
        return product
    }
}

module.exports = ProductCategoryController
