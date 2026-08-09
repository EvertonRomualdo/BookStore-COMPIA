import './style/normalize.css'
import './style/global.css'
import './style/app.css'

import { useEffect } from 'react' 
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CartProvider } from './contexts/CartContext'
import { getItem, setItem, STORAGE_KEYS } from './service/storage'
import { initialBooks } from './service/books'
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
import CategoryPage from './pages/CategoryPage'
import ProductsDetailsPage from './pages/ProductsDetailsPage'

function App() {
  
  // SISTEMA DE VERSIONAMENTO DE CATÁLOGO
  useEffect(() => {
    // SEMPRE que adicionar ou mudar um livro no books.ts, aumente este número (ex: 2, 3, 4...)
    const CURRENT_CATALOG_VERSION = 1; 
    
    const savedVersion = getItem<number>('CATALOG_VERSION');
    
    // Se a versão do navegador for diferente da atual, atualiza o banco local
    if (savedVersion !== CURRENT_CATALOG_VERSION) {
        setItem(STORAGE_KEYS.BOOKS, initialBooks);
        setItem('CATALOG_VERSION', CURRENT_CATALOG_VERSION);
    }
  }, []);

  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/login' element={<LoginForm/>}/>
          <Route path='/register' element={<CadasterPage/>}/>
          <Route path='/catalog' element={<CatalogPage/>}/>
          <Route path='/produto/:id' element={<ProductsDetailsPage/>}/>
          <Route path='/about' element={<AboutPage/>}/>
          <Route path="/categories" element={<CategoryPage />} />
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