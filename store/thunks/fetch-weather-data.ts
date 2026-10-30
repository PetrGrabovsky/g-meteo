import { createAsyncThunk } from '@reduxjs/toolkit';
import { WeatherState } from '@/utils/types';
import { WeatherForecastResponse } from '@/utils/weather-api-types';
import { RootState } from '../store';

const FORECAST_DAYS = 5;
// API vrací měření po 3 hodinách, celý den jich má 8
const MIN_MEASUREMENTS_PER_DAY = 4;

// Zaokrouhlení na jedno desetinné místo
const roundValue = (value: number): number => parseFloat(value.toFixed(1));

// Výpočet průměrné hodnoty
const calculateAverageValue = (values: number[]): number => {
  return roundValue(values.reduce((sum, val) => sum + val, 0) / values.length);
};

// Získání nejčastější ikony
const getMostCommonIcon = (icons: string[]): string => {
  if (!icons.length) return '';

  // Výpočet výskytů jednotlivých ikon
  const iconCounts = icons.reduce<Record<string, number>>((acc, icon) => {
    acc[icon] = (acc[icon] ?? 0) + 1;
    return acc;
  }, {});

  // Ikona s největším počtem výskytů
  const [mostCommonIcon] = Object.entries(iconCounts).reduce(([iconA, countA], [iconB, countB]) =>
    countB > countA ? [iconB, countB] : [iconA, countA]
  );

  // Nahrazení noční ikony za denní
  return mostCommonIcon.endsWith('n') ? mostCommonIcon.replace('n', 'd') : mostCommonIcon;
};

// Načtení dat z API
const fetchWeatherFromApi = async (
  latitude: number,
  longitude: number,
  signal: AbortSignal
): Promise<WeatherForecastResponse> => {
  const response = await fetch(`/api/forecast?lat=${latitude}&lon=${longitude}`, { signal });

  if (!response.ok) throw new Error('Nepodařilo se načíst data o počasí');

  return response.json();
};

// Zpracování dat z API
const processWeatherData = (data: WeatherForecastResponse): WeatherState['dailyRecords'] => {
  const processedRecords: Record<
    string,
    { temps: number[]; humidities: number[]; windSpeeds: number[]; icons: string[] }
  > = {};

  data.list.forEach(({ dt, main, wind, weather }) => {
    // Den podle místního času města (dt je v UTC, timezone je posun v sekundách)
    const date = new Date((dt + data.city.timezone) * 1000).toISOString().split('T')[0];

    // Inicializace prázdné struktury pro každý den
    processedRecords[date] = processedRecords[date] || {
      temps: [],
      humidities: [],
      windSpeeds: [],
      icons: [],
    };

    // Přidání dat do struktury
    processedRecords[date].temps.push(main.temp);
    processedRecords[date].humidities.push(main.humidity);
    processedRecords[date].windSpeeds.push(wind.speed);
    processedRecords[date].icons.push(weather[0].icon);
  });

  // Zpracování dat a vrácení záznamů pro každý den
  // Dny s méně než polovinou měření (zbytek dneška, začátek posledního dne) by ukazovaly zkreslené hodnoty
  return Object.keys(processedRecords)
    .filter((date) => processedRecords[date].temps.length >= MIN_MEASUREMENTS_PER_DAY)
    .slice(0, FORECAST_DAYS)
    .map((date) => {
      const record = processedRecords[date];
      return {
        date,
        tempMax: roundValue(Math.max(...record.temps)),
        tempMin: roundValue(Math.min(...record.temps)),
        humidity: Math.round(calculateAverageValue(record.humidities)),
        windSpeed: calculateAverageValue(record.windSpeeds),
        icon: getMostCommonIcon(record.icons),
      };
    });
};

// Thunk pro volání API
export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async (_, { getState, rejectWithValue, signal }) => {
    const { coordinates } = (getState() as RootState).geo;

    if (!coordinates) return rejectWithValue('Souřadnice nejsou k dispozici');

    try {
      const data = await fetchWeatherFromApi(coordinates.latitude, coordinates.longitude, signal);
      const dailyRecords = processWeatherData(data);

      return {
        city: data.city.name,
        dailyRecords,
      };
    } catch {
      return rejectWithValue('Nepodařilo se načíst data o počasí');
    }
  }
);
