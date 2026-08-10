import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DefaultInput } from '../DefaultInput/DefaultInput';
import { DefaultButton } from '../DefaultButton/DefaultButton';
import Header from '../Header/Header';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getItem, setItem, STORAGE_KEYS } from '../../service/storage';
import { X, CheckCircle2 } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().min(1, 'O e-mail é obrigatório.').email('Formato de e-mail inválido.'),
  password: z.string().min(1, 'A senha é obrigatória.')
});

type LoginData = z.infer<typeof loginSchema>;

function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  // --- GARANTE QUE O ADMIN EXISTE NO SISTEMA ---
  useEffect(() => {
    const users = getItem<any[]>(STORAGE_KEYS.USERS) || [];
    const adminExists = users.find(u => u.email === 'admin@admin.com');
    
    if (!adminExists) {
        const adminUser = {
            name: 'Administrador',
            email: 'admin@admin.com',
            password: 'admin'
        };
        setItem(STORAGE_KEYS.USERS, [...users, adminUser]);
    }
  }, []);

  const [showForgotModal, setShowForgotModal] = useState(false);
  const [recoverStep, setRecoverStep] = useState(1); 
  const [recoverEmail, setRecoverEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [recoverError, setRecoverError] = useState("");

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
      
      if (data.email === 'admin@admin.com') {
          navigate('/admin');
      } else {
          navigate('/account'); 
      }

    } catch (error: any) {
      const mensagem = error instanceof Error ? error.message : 'Erro desconhecido ao fazer login.';
      setError('root', { type: 'manual', message: mensagem });
    }
  };

  const handleCheckRecoverEmail = () => {
    setRecoverError("");
    if (!recoverEmail) {
        setRecoverError("Digite um e-mail válido.");
        return;
    }

    const users = getItem<any[]>(STORAGE_KEYS.USERS) || [];
    const userExists = users.find(u => u.email === recoverEmail);

    if (userExists) {
        setRecoverStep(2);
    } else {
        setRecoverError("Este e-mail não está cadastrado no sistema.");
    }
  };

  const handleResetPassword = () => {
      setRecoverError("");
      
      if (newPassword.length < 6) {
          setRecoverError("A nova senha deve ter pelo menos 6 caracteres.");
          return;
      }
      if (newPassword !== confirmPassword) {
          setRecoverError("As senhas não coincidem.");
          return;
      }

      const users = getItem<any[]>(STORAGE_KEYS.USERS) || [];
      const updatedUsers = users.map(u => {
          if (u.email === recoverEmail) {
              return { ...u, password: newPassword };
          }
          return u;
      });

      setItem(STORAGE_KEYS.USERS, updatedUsers);
      setRecoverStep(3); 
  };

  const closeRecoverModal = () => {
      setShowForgotModal(false);
      setTimeout(() => {
          setRecoverStep(1);
          setRecoverEmail("");
          setNewPassword("");
          setConfirmPassword("");
          setRecoverError("");
      }, 300);
  };

  return (
      <>
        <Header/>
        <div className='w-full min-h-screen bg-[#F9FAFB] flex flex-col justify-center items-center p-4 relative'>

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
                  <button 
                    type="button" 
                    onClick={() => setShowForgotModal(true)} 
                    className="text-sm text-purple-600 hover:text-purple-800 transition-colors font-medium cursor-pointer"
                  >
                    Esqueceu a senha?
                  </button>
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
          
          {/* --- MODAL DE RECUPERAÇÃO DE SENHA --- */}
          {showForgotModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                  <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
                      
                      <div className="flex justify-between items-center p-6 border-b border-gray-100">
                          <h3 className="text-xl font-bold text-gray-900">Recuperar Senha</h3>
                          <button onClick={closeRecoverModal} className="text-gray-400 hover:text-gray-700">
                              <X size={24} />
                          </button>
                      </div>

                      <div className="p-6">
                          {recoverError && (
                              <div className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-lg mb-4 text-center">
                                  {recoverError}
                              </div>
                          )}

                          {/* PASSO 1: CONFIRMAR E-MAIL */}
                          {recoverStep === 1 && (
                              <div className="flex flex-col gap-4">
                                  <p className="text-gray-500 text-sm text-center mb-2">
                                      Digite o e-mail associado à sua conta para redefinirmos sua senha.
                                  </p>
                                  <input 
                                      type="email" 
                                      value={recoverEmail}
                                      onChange={(e) => setRecoverEmail(e.target.value)}
                                      placeholder="Seu e-mail cadastrado" 
                                      className="border border-gray-300 rounded-lg py-3 px-4 outline-none focus:border-purple-600 w-full"
                                  />
                                  <DefaultButton 
                                      type="button"
                                      onClick={handleCheckRecoverEmail}
                                      className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all shadow-md mt-2"
                                  >
                                      Continuar
                                  </DefaultButton>
                              </div>
                          )}

                          {/* PASSO 2: NOVA SENHA */}
                          {recoverStep === 2 && (
                              <div className="flex flex-col gap-4">
                                  <p className="text-green-600 font-semibold text-sm text-center bg-green-50 p-2 rounded-lg mb-2">
                                      E-mail confirmado! Crie sua nova senha.
                                  </p>
                                  <input 
                                      type="password" 
                                      value={newPassword}
                                      onChange={(e) => setNewPassword(e.target.value)}
                                      placeholder="Nova senha (mín. 6 caracteres)" 
                                      className="border border-gray-300 rounded-lg py-3 px-4 outline-none focus:border-purple-600 w-full"
                                  />
                                  <input 
                                      type="password" 
                                      value={confirmPassword}
                                      onChange={(e) => setConfirmPassword(e.target.value)}
                                      placeholder="Confirme a nova senha" 
                                      className="border border-gray-300 rounded-lg py-3 px-4 outline-none focus:border-purple-600 w-full"
                                  />
                                  <DefaultButton 
                                      type="button"
                                      onClick={handleResetPassword}
                                      className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all shadow-md mt-2"
                                  >
                                      Redefinir Senha
                                  </DefaultButton>
                              </div>
                          )}

                          {/* PASSO 3: SUCESSO */}
                          {recoverStep === 3 && (
                              <div className="flex flex-col items-center gap-4 py-4">
                                  <CheckCircle2 size={64} className="text-green-500" />
                                  <h4 className="text-xl font-bold text-gray-900">Senha Alterada!</h4>
                                  <p className="text-gray-500 text-center text-sm mb-4">
                                      Sua senha foi redefinida com sucesso. Você já pode fazer login com a nova senha.
                                  </p>
                                  <DefaultButton 
                                      type="button"
                                      onClick={closeRecoverModal}
                                      className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all shadow-md"
                                  >
                                      Ir para o Login
                                  </DefaultButton>
                              </div>
                          )}
                      </div>
                  </div>
              </div>
          )}
        </div>
      </>
  );
}

export default LoginForm;