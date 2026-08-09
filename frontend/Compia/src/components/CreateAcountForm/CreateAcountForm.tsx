import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DefaultInput } from '../DefaultInput/DefaultInput';
import { DefaultButton } from '../DefaultButton/DefaultButton';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const createAccountSchema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres.'),
  email: z.string().email('Formato de e-mail inválido.'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres.')
});

type CreateAccountData = z.infer<typeof createAccountSchema>;

function CreateAccountForm() {
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<CreateAccountData>({
    resolver: zodResolver(createAccountSchema)
  });

  const onSubmit = async (data: CreateAccountData) => {
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password
      });
      navigate('/login');
    } catch (error: any) {
      const mensagem = error instanceof Error ? error.message : 'Erro desconhecido ao cadastrar.';
      setError('root', { type: 'manual', message: mensagem });
    }
  };

  return (
      <>
        <div className='w-full min-h-screen bg-[#F9FAFB] flex flex-col justify-center items-center p-4'>
          <div className='flex flex-col gap-6 w-full max-w-md bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100 items-center'>

            <div className='flex flex-col items-center justify-center text-center'>
              <h1 className='text-slate-900 text-3xl font-bold tracking-tight'>Crie sua Conta</h1>
              <p className='text-gray-500 mt-2 text-sm md:text-base'>Junte-se a vários estudantes e profissionais de TI</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 w-full'>

              {errors.root?.message && (
                  <div className="w-full p-3 bg-red-50 text-red-600 text-sm font-semibold rounded-md border border-red-200 text-center animate-in fade-in slide-in-from-top-2">
                    {errors.root.message}
                  </div>
              )}

              <DefaultInput
                  id="name"
                  labelText="Nome"
                  type="text"
                  placeholder="Digite seu nome"
                  error={errors.name?.message}
                  {...register('name')}
              />

              <DefaultInput
                  id="email"
                  labelText="Email"
                  type="email"
                  placeholder="Digite seu email"
                  error={errors.email?.message}
                  {...register('email')}
              />

              <DefaultInput
                  id="password"
                  labelText="Senha"
                  type="password"
                  placeholder="Digite sua senha"
                  error={errors.password?.message}
                  {...register('password')}
              />

              <div className='flex flex-col w-full mt-4'>
                <DefaultButton type='submit' disabled={isSubmitting} className="w-full py-3.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold shadow-md transition-all hover:-translate-y-0.5">
                  {isSubmitting ? 'Criando...' : 'Criar Conta'}
                </DefaultButton>
              </div>

              <div className="mt-4 text-sm text-gray-600 text-center w-full">
                Já tem uma conta? <span className="text-purple-600 hover:text-purple-800 font-semibold transition-colors"><Link to={"/login"}>Entrar</Link></span>
              </div>
            </form>
          </div>
        </div>
      </>
  );
}

export default CreateAccountForm;