//Tipagem usada no mock da API
export interface User {
    id: string;
    name: string;
    email: string;
    password?: string;
    cpf?: string;
    address?: string;
    avatar?: string;
}

//TODO service
export interface Order {
    id: string;
    userId: string;
    title: string;
    type: 'physical' | 'ebook';
    price: number;
    status: 'Entregue' | 'Disponível' | 'Processando' | 'Cancelado';
    purchaseDate: string;
}