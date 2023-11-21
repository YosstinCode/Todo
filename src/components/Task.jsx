// import React, { useContext } from 'react'
import { Form, ListGroup } from 'react-bootstrap'
import { PRIORITY } from '../enums/priority'
// import { ProjectsContext } from '../context/projectsContext'

const Task = ({ task }) => {
  // const { projects, setProjects } = useContext(ProjectsContext)

  return (
    <ListGroup.Item variant={task.priority === PRIORITY.HIGH ? 'danger' : task.priority === PRIORITY.MEDIUM ? 'warning' : 'success' }>
    <div className='mb-2' >
       <div className="fs-3">{task.description}</div>
       <div className='d-flex gap-4'>
         <b>Date:</b> {task.date}
         <b>Category:</b> {task.category}
       </div>
       <div className='d-flex gap-4'>
         <b>Priority:</b> {task.priority}
         <b>Completed:</b>
            <Form.Check // prettier-ignore
              type="switch"
              id={task.description}
              label=""
              name={task.description}
            />
       </div>
     </div>

 </ListGroup.Item>
  )
}

export default Task
