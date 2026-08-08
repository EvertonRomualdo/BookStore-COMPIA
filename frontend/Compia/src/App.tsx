import './style/normalize.css'
import './style/global.css'
import './style/app.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginForm from './components/LoginForm/LoginForm'
import CadasterPage from './pages/CadasterPage'
import HomePage from './pages/HomePage'
import AboutPage from "./pages/AboutPage.tsx";
import AccountPage from "./pages/AccountPage.tsx";
import AccountProfile from "./pages/AccountProfile.tsx";
import AccountSecurity from "./pages/AccountSecurity.tsx";
function App() {

  //Rotas das paginas
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/register' element={<CadasterPage/>}/>
        <Route path='/aboult' element={<AboutPage/>}/>
        <Route path='*' element={<><h1>Not Found</h1></>}/>
        <Route path='/account' element={<AccountPage/>}/>
        <Route path='/account/profile' element={<AccountProfile/>}/>
        <Route path="/account/security" element={<AccountSecurity />} />
      </Routes>
    </BrowserRouter>
  )
  
}

export default App
