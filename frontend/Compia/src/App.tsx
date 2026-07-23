import './style/normalize.css'
import './style/global.css'
import './style/app.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginForm from './components/LoginForm/LoginForm'
import CadasterPage from './pages/CadasterPage'
function App() {

  //Rotas das paginas
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CadasterPage/>}/>
        <Route path='/login' element={<LoginForm/>}/>
         <Route path='/register' element={<CadasterPage/>}/>
        <Route path='*' element={<><h1>Not Found</h1></>}/>
      </Routes>
    </BrowserRouter>
  )
  
}

export default App
