import { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import CreateProjectForm from './CreateProjectForm'
import { ProjectsContext } from '../context/projectsContext'
import { Card } from 'react-bootstrap'
import Project from './Project'

function CreateProject () {
  const { projects } = useContext(ProjectsContext)
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Card className='d-flex flex-column p-4 m-4 gap-4'>
        <Card.Title className='text-center fs-2'>Projects</Card.Title>
        {projects.getNodes().map((project, index) => (<Project key={index} name={project.name} />))}

        <Button variant="primary" size='lg' onClick={handleShow}>
          Create Project
        </Button>
      </Card>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Create Project</Modal.Title>
        </Modal.Header>

        <CreateProjectForm handleClose={handleClose}/>

      </Modal>
    </>
  )
}

export default CreateProject
