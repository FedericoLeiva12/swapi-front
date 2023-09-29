import axios from 'axios';
import type { IFilm } from './types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/films?page=${request.nextUrl.searchParams.get('page') || 1}`)
    const films: IFilm[] = res.data;
    return NextResponse.json({ body: { films }, status: 200 });
  } catch (error: any) {
    return NextResponse.json({ body: { error: error.message }, status: 500 });
  }
}
