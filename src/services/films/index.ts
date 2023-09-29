import axios from 'axios';
import type { IFilm } from './types';

export const getAllFilms = async (page = 1) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/films?page=${page}`)
    const films: IFilm[] = res.data;
    return films;
}

export const getFilms = async (filmId: string) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/films/${filmId}`)
    const film: IFilm = res.data;
    return film;
}
