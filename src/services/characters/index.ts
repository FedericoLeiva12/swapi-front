import axios from 'axios';
import type { ICharacter } from './types';

export const getAllCharacters = async (page: number = 1) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/characters?page=${page}`)
    const characters: ICharacter[] = res.data;
    return characters;
};

export const getCharacters = async (characterId: string) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/characters/${characterId}`)
    const character: ICharacter = res.data;
    return character;
};
