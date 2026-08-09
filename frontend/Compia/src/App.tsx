import './style/normalize.css'
import './style/global.css'
import './style/app.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CartProvider } from './contexts/CartContext'

import HomePage from './pages/HomePage'
import LoginForm from './components/LoginForm/LoginForm'
import CadasterPage from './pages/CadasterPage'
import CatalogPage from './pages/CatalogPage'
import AboutPage from "./pages/AboutPage"
import AccountPage from "./pages/AccountPage"
import AccountProfile from "./pages/AccountProfile"
import AccountSecurity from "./pages/AccountSecurity"
import { CheckoutPage } from './pages/CheckoutPage'
import CartPage from './pages/CartPage'

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/login' element={<LoginForm/>}/>
          <Route path='/register' element={<CadasterPage/>}/>
          <Route path='/catalog' element={<CatalogPage/>}/>
          <Route path='/aboult' element={<AboutPage/>}/>
          <Route path='/carrinho' element={<CartPage/>}/>
          <Route path='/account' element={<AccountPage/>}/>
          <Route path='/account/profile' element={<AccountProfile/>}/>
          <Route path="/account/security" element={<AccountSecurity />} />
          <Route path='/checkout' element={<CheckoutPage/>}/>
          <Route path='*' element={<><h1>Not Found</h1></>}/>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App