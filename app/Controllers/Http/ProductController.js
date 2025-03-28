'use strict'

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: O nome do produto
 *               descricao:
 *                 type: string
 *                 description: A descri o do produto
 *     responses:
 *       200:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 * /products/{id}:
 *   get:
 *     summary: Retorna um produto
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Um produto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produto n  o encontrado
 *
 *   put:
 *     summary: Atualiza um produto
 *     tags: [Products]
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
 *               nome:
 *                 type: string
 *                 description: O nome do produto
 *               descricao:
 *                 type: string
 *                 description: A descrição do produto
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produto não encontrado
 *       400:
 *         description: Bad request
 *
 *   delete:
 *     summary: Deleta um produto
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Produto deletado com sucesso
 *       404:
 *         description: Produto não encontrado
 *
 */

const Product = use('App/Models/Product')

class ProductController {
  async index({ request }) {
    const pageNumber = request.input('page', 1)
    const productsPerPage = 10
    return await Product.query().paginate(pageNumber, productsPerPage)
  }

  async store({ request, response }) {
    const Validator = use('Validator')
    const validation = await Validator.validate(request.all(), new Product().rules)
    if (validation.fails()) {
      return response.status(400).send(validation.messages())
    }

    const productData = request.only(['nome', 'descricao'])
    const newProduct = await Product.create(productData)
    return newProduct
  }

  async show({ params }) {
    const product = await Product.findOrFail(params.id)
    await product.load('categories')
    return product
  }

  async update({ params, request, response }) {
    const Validator = use('Validator')
    const validation = await Validator.validate(request.all(), new Product().rules)
    if (validation.fails()) {
      return response.status(400).send(validation.messages())
    }

    const product = await Product.findOrFail(params.id)
    const productData = request.only(['nome', 'descricao'])
    product.merge(productData)
    await product.save()
    return product
  }

  async destroy({ params }) {
    const product = await Product.findOrFail(params.id)
    await product.delete()
  }
}

module.exports = ProductController
