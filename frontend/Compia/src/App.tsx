import './style/normalize.css'
import './style/global.css'
import './style/app.css'

import CreateAccountForm from './components/CreateAcountForm/CreateAcountForm'
function App() {


  //TODO - Implementacao de Debug
  return (
    <div className='w-screen h-screen bg-(--paper)'>
      <CreateAccountForm></CreateAccountForm>
    </div>
  )
  
}

export default App
