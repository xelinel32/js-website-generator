import { block } from '../utils/utils'
import { TextBlock, TitleBlock } from './classModels'

export class Sidebar {
  constructor(selector, updCallback) {
    this.$el = document.getElementById('panel')
    this.update = updCallback
    this.initSidebar()
  }

  initSidebar() {
    this.$el.insertAdjacentHTML('afterbegin', this.template)
    this.$el.addEventListener('submit', this.addBlock.bind(this))
  }
  addBlock(e) {
    e.preventDefault()
    const type = e.target.name
    const value = e.target.value.value
    const styles = e.target.styles.value

    let newBlock =
      type === 'text'
        ? new TextBlock(value, { styles })
        : new TitleBlock(value, { styles })
    this.update(newBlock)
    e.target.styles.value = ''
    e.target.value.value = ''
  }
  // getter
  get template() {
    return [block('text'), block('title')].join('')
  }
}
