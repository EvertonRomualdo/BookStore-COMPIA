import Header from "../components/Header/Header"
import LoginForm from "../components/LoginForm/LoginForm"

function LoginPage() {

    return (
        <>
            <Header/>
            <div className='w-full min-h-screen bg-[#F9FAFB] flex flex-col justify-center items-center'>
                <LoginForm />
            </div>
        </>
    )
}

export default LoginPage