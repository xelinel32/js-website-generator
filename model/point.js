export class Point {
  constructor(selector) {
    this.$el = document.getElementById(selector)
  }
  $render(model) {
    this.$el.innerHTML = ''
    model.forEach((element) => {
      this.$el.insertAdjacentHTML('beforeend', element.toHTML())
    })
  }
}
