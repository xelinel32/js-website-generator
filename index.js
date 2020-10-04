import './style/style.scss'
import model from './model/model'
import { Point } from './model/point'
import { Sidebar } from './model/classSidebar'

// $ - dom element
const main = new Point('main')

main.$render(model)

new Sidebar('panel', (newBlock) => {
  model.push(newBlock)
  main.$render(model)
})
