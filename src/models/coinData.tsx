"use client"
interface Coin {
    id?: number;
    name?: string;
    symbol?: string;
    price?:  number;
    created_at?: string;
    is_up?: boolean;
    is_watch?: boolean;
    change_percentage?: number;
}

export default Coin;