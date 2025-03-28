'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const swaggerSpec = require('../config/swagger')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.get('/docs.json', ({ response }) => {
  response.send(swaggerSpec)
})

Route.get('/docs', ({ response }) => {
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
            url: '/docs.json',
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
Route.get('/categories/:id', 'CategoryController.show')
Route.put('/categories/:id', 'CategoryController.update')
Route.delete('/categories/:id', 'CategoryController.destroy')

// Relacionamento produto-Categorie
Route.post('/products/:id/categories', 'ProductCategoryController.store')
Route.delete('/products/:id/categories', 'ProductCategoryController.destroy')
