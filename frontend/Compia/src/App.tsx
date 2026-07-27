import './style/normalize.css'
import './style/global.css'
import './style/app.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginForm from './components/LoginForm/LoginForm'
import CadasterPage from './pages/CadasterPage'
import ProductsPage from './pages/ProductsPage'
import CartPage from './pages/CartPage'
import { CartProvider } from './contexts/CartContext'

//adicionar imports de novas paginas aqui

function App() {

  //Rotas das paginas
  return (
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
  )

}

export default App
