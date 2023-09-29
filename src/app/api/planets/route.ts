import axios from 'axios';
import type { IPlanet } from './types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/planets?page=${request.nextUrl.searchParams.get('page') || 1}`)
    const planets: IPlanet[] = res.data;
    return NextResponse.json({ body: { planets: planets }, status: 200 });
  } catch (error: any) {
    return NextResponse.json({ body: { error: error.message }, status: 500 });
  }
}
