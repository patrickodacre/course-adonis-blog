class ListItem extends Stimulus.Controller {
  static get targets() {}
  initialize() {
    console.log('initialized', this.element)
  }

  destroyItem(evt) {
    evt.preventDefault()
    console.log('clicked ', this.categoryID)

    return axios
      .delete('http://localhost:3333/categories/' + this.categoryID)
      .then(resp => {
        location.reload()
      })
  }

  get categoryID() {
    return this.data.get('id')
  }
}
