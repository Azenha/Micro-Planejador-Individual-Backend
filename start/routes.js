'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
'use strict'

const Route = use('Route')

Route.on('/').render('welcome')

Route.post('/api/v1/users', 'UserController.store')
Route.post('/api/v1/auth/login', 'AuthController.login')

Route.group(() => {
  // Route.get('users', 'UserController.index')
  // Route.get('users/:id', 'UserController.show')
  // Route.post('users', 'UserController.store')
  // Route.put('users/:id', 'UserController.update')
  // Route.delete('users/:id', 'UserController.destroy')
  Route.resource('lists', 'ListController').apiOnly().middleware('auth')
  Route.resource('lists.items', 'ItemController').apiOnly().middleware('auth')
}).prefix('api/v1') // Optional: prefix your routes

module.exports = Route
