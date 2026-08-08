import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { authService } from '../service/authService.ts';
import type { User } from '../types';

type UserWithoutPassword = Omit<User, 'password'>;

interface AuthContextData {
    user: UserWithoutPassword | null;
    isLoading: boolean;
    login: (email: string, pass: string) => Promise<void>;
    registerUser: (data: Omit<User, 'id'>) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserWithoutPassword | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        authService.getCurrentUser()
            .then(currentUser => setUser(currentUser))
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }, []);

    const login = async (email: string, pass: string) => {
        const loggedUser = await authService.login(email, pass);
        setUser(loggedUser);
    };

    const registerUser = async (userData: Omit<User, 'id'>) => {
        await authService.register(userData);
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, registerUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook customizado
export const useAuth = () => useContext(AuthContext);