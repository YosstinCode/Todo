import React, { useContext, useRef } from 'react'
import { Button, Form, ListGroup, Modal } from 'react-bootstrap'
import { ProjectsContext } from '../context/projectsContext'
import { Graph } from '../models/Graph'

const ModalContainer = ({ show, title, onClose, children, name }) => {
  // const [filter, setFilter] = useState('')

  const { projects, setProjects, deletedTasks, setDeletedTasks, setFilterTasks } = useContext(ProjectsContext)

  const formRef = useRef()
  const formFilterRef = useRef()

  const clearTasks = (description) => {
    const updatedProjects = new Graph()
    updatedProjects.addListNodes(projects.getNodes())

    const projectName = name
    updatedProjects.getNodeByName(projectName).removeTask(description)

    const updatedDeletedTasks = [...deletedTasks, { projectName, description }]
    setDeletedTasks(updatedDeletedTasks)

    setProjects(updatedProjects)
  }

  const handleSave = (e) => {
    e.preventDefault()

    const dataForm = new FormData(formRef.current)

    dataForm.forEach((value, key) => {
      console.log(key, value)
      if (value) {
        clearTasks(key)
      }
    })

    onClose()
  }

  const filterTasks = (category) => {
    const updatedProjects = new Graph()
    updatedProjects.addListNodes(projects.getNodes())

    const projectName = name
    const tasks = updatedProjects.getNodeByName(projectName).getTasks()

    const updatedFilterTasks = tasks.filter((task) => task.category === category)

    setFilterTasks(updatedFilterTasks)
  }

  const handleFilter = (e) => {
    e.preventDefault()

    const dataForm = new FormData(formFilterRef.current)

    const category = dataForm.get('filter')

    // setFilter(category)

    filterTasks(category)
  }

  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form ref={formFilterRef}>
            <div className='d-flex gap-2'>

            <Form.Select aria-label="Default select example" name='filter'>
              <option>Open the menu to filter tasks</option>
              {
                projects.getNodes().filter((project) => project.name === name).map((project) => {
                  return project.getTasks().map((task, index) => {
                    return <option value={task.category} key={index}>{task.category}</option>
                  })
                })
              }
            </Form.Select>
            <Button variant="outline-info" onClick={handleFilter}>Filter</ Button>
            </div>
          </Form>

          <ListGroup className='mt-4'>
          <Form ref={formRef}>
            {children.length === 0 ? <div className='text-center fs-3'>No tasks</div> : children}
            </Form>
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Deleted Completed
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalContainer
