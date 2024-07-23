"use client"
interface coin {
    id?: number;
    name?: string;
    symbol?: string;
    price?:  number;
    created_at?: string;
    is_up?: boolean;
}

export default coin;