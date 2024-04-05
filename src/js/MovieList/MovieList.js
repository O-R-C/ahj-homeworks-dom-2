import * as styles from './MovieList.module.css'
console.log('🚀 ~ styles:', styles)

export default class MovieList {
  constructor(data) {
    this.data = data
    this.body = document.body
    this.headers = ['id', 'title', 'year', 'imdb']

    this.init()
  }

  init() {
    this.createTable()

    this.showTable()
    this.showTitle()
  }

  createTable() {
    this.table = this.createElement(styles.table)
    this.table.append(this.createHeadersRow())
    this.data.forEach((item) => this.table.append(this.createRow(item)))
  }

  createHeadersData() {
    const headers = this.headers.reduce((acc, item) => {
      return { ...acc, [item]: item }
    }, {})
    return headers
  }

  createHeadersRow() {
    const headersRow = this.createRow(this.createHeadersData())
    headersRow.classList.add(styles.headers)

    return headersRow
  }

  createRow(movie) {
    const row = this.createElement(styles.row)

    Object.keys(movie).forEach((item) => {
      let value = movie[item]
      row.append(this.addCell(item, value))

      return (row.dataset[item] = value)
    })

    return row
  }

  addCell(item, value) {
    if (typeof value === 'number') {
      if (item === 'year') {
        value = this.decorateYear(value)
      }
      if (item === 'imdb') {
        value = this.decorateImdb(value)
      }
    }

    const cell = this.createElement(styles.cell)
    cell.classList.add(styles[item])

    cell.textContent = value

    return cell
  }

  decorateYear(year) {
    return `(${year})`
  }

  decorateImdb(imdb) {
    return imdb.toFixed(2)
  }

  createElement(className, type = 'div') {
    const elem = document.createElement(type)
    elem.classList.add(className)

    return elem
  }

  showTable() {
    this.body.append(this.table)
  }

  showTitle() {
    document.querySelector('.welcome').textContent = 'Movie List'
    document.querySelector('title').textContent = 'Movie List'
  }
}
