class AddPost extends Stimulus.Controller {
  static get targets() {
    return [
      'markdown',
      'mdpreview', // hide while editing
      'mdeditor' // hide while previewing
    ]
  }
  initialize() {
    console.log('init add post controller')

    this.markdownTarget.value = `---\ntitle: \nseo_title: \npublished: false\nseo_description: \npost_slug: \nsummary: \n---\n\nThe Title is above...\n\nFront matter above, and write your post here...`

    this.markdownUpdated = true
  }

  edit() {
    console.log('editing')
    this.mdeditorTarget.setAttribute('style', '')
    this.mdpreviewTarget.setAttribute('style', 'display: none;')
  }

  preview() {
    console.log('previewing')

    if (!this.markdownUpdated) {
      this.mdeditorTarget.setAttribute('style', 'display: none;')
      this.mdpreviewTarget.setAttribute('style', '')
      return
    }

    return axios
      .post(
        'http://localhost:3333/posts/preview',
        {
          markdown: this.markdownTarget.value
        },
        {
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': document
              .querySelector('input[name="_csrf"]')
              .getAttribute('value')
          }
        }
      )
      .then(data => {
        this.mdpreviewTarget.innerHTML = data.data.data
        this.markdownUpdated = false
        this.mdeditorTarget.setAttribute('style', 'display: none;')
        this.mdpreviewTarget.setAttribute('style', '')
      })
  }
}
