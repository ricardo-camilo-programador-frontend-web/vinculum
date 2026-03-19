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

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         username:
 *           type: string
 *           example: johndoe
 *         email:
 *           type: string
 *           format: email
 *           example: john@example.com
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 */

// Authentication Routes (Public)
Route.group(() => {
  Route.post('/register', 'AuthController.register')
  Route.post('/login', 'AuthController.login')
  Route.post('/refresh', 'AuthController.refresh')
}).prefix('/auth')

// Authentication Routes (Protected)
Route.group(() => {
  Route.post('/logout', 'AuthController.logout')
  Route.get('/me', 'AuthController.me')
  Route.put('/password', 'AuthController.changePassword')
}).prefix('/auth').middleware(['auth:jwt'])

// Products (Protected)
Route.group(() => {
  Route.get('/', 'ProductController.index')
  Route.post('/', 'ProductController.store')
  Route.get('/:id', 'ProductController.show')
  Route.put('/:id', 'ProductController.update')
  Route.delete('/:id', 'ProductController.destroy')
}).prefix('/products').middleware(['auth:jwt'])

// Categories (Protected)
Route.group(() => {
  Route.get('/', 'CategoryController.index')
  Route.post('/', 'CategoryController.store')
  Route.get('/:id', 'CategoryController.show')
  Route.put('/:id', 'CategoryController.update')
  Route.delete('/:id', 'CategoryController.destroy')
}).prefix('/categories').middleware(['auth:jwt'])

// Product-Category Relationship (Protected)
Route.group(() => {
  Route.post('/:id/categories', 'ProductCategoryController.store')
  Route.delete('/:id/categories', 'ProductCategoryController.destroy')
}).prefix('/products').middleware(['auth:jwt'])
