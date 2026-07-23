
import CreateAccountForm from "../components/CreateAcountForm/CreateAcountForm"
import Header from "../components/Header/Header"

function CadasterPage() {
  return (
    <>
      <Header/>
      <div className='w-full min-h-screen bg-[#F9FAFB] flex flex-col justify-center items-center'>
        <CreateAccountForm/>
      </div>
    </>
  )
}

export default CadasterPage