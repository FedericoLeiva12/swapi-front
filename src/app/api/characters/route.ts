import axios from 'axios';
import type { ICharacter } from './types';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/characters?page=${request.nextUrl.searchParams.get('page') || 1}`)
    const characters: ICharacter[] = res.data;
    return NextResponse.json({ body: { characters }, status: 200 });
  } catch (error: any) {
    throw NextResponse.json({ body: { error: error.message }, status: 500 });
  }
}
