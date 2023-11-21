import React, { useRef, useEffect, useContext } from 'react'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import { Project } from '../models/Project'
import { Graph } from '../models/Graph'
import { ProjectsContext } from '../context/projectsContext'

function CreateProjectForm ({ handleClose }) {
  const { projects, setProjects } = useContext(ProjectsContext)

  const formRef = useRef()

  const createProject = (projectInfo) => {
    const newProject = new Project(projectInfo)

    const updatedProjects = new Graph()
    updatedProjects.addNode(newProject)

    if (!projects.isEmpty()) {
      updatedProjects.addListNodes(projects.getNodes())
    }

    console.log('updated', updatedProjects)
    return updatedProjects
  }

  const handleSave = (e) => {
    e.preventDefault()
    const formData = new FormData(formRef.current)

    const projectName = formData.get('project')
    const createdProjects = createProject(projectName)

    console.log('created projects', createdProjects)
    setProjects(createdProjects)

    handleClose()
  }

  useEffect(() => {
    console.log('projects', projects)
  }, [projects])

  return (
    <>

      <Form ref={formRef} onSubmit={handleSave}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" placeholder="Mi nuevo proyecto" name="project" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </>
  )
}

export default CreateProjectForm
