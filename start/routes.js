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
const swaggerSpec = require('../config/swagger')

// Pagina inicial
Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

// Documentação Swagger
Route.get('/api-docs.json', ({ response }) => {
  response.send(swaggerSpec)
})

Route.get('/api-docs', ({ response }) => {
  response.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui.css">
    </head>
    <body>
      <div id="swagger-ui"></div>
      <script src="https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui-bundle.js"></script>
      <script>
        window.onload = () => {
          SwaggerUIBundle({
            url: '/api-docs.json',
            dom_id: '#swagger-ui'
          })
        }
      </script>
    </body>
    </html>
  `)
})

// Products
Route.get('/products', 'ProductController.index')
Route.post('/products', 'ProductController.store')
Route.get('/products/:id', 'ProductController.show')
Route.put('/products/:id', 'ProductController.update')
Route.delete('/products/:id', 'ProductController.destroy')

// Categories
Route.get('/categories', 'CategoryController.index')
Route.post('/categories', 'CategoryController.store')
Route.put('/categories/:id', 'CategoryController.update')
Route.delete('/categories/:id', 'CategoryController.destroy')

// Relacionamento Produto-Categoria
Route.post('/products/:id/categories', 'ProductCategoryController.store')
Route.delete('/products/:id/categories', 'ProductCategoryController.destroy')
