'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

// User registration
Route.post('/api/v1/users', 'UserController.store')

// User login
Route.post('/api/v1/auth/login', 'AuthController.login')

// Authenticated routes
Route.group(() => {
  // Get the current authenticated user
  Route.get('auth/user', 'AuthController.getUser')

  // Route.get('users', 'UserController.index')
  // Route.get('users/:id', 'UserController.show')
  // Route.post('users', 'UserController.store')
  // Route.put('users/:id', 'UserController.update')
  // Route.delete('users/:id', 'UserController.destroy')

  // Lists and items routes
  Route.resource('lists', 'ListController').apiOnly()
  Route.resource('lists.items', 'ItemController').apiOnly()
}).prefix('api/v1').middleware(['auth'])

module.exports = Route
