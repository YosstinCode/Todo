import React, { useContext, useRef } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { PRIORITY } from '../enums/priority'
import { Task } from '../models/Tasks'
import { ProjectsContext } from '../context/projectsContext'
import { Graph } from '../models/Graph'

const TaskForm = ({ name, handleClose }) => {
  const { projects, setProjects } = useContext(ProjectsContext)

  const formRef = useRef()

  const CreateTask = (taskInfo) => {
    const newTask = new Task(taskInfo.description, taskInfo.priority, taskInfo.date, taskInfo.category)
    const newProject = new Graph()
    newProject.addListNodes(projects.getNodes())
    const project = newProject.getNodeByName(name)

    if (project) {
      project.addTask(newTask)
    }

    newProject.updateNode(project)

    setProjects(newProject)
  }

  const handleSave = (e) => {
    e.preventDefault()

    const formData = new FormData(formRef.current)

    const task = {
      description: formData.get('task'),
      priority: formData.get('priority'),
      date: formData.get('date'),
      category: formData.get('category')
    }

    CreateTask(task)

    handleClose('create')
  }

  return (
    <Form ref={formRef} onSubmit={handleSave}>
    <Modal.Body>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Description:</Form.Label>
        <Form.Control type="text" placeholder="Mi nueva tarea" name="task" required />
        <Form.Label>Priority:</Form.Label>
        <Form.Select aria-label="Default select example" name='priority' required>
          <option>Open this select menu</option>
          {
            Object.values(PRIORITY).map((priority, index) => (
              <option key={index} value={priority}>{priority}</option>
            ))
          }
        </Form.Select>
        <Form.Label>Date:</Form.Label>
        <Form.Control type="date" name="date" required />
        <Form.Label>Category:</Form.Label>
        <Form.Control type="text" placeholder="Ventas" name="category" required/>
      </Form.Group>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => handleClose('create')}>
        Close
      </Button>
      <Button type="submit" variant="primary">
        Save
      </Button>
    </Modal.Footer>
  </Form>
  )
}

export default TaskForm
