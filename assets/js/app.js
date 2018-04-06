const app = Stimulus.Application.start()

app.register('add-post', AddPost)
app.register('list-item', ListItem)

document.addEventListener('turbolinks:load', evt => {
  feather.replace()
})
