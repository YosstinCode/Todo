import { PRIORITY } from '../enums/priority'
import { Queue } from './Queue'
import { Stack } from './Stack'

class Project {
  constructor (name, Tasks = new Queue()) {
    this.Tasks = Tasks.items
    this.priorityTasks = new Stack()
    this.dueSoonTasks = new Stack()
    this.name = name
    this.countTasks = Tasks.length
  }

  addTask (task) {
    const today = new Date()
    const date = new Date(task.date)
    const diffTime = Math.abs(date - today)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (task.priority === PRIORITY.HIGH) this.priorityTasks.push(task)

    if (diffDays <= 3) this.dueSoonTasks.push(task)

    this.Tasks.push(task)
  }

  getTask (index) {
    return this.Tasks[index]
  }

  deleteTask (index) {
    this.Tasks.splice(index, 1)
  }

  updateTask (index, task) {
    this.Tasks[index] = task
  }

  isEmpty () {
    return this.Tasks.length === 0
  }

  getIndexTask (task) {
    return this.Tasks.indexOf(task)
  }

  getTaksByDescription (description) {
    return this.Tasks.find(task => task.description === description)
  }

  getTasks () {
    return this.Tasks
  }

  getPriorityTasks () {
    return this.priorityTasks.items
  }

  getDueSoonTasks () {
    return this.dueSoonTasks.items
  }

  removeTask (description) {
    const index = this.getIndexTask(this.getTaksByDescription(description))
    this.Tasks.splice(index, 1)
  }
}

export { Project }
