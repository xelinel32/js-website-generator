import { Point } from './point'
import { Sidebar } from './classSidebar'

export class App {
  constructor(model) {
    this.model = model
  }

  init() {
    // $ - dom element
    const main = new Point('main')

    main.$render(this.model)

    new Sidebar('panel', (newBlock) => {
      this.model.push(newBlock)
      main.$render(this.model)
    })
  }
}
