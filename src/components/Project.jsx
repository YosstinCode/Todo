import { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import TaskForm from './TaskForm'
import { Card } from 'react-bootstrap'
import { ProjectsContext } from '../context/projectsContext'

import Task from './Task'
import ModalContainer from './ModalContainer'
import { Graph } from '../models/Graph'

function Project ({ name }) {
  const [show, setShow] = useState(false)
  const [create, setCreate] = useState(false)
  const [showPriority, setShowPriority] = useState(false)
  const [showDueSoon, setShowDueSoon] = useState(false)

  const { projects, setProjects, deletedTasks, filterTasks } = useContext(ProjectsContext)

  const deletedTasksForProject = deletedTasks.filter((task) => task.projectName === name)

  const handleDelete = () => {
    const updatedProjects = new Graph()
    projects.getNodes().forEach((project) => {
      if (project.name !== name) {
        updatedProjects.addNode(project)
      }
    })
    setProjects(updatedProjects)
  }

  const handleClose = (button) => {
    if (button === 'create') setCreate(false)
    if (button === 'show') setShow(false)
    if (button === 'priority') setShowPriority(false)
    if (button === 'dueSoon') setShowDueSoon(false)
  }
  const handleShow = () => setShow(true)
  const handleShowPriority = () => setShowPriority(true)
  const handleCreate = () => setCreate(true)
  const handleShowDueSoon = () => setShowDueSoon(true)

  useEffect(() => {

  }, [show, create, showPriority, showDueSoon])

  return (
    <>

      <Card size='lg'>
        <Card.Body className='d-flex justify-content-between'>

        <Card.Title className='text-center'>{name}</Card.Title>
        <div className='d-flex gap-2'>
          <Button variant="outline-danger" onClick={handleDelete}>
            Delete Project
          </Button>
          <Button variant="outline-primary" onClick={handleCreate}>
            Add Task
          </Button>
          <Button variant="outline-success" onClick={handleShow}>
            View
          </Button>
          <Button variant="outline-warning" onClick={handleShowPriority}>
           View priority
          </Button>
          <Button variant="outline-info" onClick={handleShowDueSoon}>
           View Due Soon
          </Button>
        </div>
        </Card.Body>

      </Card>

      <Modal show={create} onHide={() => handleClose('create')} >
        <Modal.Header closeButton>
          <Modal.Title>Create Tasks</Modal.Title>
        </Modal.Header>
        <TaskForm name={name} handleClose={() => handleClose('create')}/>
      </Modal>

      <ModalContainer show={show} onClose={() => handleClose('show')} title={'View Tasks'} name={name}>
  {projects.getNodeByName(name).getTasks().map((task, index) => (
    !deletedTasksForProject.some((deletedTask) => deletedTask.description === task.description) && !filterTasks.some((filterTask) => filterTask.category !== task.category) && (
      <Task task={task} key={index} />
    )
  ))}
</ModalContainer>

<ModalContainer show={showPriority} onClose={() => handleClose('priority')} title={'View Tasks Priority'} name={name}>
  {projects.getNodeByName(name).getPriorityTasks().map((task, index) => (
    !deletedTasksForProject.some((deletedTask) => deletedTask.description === task.description) && !filterTasks.some((filterTask) => filterTask.category !== task.category) && (
      <Task task={task} key={index} />
    )
  ))}
</ModalContainer>

<ModalContainer show={showDueSoon} onClose={() => handleClose('dueSoon')} title={'View Tasks Due Soon'} name={name}>
  {projects.getNodeByName(name).getDueSoonTasks().map((task, index) => (
    !deletedTasksForProject.some((deletedTask) => deletedTask.description === task.description) && !filterTasks.some((filterTask) => filterTask.category !== task.category) && (
      <Task task={task} key={index} />
    )
  ))}
</ModalContainer>

    </>
  )
}

export default Project
