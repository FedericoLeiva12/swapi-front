import axios from 'axios';
import type { ISpaceship } from '../types';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: {
    spaceshipId: string;
  };
};

export async function GET(_: NextRequest, { params: { spaceshipId } }: Context) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/spaceships/${spaceshipId}`)
    const spaceship: ISpaceship = res.data;
    return NextResponse.json({ body: { spaceship }, status: 200 });
  } catch (error: any) {
    return NextResponse.json({ body: { error: error.message }, status: 500 });
  }
}
