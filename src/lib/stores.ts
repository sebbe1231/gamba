import { writable, type Writable } from 'svelte/store';

export interface User {
    id: number;
    name: string;
    money: number;
}

export const userTokenDecoded: Writable<User | null> = writable(null);