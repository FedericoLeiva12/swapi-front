import axios from 'axios';
import type { IPlanet } from '../types';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: {
    planetId: string;
  };
};

export async function GET(_: NextRequest, { params: { planetId } }: Context) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/planets/${planetId}`)
    const planet: IPlanet = res.data;
    return NextResponse.json({ body: { planet }, status: 200 });
  } catch (error: any) {
    return NextResponse.json({ body: { error: error.message }, status: 500 });
  }
}
