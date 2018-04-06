'use strict'

const Category = use('App/Models/Category')

class PostController {
  async index() {}

  async create({ view, response }) {
    response.header('Turbolinks-Location', '/posts/add')

    const categories = await Category.all()

    return view.render('posts.editor', {
      categories
    })
  }

  async preview({ request, response }) {
    const { markdown } = request.post()

    // transform the markdown to html for the preview

    return response.status(200).json({
      data
    })
  }

  async store() {}

  async show() {}

  async edit() {}

  async update() {}

  async destroy() {}
}

module.exports = PostController
