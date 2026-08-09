export const STORAGE_KEYS = {
    USERS: '@compia:users',
    SESSION: '@compia:session',
    ORDERS: '@compia:orders',
    BOOKS: '@compia:books',
    CART: '@compia:cart'
};

//Busca e converte um item do localStorage.
export function getItem<T>(key: string): T | null {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error(`Erro ao ler ${key} do localStorage`, error);
        return null;
    }
}

//Converte um objeto para string e salva no localStorage.
export function setItem<T>(key: string, value: T): void {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Erro ao salvar ${key} no localStorage`, error);
    }
}


//Remove um item específico do localStorage.
export function removeItem(key: string): void {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(`Erro ao remover ${key} do localStorage`, error);
    }
}