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
    response.header('Turbolinks-Location', '/categories/add')

    return view.render('categories.category-editor')
  }

  async store({ request, response }) {
    const { name, description, cat_slug } = request.post()

    const category = await Category.create({ name, description, cat_slug })

    return response.redirect('/categories')
  }

  async show({ view, response, params: { slug } }) {
    const category = await this.findCategory(slug).then(data => data.toJSON())
    response.header('Turbolinks-Location', '/categories/' + category.slug)

    return view.render('categories.category', {
      category
    })
  }

  async edit({ view, response, params: { slug } }) {
    const category = await this.findCategory(slug).then(data => data.toJSON())
    response.header('Turbolinks-Location', '/categories/edit/' + category.slug)

    return view.render('categories.category-editor', {
      category
    })
  }

  async update({ request, response, params: { slug } }) {
    const category = await this.findCategory(slug)

    const { name, description, cat_slug } = request.post()

    category.name = name || category.name
    category.description = description || category.description
    category.cat_slug = cat_slug || category.cat_slug

    await category.save()

    return response.redirect('/categories')
  }

  async destroy({ params: { slug }, response }) {
    const category = await this.findCategory(slug)

    await category.delete()

    return response.redirect('/categories')
  }

  async findCategory(slug) {
    const query = Category.query()

    if (Number.isInteger(parseInt(slug, 10))) {
      query.where('id', slug)
    } else {
      query.where('slug', slug)
    }

    return await query.first()
  }
}

module.exports = CategoryController
