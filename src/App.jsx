import CreateProject from './components/CreateProject'
import { ProjectsContextProvider } from './context/projectsContext'

function App () {
  return (
    <>
      <ProjectsContextProvider >
        <CreateProject />
      </ProjectsContextProvider>
    </>
  )
}

export default App
