class Task {
  constructor (description, priority, date, category) {
    this.description = description
    this.priority = priority
    this.date = date
    this.category = category
    this.completed = false
  }
}

export { Task }
