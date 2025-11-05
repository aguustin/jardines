import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import QuestionsPanel from './components/formularioConPuntaje'
import FormularioInscripcion from './components/formularioInscripcion'
import Inicio from './components/inicio'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Inicio/>} />
          <Route path='/inscripcion' element={<FormularioInscripcion/>} />
          <Route path='/preguntas' element={<QuestionsPanel/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
