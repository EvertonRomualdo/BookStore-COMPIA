import './style/normalize.css'
import './style/global.css'
import './style/app.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginForm from './components/LoginForm/LoginForm'
import CadasterPage from './pages/CadasterPage'
<<<<<<< HEAD
import ProductsPage from './pages/ProductsPage'
import CartPage from './pages/CartPage'
import { CartProvider } from './contexts/CartContext'

//adicionar imports de novas paginas aqui

=======
import HomePage from './pages/HomePage'
import AboutPage from "./pages/AboutPage.tsx";
>>>>>>> debded18c5e16ceca1478d52fe52522f9a72c959
function App() {

  //Rotas das paginas
  return (
<<<<<<< HEAD
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<CadasterPage/>}/>
          <Route path='/login' element={<LoginForm/>}/>
          <Route path='/register' element={<CadasterPage/>}/>
          <Route path='/produtos' element={<ProductsPage/>}/>
          <Route path='/carrinho' element={<CartPage/>}/>
          <Route path='*' element={<><h1>Not Found</h1></>}/>
        </Routes>
      </BrowserRouter>
    </CartProvider>
=======
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/register' element={<CadasterPage/>}/>
        <Route path='/aboult' element={<AboutPage/>}/>
        <Route path='*' element={<><h1>Not Found</h1></>}/>
      </Routes>
    </BrowserRouter>
>>>>>>> debded18c5e16ceca1478d52fe52522f9a72c959
  )

}

export default App
