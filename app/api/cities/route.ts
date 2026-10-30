import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { NextRequest, NextResponse } from 'next/server';
import { City } from '@/utils/weather-api-types';

const CITY_LIST_PATH = path.join(process.cwd(), 'data', 'city.list.json');
const MAX_RESULTS = 10;

interface SearchableCity {
  city: City;
  searchName: string;
}

// Malá písmena bez diakritiky, aby „usti“ našlo „Ústí“
const normalize = (text: string): string =>
  text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();

let citiesPromise: Promise<SearchableCity[]> | null = null;

// Seznam měst (41 MB) se načte jen jednou a zůstane v paměti serveru
const loadCities = (): Promise<SearchableCity[]> => {
  citiesPromise ??= readFile(CITY_LIST_PATH, 'utf8')
    .then((json) =>
      (JSON.parse(json) as City[]).map(({ id, name, country, coord }) => ({
        city: { id, name, country, coord },
        searchName: normalize(name),
      }))
    )
    .catch((error) => {
      citiesPromise = null;
      throw error;
    });

  return citiesPromise;
};

// Vrací nejvýše 10 měst: nejdřív přesnou shodu, pak začátek názvu, pak začátek slova („Praha“ → „Hlavní město Praha“)
export async function GET(request: NextRequest) {
  const query = normalize(request.nextUrl.searchParams.get('q')?.trim() ?? '');

  if (!query) return NextResponse.json([]);

  try {
    const cities = await loadCities();
    const exactMatches: City[] = [];
    const prefixMatches: City[] = [];
    const wordMatches: City[] = [];

    for (const { city, searchName } of cities) {
      if (searchName === query) {
        exactMatches.push(city);
      } else if (searchName.startsWith(query)) {
        if (prefixMatches.length < MAX_RESULTS) prefixMatches.push(city);
      } else if (
        wordMatches.length < MAX_RESULTS &&
        (searchName.includes(` ${query}`) || searchName.includes(`-${query}`))
      ) {
        wordMatches.push(city);
      }
    }

    return NextResponse.json([...exactMatches, ...prefixMatches, ...wordMatches].slice(0, MAX_RESULTS));
  } catch {
    return NextResponse.json({ error: 'Nepodařilo se načíst města' }, { status: 500 });
  }
}
