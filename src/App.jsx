import { BrowserRouter } from 'react-router-dom'
import './App.css'
import AppRouter from './application/AppRouter'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'


function App() {


  return (
    <>
      <Toaster position="top-center" />
      <BrowserRouter>
        <AppRouter />
        <NavBar />
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
