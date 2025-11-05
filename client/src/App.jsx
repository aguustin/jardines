import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import QuestionsPanel from './components/formularioConPuntaje'
import FormularioInscripcion from './components/formularioInscripcion'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<FormularioInscripcion/>} />
          <Route path='/preguntas' element={<QuestionsPanel/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
