"use strict";

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 * /categories:
 *   get:
 *     summary: Returns all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *   post:
 *     summary: Creates a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Bad request
 *
 * /categories/{id}:
 *   get:
 *     summary: Returns a category
 *     tags: [Categories]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: A category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 *   put:
 *     summary: Updates a category
 *     tags: [Categories]
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
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 *   delete:
 *     summary: Deletes a category
 *     tags: [Categories]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */

const Category = use("App/Models/Category")

class CategoryController {
  async index() {
    const categories = await Category.all()
    return categories
  }

  async store({ request }) {
    const { name, description } = request.only(["name", "description"])
    const newCategory = await Category.create({ name, description })
    return newCategory
  }

  async show({ params }) {
    const foundCategory = await Category.findOrFail(params.id)
    await foundCategory.load("products")
    return foundCategory
  }

  async update({ params, request }) {
    const foundCategory = await Category.findOrFail(params.id)
    const { name, description } = request.only(["name", "description"])
    foundCategory.merge({ name, description })
    await foundCategory.save()
    return foundCategory
  }

  async destroy({ params }) {
    const foundCategory = await Category.findOrFail(params.id)
    await foundCategory.delete()
    return { message: "Category deleted" }
  }
}

module.exports = CategoryController
