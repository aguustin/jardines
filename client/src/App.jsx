import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import QuestionsPanel from './components/formularioConPuntaje'
import FormularioInscripcion from './components/formularioInscripcion'
import Inicio from './components/inicio'
import { CuitContextProvider } from './context/cuitContext'

function App() {
  return (
    <>
      <BrowserRouter>
      <CuitContextProvider>
        <Routes>
          <Route path='/' element={<Inicio/>} />
          <Route path='/inscripcion' element={<FormularioInscripcion/>} />
          <Route path='/preguntas/:cuilNino' element={<QuestionsPanel/>} />
        </Routes>
      </CuitContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
