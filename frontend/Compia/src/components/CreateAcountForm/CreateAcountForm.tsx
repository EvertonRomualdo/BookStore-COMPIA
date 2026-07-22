import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DefaultInput } from '../DefaultInput/DefaultInput';
import { DefaultButton } from '../DefaultButton/DefaultButton';

const createAccountSchema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres.'),
  email: z.string().email('Formato de e-mail inválido.'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres.')
});

type CreateAccountData = z.infer<typeof createAccountSchema>;

function CreateAccountForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateAccountData>({
    resolver: zodResolver(createAccountSchema)
  });

  const onSubmit = (data: CreateAccountData) => {
    //backend fetch - TODO
    console.log('Dados validados e prontos para envio:', data);
  };

  return (
    <div className='w-full min-h-screen bg-[#F9FAFB] flex flex-col justify-center items-center'>
      <div className='flex flex-col gap-2 max-w-lg bg-white p-8 rounded-lg shadow-md justify-around items-center'>
        
        <div className='flex flex-col items-center justify-center m-2 text-center'>
          <h1 className='text-gray-900 text-2xl font-bold'>Crie sua Conta</h1>
          <p className='text-gray-500'>Junte-se a vários estudantes e profissionais de TI</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 w-full p-2 justify-around items-center'>
          
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
            <DefaultButton type='submit'>Criar Conta</DefaultButton>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Já tem uma conta? <a href="#" className="text-purple-600 hover:text-purple-800 font-semibold transition-colors">Entrar</a>
          </div>

        </form> 
      </div>
    </div>
  );
}

export default CreateAccountForm;