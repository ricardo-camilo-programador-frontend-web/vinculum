'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Pagina inicial
Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

// Produtos
Route.get('/produtos', 'ProductController.index')
Route.post('/produtos', 'ProductController.store')
Route.get('/produtos/:id', 'ProductController.show')
Route.put('/produtos/:id', 'ProductController.update')
Route.delete('/produtos/:id', 'ProductController.destroy')

// Categorias
Route.get('/categorias', 'CategoryController.index')
Route.post('/categorias', 'CategoryController.store')
Route.put('/categorias/:id', 'CategoryController.update')
Route.delete('/categorias/:id', 'CategoryController.destroy')

// Relacionamento Produto-Categoria
Route.post('/produtos/:id/categorias', 'ProductCategoryController.store')
Route.delete('/produtos/:id/categorias', 'ProductCategoryController.destroy')
