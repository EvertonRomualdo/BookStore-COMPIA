import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DefaultInput } from '../DefaultInput/DefaultInput';
import { DefaultButton } from '../DefaultButton/DefaultButton';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';

const loginSchema = z.object({
  email: z.string().min(1, 'O e-mail é obrigatório.').email('Formato de e-mail inválido.'),
  password: z.string().min(1, 'A senha é obrigatória.')
});

type LoginData = z.infer<typeof loginSchema>;

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginData) => {
    //feacth da API - TODO
    console.log('Autenticando usuário:', data);
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