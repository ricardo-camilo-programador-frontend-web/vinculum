'use strict'

const Product = use('App/Models/Product')

class ProductController {
  async index({ request }) {
    const pageNumber = request.input('page', 1)
    const productsPerPage = 10
    return await Product.query().paginate(pageNumber, productsPerPage)
  }

  async store({ request, response }) {
    const { validateAll } = use('Validator')
    const validation = await validateAll(request.all(), new Product().rules)
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
    const { validateAll } = use('Validator')
    const validation = await validateAll(request.all(), new Product().rules)
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
