import axios from 'axios';
import type { IFilm } from '../types';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: {
    filmId: string;
  };
};

export async function GET(_: NextRequest, { params: { filmId } }: Context) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/films/${filmId}`)
    const film: IFilm = res.data;
    return NextResponse.json({ body: { film }, status: 200 });
  } catch (error: any) {
    return NextResponse.json({ body: { error: error.message }, status: 500 });
  }
}
