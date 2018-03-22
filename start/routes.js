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
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.on('/').render('index')
Route.on('/page').render('page')

/* Categories */
Route.get('/categories', 'CategoryController.index')
Route.get('/categories/add', 'CategoryController.create')
Route.get('/categories/edit/:slug', 'CategoryController.edit')
Route.get('/categories/delete/:slug', 'CategoryController.destroy')
Route.get('/categories/:slug', 'CategoryController.show')

// form handlers
Route.post('/categories', 'CategoryController.store')
Route.put('/categories/:slug', 'CategoryController.update')
