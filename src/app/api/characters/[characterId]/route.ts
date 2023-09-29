import axios from 'axios';
import type { ICharacter } from '../types';
import { NextResponse } from 'next/server';
import { NextApiRequest } from 'next';

type Context = {
  params: {
    characterId: string;
  };
};

export async function GET(_: NextApiRequest, { params: { characterId } }: Context) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/characters/${characterId}`)
    const character: ICharacter = res.data;
    return NextResponse.json({ body: { character }, status: 200 });
  } catch (error: any) {
    return NextResponse.json({ body: { error: error.message }, status: 500 });
  }
}
