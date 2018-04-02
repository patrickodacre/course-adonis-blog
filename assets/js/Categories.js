class Categories extends Stimulus.Controller {
  static get targets() {}
  initialize() {}

  deleteCategory(evt) {
    evt.preventDefault()
    const catId = evt.currentTarget.getAttribute('data-category-id')

    return axios
      .delete('http://localhost:3333/categories/' + catId)
      .then(resp => {
        location.reload()
      })
  }
}
