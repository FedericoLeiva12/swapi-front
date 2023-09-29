import axios from 'axios';

export const getAllSpaceships = async (page = 1) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/spaceships?page=${page}`);
    const spaceships = res.data;
    return spaceships;
}

export const getSpaceships = async (spaceshipId: string) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/spaceships/${spaceshipId}`);
    const spaceship = res.data;
    return spaceship;
}
