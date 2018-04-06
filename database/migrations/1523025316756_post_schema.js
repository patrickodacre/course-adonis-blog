'use strict'

const Schema = use('Schema')

class PostSchema extends Schema {
  up() {
    this.create('posts', table => {
      table.increments()
      table.timestamps()
      table.string('title').notNullable()
      table.string('post_slug').notNullable()
      table.string('slug').notNullable() // for slugify only
      table.string('seo_title')
      table.string('seo_description')
      table.string('seo_keywords')
      table.text('body')
      table.string('summary')
      table.text('markdown')
      table
        .integer('category_id')
        .unsigned()
        .nullable()
      table
        .foreign('category_id')
        .references('categories.id')
        .onDelete('SET NULL')
      table.boolean('published').defaultTo(false)
      table
        .integer('user_id')
        .unsigned()
        .nullable()
      table
        .foreign('user_id')
        .references('users.id')
        .onDelete('SET NULL')
    })
  }

  down() {
    this.drop('posts')
  }
}

module.exports = PostSchema
