const app = Stimulus.Application.start()

app.register('categories', Categories)

document.addEventListener('turbolinks:load', evt => {
  feather.replace()
})
