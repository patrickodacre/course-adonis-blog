'use strict'

const Category = use('App/Models/Category')

class CategoryController {
  async index({ view, response }) {
    const categories = await Category.all().then(data => data.toJSON())

    response.header('Turbolinks-Location', '/categories')

    return view.render('categories.categories', {
      categories
    })
  }

  async create({ view, response }) {
    response.header('Turbolinks-Location', '/categories')

    return view.render('categories.editor')
  }

  async store({ request, response }) {
    const { name, description, cat_slug } = request.post()

    const category = await Category.create({ name, description, cat_slug })

    return response.redirect('/categories')
  }

  async show({ view, params: { slug }, response }) {
    const category = await Category.findBy('slug', slug).then(data =>
      data.toJSON()
    )

    response.header('Turbolinks-Location', '/categories/' + category.slug)

    return view.render('categories.category', {
      category
    })
  }

  async edit({ view, params: { id }, response }) {
    const category = await Category.find(id).then(data => data.toJSON())

    response.header('Turbolinks-Location', '/categories/edit/' + id)

    return view.render('categories.editor', {
      category
    })
  }

  async update({ request, response, params: { id } }) {
    const category = await Category.find(id)

    const { name, description } = request.post()

    category.name = name || category.name
    category.description = description || null

    const saved = await category.save()

    if (saved) {
      return response.redirect('/categories')
    }
  }

  async destroy({ params: { id }, response }) {
    const category = await Category.find(id)

    await category.delete()

    return response.status(200).json({
      deleted: true
    })
  }
}

module.exports = CategoryController
