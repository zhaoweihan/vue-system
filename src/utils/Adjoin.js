export class Adjoin {
  constructor (vertex) {
    this.vertex = vertex
    this.quantity = vertex.length
    this.init()
  }

  init () {
    this.adjoinArray = Array.from({ length: this.quantity * this.quantity })
  }

  getVertexRow (id) {
    const index = this.vertex.indexOf(id)
    const col = []
    this.vertex.forEach((item, pIndex) => {
      col.push(this.adjoinArray[index + this.quantity * pIndex])
    })
    return col
  }

  getAdjoinVertexs (id) {
    return this.getVertexRow(id).map((item, index) => (item ? this.vertex[index] : '')).filter(Boolean)
  }

  setAdjoinVertexs (id, sides) {
    const pIndex = this.vertex.indexOf(id)
    sides.forEach((item) => {
      const index = this.vertex.indexOf(item)
      this.adjoinArray[pIndex * this.quantity + index] = 1
    })
  }
}
