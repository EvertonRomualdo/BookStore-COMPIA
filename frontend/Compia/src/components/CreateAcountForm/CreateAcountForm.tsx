import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DefaultInput } from '../DefaultInput/DefaultInput';
import { DefaultButton } from '../DefaultButton/DefaultButton';
import { Link, useNavigate } from 'react-router-dom';
import {useAuth} from "../../contexts/AuthContext.tsx";

const createAccountSchema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres.'),
  email: z.string().email('Formato de e-mail inválido.'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres.')
});

type CreateAccountData = z.infer<typeof createAccountSchema>;

function CreateAccountForm() {
  const { registerUser } = useAuth(); // <-- Puxando a função de registro
  const navigate = useNavigate();

  const {
    register, // Este é o register do react-hook-form para plugar os inputs
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
      navigate('/login'); // Cadastrou e logou, vai direto pra conta!
    } catch (error: any) {
      setError('root', { message: error.message }); // Ex: E-mail já cadastrado
    }
  };

  return (
    <>
      
        <div className='flex flex-col gap-2 max-w-lg bg-white p-8 rounded-lg shadow-md justify-around items-center'>
          
          <div className='flex flex-col items-center justify-center m-2 text-center'>
            <h1 className='text-gray-900 text-2xl font-bold'>Crie sua Conta</h1>
            <p className='text-gray-500'>Junte-se a vários estudantes e profissionais de TI</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 w-full p-2 justify-around items-center'>
            {errors.root?.message && (
                <div className="w-80 p-3 bg-red-50 text-red-600 text-sm font-semibold rounded-md border border-red-200 mb-2 text-center animate-in fade-in slide-in-from-top-2">
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

            <div className='flex flex-col p-2 gap-2 w-80 mt-4'>
              {/* Desabilita o botão enquanto estiver aguardando o "backend" */}
              <DefaultButton type='submit' disabled={isSubmitting}>
                {isSubmitting ? 'Criando...' : 'Criar Conta'}
              </DefaultButton>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              Já tem uma conta? <span className="text-purple-600 hover:text-purple-800 font-semibold transition-colors"><Link to={"/login"}>Entrar</Link></span>
            </div>

          </form> 
        </div>
  </>
  );
}

export default CreateAccountForm;