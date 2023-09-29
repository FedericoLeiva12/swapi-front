import axios from 'axios';
import type { ISpaceship } from './types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/spaceships?page=${request.nextUrl.searchParams.get('page') || 1}`)
    const spaceships: ISpaceship[] = res.data;
    return NextResponse.json({ body: { spaceships }, status: 200 });
  } catch (error: any) {
    return NextResponse.json({ body: { error: error.message }, status: 500 });
  }
}
