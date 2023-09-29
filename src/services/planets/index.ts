import axios from 'axios';
import { IPlanet } from './types';

export const getAllPlanets = async (page = 1) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/planets?page=${page}`)
    const planets: IPlanet[] = res.data;
    return planets;
}

export const getPlanets = async (planetId: string) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/planets/${planetId}`)
    const planet: IPlanet = res.data;
    return planet;
}
