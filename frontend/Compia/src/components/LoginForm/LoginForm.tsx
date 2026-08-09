import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DefaultInput } from '../DefaultInput/DefaultInput';
import { DefaultButton } from '../DefaultButton/DefaultButton';
import Header from '../Header/Header';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const loginSchema = z.object({
  email: z.string().min(1, 'O e-mail é obrigatório.').email('Formato de e-mail inválido.'),
  password: z.string().min(1, 'A senha é obrigatória.')
});

type LoginData = z.infer<typeof loginSchema>;

function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginData) => {
    try {
      await login(data.email, data.password);
      navigate('/account');
    } catch (error: any) {
      const mensagem = error instanceof Error ? error.message : 'Erro desconhecido ao fazer login.';
      setError('root', { type: 'manual', message: mensagem });
    }
  };

  return (
      <>
        <Header/>
        <div className='w-full min-h-screen bg-[#F9FAFB] flex flex-col justify-center items-center p-4'>

          <div className='flex flex-col gap-6 w-full max-w-md bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100 items-center'>

            <div className='flex flex-col items-center justify-center text-center'>
              <h1 className='text-slate-900 text-3xl font-bold tracking-tight'>Acesse sua Conta</h1>
              <p className='text-gray-500 mt-2 text-sm md:text-base'>Bem-vindo de volta! Insira seus dados para entrar.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 w-full'>

              {errors.root?.message && (
                  <div className="w-full p-3 bg-red-50 text-red-600 text-sm font-semibold rounded-md border border-red-200 text-center animate-in fade-in slide-in-from-top-2">
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

              <div className='flex flex-col w-full'>
                <DefaultInput
                    id="password"
                    labelText="Senha"
                    type="password"
                    placeholder="Digite sua senha"
                    error={errors.password?.message}
                    {...register('password')}
                />

                <div className="flex justify-end px-2 mt-1">
                  <a href="#" className="text-sm text-purple-600 hover:text-purple-800 transition-colors font-medium">
                    Esqueceu a senha?
                  </a>
                </div>
              </div>

              <div className='flex flex-col w-full mt-2'>
                <DefaultButton type="submit" disabled={isSubmitting} className="w-full py-3.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold shadow-md transition-all hover:-translate-y-0.5">
                  {isSubmitting ? 'Entrando...' : 'Entrar'}
                </DefaultButton>
              </div>

              <div className="mt-4 text-sm text-gray-600 text-center w-full">
                Ainda não tem uma conta? <span className="text-purple-600 hover:text-purple-800 font-semibold transition-colors"><Link to={"/register"}>Cadastre-se</Link></span>
              </div>
            </form>
          </div>
        </div>
      </>
  );
}

export default LoginForm;