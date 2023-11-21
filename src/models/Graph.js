class Graph {
  constructor () {
    this.nodes = []
    this.aristas = []
  }

  updateNode (node) {
    const index = this.getIndexNode(node)
    this.nodes[index] = node
  }

  getNodes () {
    return this.nodes
  }

  getAristas () {
    return this.aristas
  }

  addNode (node) {
    this.nodes.push(node)
  }

  addArista (arista) {
    this.aristas.push(arista)
  }

  addListNodes (listNodes) {
    listNodes.forEach(node => {
      this.addNode(node)
    })
  }

  addListAristas (listAristas) {
    listAristas.forEach(arista => {
      this.addArista(arista)
    })
  }

  isEmpty () {
    return this.nodes.length === 0
  }

  getIndexNode (node) {
    return this.nodes.indexOf(node)
  }

  getNobeByIndex (index) {
    return this.nodes[index]
  }

  getNodeByName (name) {
    return this.nodes.find(node => node.name === name)
  }

  removeNode (name) {
    const index = this.getIndexNode(this.getNodeByName(name))
    this.nodes.splice(index, 1)
  }
}

export { Graph }
