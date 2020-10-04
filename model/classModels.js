import { row, col, css } from '../utils/utils'

export class Block {
  constructor(value, options) {
    ;(this.value = value), (this.options = options)
  }
  toHTML() {
    throw new Error('Method toHTML should be implemented')
  }
}

export class TitleBlock extends Block {
  constructor(value, options) {
    super(value, options)
  }
  toHTML() {
    const { tag = 'h1', styles } = this.options
    return row(col(`<${tag}>${this.value}</${tag}>`), css(styles))
  }
}

export class TextBlock extends Block {
  constructor(value, options) {
    super(value, options)
  }
  toHTML() {
    const { tag = 'p', styles } = this.options
    return row(col(`<${tag}>${this.value}</${tag}>`), css(styles))
  }
}

export class ColumnsBlock extends Block {
  constructor(value, options) {
    super(value, options)
  }
  toHTML() {
    const { styles } = this.options
    let html = this.value.map((item) => col(item))
    return row(html.join(''), css(styles))
  }
}

export class ImageBlock extends Block {
  constructor(value, options) {
    super(value, options)
  }
  toHTML() {
    const { styles } = this.options
    return row(
      `<img style="${css(styles)}" src="${this.value}" alt="${this.type}" />`
    )
  }
}
