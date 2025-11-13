import { BrowserRouter } from 'react-router-dom'
import './App.css'
import AppRouter from './application/AppRouter'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

function App() {


  return (
    <>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>

    <NavBar />  
    <Footer />
    </>
  )
}

export default App
