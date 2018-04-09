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
Route.get('categories', 'CategoryController.index')
Route.get('categories/add', 'CategoryController.create')
Route.get('categories/:slug', 'CategoryController.show')
Route.get('categories/edit/:id', 'CategoryController.edit')

Route.post('categories', 'CategoryController.store')
Route.put('categories/:id', 'CategoryController.update')
Route.delete('categories/:id', 'CategoryController.destroy')

/* Posts */

Route.get('posts', 'PostController.index')
Route.get('posts/add', 'PostController.create')
Route.get('posts/:slug', 'PostController.show').as('single_post')
Route.post('posts/preview', 'PostController.preview')
Route.post('posts', 'PostController.store')
Route.delete('posts/:id', 'PostController.destroy')
