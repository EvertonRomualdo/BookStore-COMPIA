import type { User } from '../types';
import { STORAGE_KEYS, getItem, setItem, removeItem } from './storage';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
    async register(userData: Omit<User, 'id'>): Promise<Omit<User, 'password'>> {
        await delay(800); // Simula o tempo do fetch

        const users = getItem<User[]>(STORAGE_KEYS.USERS) || [];

        const emailExists = users.some(user => user.email === userData.email);
        if (emailExists) {
            throw new Error('Este e-mail já está em uso.');
        }

        const newUser: User = {
            ...userData,
            id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
        };

        users.push(newUser);
        setItem(STORAGE_KEYS.USERS, users);

        const { password, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    },

    /**
     * Simula o login verificando e-mail e senha
     */
    async login(email: string, pass: string): Promise<Omit<User, 'password'>> {
        await delay(800); // Simula o tempo do fetch

        const users = getItem<User[]>(STORAGE_KEYS.USERS) || [];

        const user = users.find(u => u.email === email && u.password === pass);

        if (!user) {
            throw new Error('E-mail ou senha incorretos.');
        }

        setItem(STORAGE_KEYS.SESSION, user.id);

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    },

    /**
     * Remove a sessão atual, desconectando o usuário
     */
    async logout(): Promise<void> {
        await delay(300);
        removeItem(STORAGE_KEYS.SESSION);
    },

    /**
     * Função auxiliar para buscar os dados do usuário atualmente logado
     */
    async getCurrentUser(): Promise<Omit<User, 'password'> | null> {
        await delay(300);
        const currentUserId = getItem<string>(STORAGE_KEYS.SESSION);

        if (!currentUserId) return null;

        const users = getItem<User[]>(STORAGE_KEYS.USERS) || [];
        const user = users.find(u => u.id === currentUserId);

        if (!user) {
            removeItem(STORAGE_KEYS.SESSION);
            return null;
        }

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
};