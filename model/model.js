import img1 from '../assets/image1.png'
import { TitleBlock, TextBlock, ColumnsBlock, ImageBlock } from './classModels'

const title = new TitleBlock('Генератор для сайта на JS', {
  tag: 'h2',
  styles: {
    background: '#ccc',
    color: '#fff',
    'text-align': 'center',
    'font-family': 'Consolas',
    display: 'block',
  },
})
const text = new TextBlock('Подзаголовок для конструктора', {
  tag: 'p',
  styles: {
    background: '#fff',
    color: 'red',
    'text-align': 'left',
    'margin-left': 'auto',
    padding: '1rem',
    display: 'block',
  },
})
const columns = new ColumnsBlock(
  [
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum?',
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum?',
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum?',
  ],
  {
    styles: {
      background: '#000',
      color: 'green',
      padding: '2rem',
    },
  }
)
const img = new ImageBlock(img1, {
  styles: {
    'max-width': '500px',
    margin: '20px auto 0',
    height: 'auto',
  },
})
export default [title, text, columns, img]
