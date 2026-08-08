import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DefaultInput } from '../DefaultInput/DefaultInput';
import { DefaultButton } from '../DefaultButton/DefaultButton';
import Header from '../Header/Header';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from "../../contexts/AuthContext.tsx";

const loginSchema = z.object({
  email: z.string().min(1, 'O e-mail é obrigatório.').email('Formato de e-mail inválido.'),
  password: z.string().min(1, 'A senha é obrigatória.')
});

type LoginData = z.infer<typeof loginSchema>;

function LoginForm() {
  const { login } = useAuth(); // <-- Puxando a função de login
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError, // <-- Permite setar erros customizados no formulário
    formState: { errors, isSubmitting }
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginData) => {
    try {
      await login(data.email, data.password);
      navigate('/account'); // Se der certo, vai pra conta!
    } catch (error: any) {
      // Se der erro (ex: senha errada), joga a mensagem do authService para a tela
      setError('root', { message: error.message });
    }
  };

  return (
    <>
      <Header/>
      <div className='w-full min-h-screen bg-[#F9FAFB] flex flex-col justify-center items-center'>
        
        <div className='flex flex-col gap-4 w-full max-w-md bg-white p-8 rounded-lg shadow-md justify-center items-center'>
          
          <div className='flex flex-col items-center justify-center m-2 text-center'>
            <h1 className='text-gray-900 text-2xl font-bold'>Acesse sua Conta</h1>
            <p className='text-gray-500 mt-1'>Bem-vindo de volta! Insira seus dados para entrar.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 w-full p-2 items-center'>
            {errors.root?.message && (
                <div className="w-80 p-3 bg-red-50 text-red-600 text-sm font-semibold rounded-md border border-red-200 mb-2 text-center animate-in fade-in slide-in-from-top-2">
                  {errors.root.message}
                </div>
            )}
            
            <DefaultInput
              id="email"
              labelText="Email"
              type="email"
              placeholder="Digite seu email"
              error={errors.email?.message}
              {...register('email')}
            />

            <div className='flex flex-col w-80'>
              <DefaultInput
                id="password"
                labelText="Senha"
                type="password"
                placeholder="Digite sua senha"
                error={errors.password?.message}
                {...register('password')}
              />
              
              <div className="flex justify-end px-2 -mt-1 mb-2">
                <a href="#" className="text-sm text-purple-600 hover:text-purple-800 transition-colors">
                  Esqueceu a senha?
                </a>
              </div>
            </div>

            <div className='flex flex-col p-2 gap-2 w-80 mt-2'>
              <DefaultButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Entrando...' : 'Entrar'}
              </DefaultButton>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              Ainda não tem uma conta? <span className="text-purple-600 hover:text-purple-800 font-semibold transition-colors"><Link to={"/register"}>Cadastre-se</Link></span>
            </div>

          </form> 
        </div>
      </div>
    </>
  );
}

export default LoginForm;