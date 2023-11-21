import { createContext, useState } from 'react'
import { Graph } from '../models/Graph'

export const ProjectsContext = createContext()

export const ProjectsContextProvider = ({ children }) => {
  const [projects, setProjects] = useState(new Graph())
  const [deletedTasks, setDeletedTasks] = useState([])
  const [filterTasks, setFilterTasks] = useState([])

  return (
    <ProjectsContext.Provider value={{ projects, setProjects, deletedTasks, setDeletedTasks, filterTasks, setFilterTasks }}>
      {children}
    </ProjectsContext.Provider>
  )
}
