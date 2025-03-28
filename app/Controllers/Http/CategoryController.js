"use strict";

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Retorna todas as categorias
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Uma lista de categorias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                     description: O identificador   nico da categoria
 *                   nome:
 *                     type: string
 *                     description: O nome da categoria
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     description: Data e hora em que a categoria foi criada
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *                     description: Data e hora em que a categoria foi atualizada
 *   post:
 *     summary: Cria uma nova categoria
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: O nome da categoria
 *     responses:
 *       200:
 *         description: Categoria criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Bad request
 *
 * /categories/{id}:
 *   get:
 *     summary: Retorna uma categoria
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
 *         description: Uma categoria
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Categoria n  o encontrada
 *
 *   put:
 *     summary: Atualiza uma categoria
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
 *               nome:
 *                 type: string
 *                 description: O nome da categoria
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Categoria n  o encontrada
 *
 *   delete:
 *     summary: Deleta uma categoria
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
 *         description: Categoria deletada com sucesso
 *       404:
 *         description: Categoria n  o encontrada
 *
 * /categories/{id}:
 *   get:
 *     summary: Retorna uma categoria
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
 *         description: Uma categoria
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Categoria n  o encontrada
 */

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
