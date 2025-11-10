import { BrowserRouter } from 'react-router-dom'
import './App.css'
import AppRouter from './application/AppRouter'
import NavBar from './components/NavBar'

function App() {


  return (
    <>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>

    <NavBar />  
    </>
  )
}

export default App
