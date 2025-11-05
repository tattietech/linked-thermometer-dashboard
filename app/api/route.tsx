import { NextResponse } from 'next/server';

export const revalidate = 0;

export async function GET() {
  try {
    const res = await fetch(process.env.API_ENDPOINT as string, {
      headers: {
        'x-api-key': process.env.API_KEY as string,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Upstream error (${res.status})` },
        { status: res.status, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' },
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to fetch upstream API' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}