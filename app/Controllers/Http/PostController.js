'use strict'

const Category = use('App/Models/Category')
const Post = use('App/Models/Post')

class PostController {
  async index({ view, response }) {
    response.header('Turbolinks-Location', '/posts')

    const posts = await Post.all().then(data => data.toJSON())

    return view.render('posts.posts', { posts })
  }

  async create({ view, response }) {
    response.header('Turbolinks-Location', '/posts/add')

    const categories = await Category.all().then(data => data.toJSON())
    const markdown = '---\ntitle: \nseo_title: \npublished: false\nseo_description: \npost_slug: \nsummary: \n---\n\nThe Title is above...\n\nFront matter above, and write your post here...'.trim()

    return view.render('posts.editor', {
      categories,
      markdown
    })
  }

  async preview({ request, response }) {
    const { markdown } = request.post()

    return response.status(200).json({
      data: markdown
    })
  }

  async store() {}

  async show({ params: { slug }, view, response }) {
    const post = await Post.findBy('slug', slug)

    response.header('Turbolinks-Location', '/posts/' + slug)

    return view.render('posts.post', {
      post
    })
  }

  async edit() {}

  async update() {}

  async destroy({ params: { id }, response }) {
    const post = await Post.find(id)

    const deleted = post.delete()

    return response.status(200).json({ deleted })
  }
}

module.exports = PostController
