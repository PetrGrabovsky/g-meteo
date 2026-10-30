import { NextRequest, NextResponse } from 'next/server';

const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

// Předpověď z OpenWeatherMap přes server, aby API klíč nebyl vidět v prohlížeči
export async function GET(request: NextRequest) {
  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey) return NextResponse.json({ error: 'Chybí API klíč' }, { status: 500 });

  const { searchParams } = request.nextUrl;
  const latitude = Number.parseFloat(searchParams.get('lat') ?? '');
  const longitude = Number.parseFloat(searchParams.get('lon') ?? '');

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return NextResponse.json({ error: 'Neplatné souřadnice' }, { status: 400 });
  }

  const url = new URL(FORECAST_URL);
  url.search = new URLSearchParams({
    lat: String(latitude),
    lon: String(longitude),
    appid: apiKey,
    units: 'metric',
  }).toString();

  // Stejný dotaz se 10 minut bere z cache, šetří to limit API
  const response = await fetch(url, { next: { revalidate: 600 } });

  if (!response.ok) return NextResponse.json({ error: 'Nepodařilo se načíst data o počasí' }, { status: 502 });

  return NextResponse.json(await response.json());
}
