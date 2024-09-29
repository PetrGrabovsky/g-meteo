import { createAsyncThunk } from '@reduxjs/toolkit';
import { WeatherState } from '@/utils/types';
import { WeatherForecastResponse } from '@/utils/weather-api-types';
import { RootState } from '../store';

// Výpočet průměrné hodnoty
const calculateAverageValue = (values: number[]): number => {
  return parseFloat((values.reduce((sum, val) => sum + val, 0) / values.length).toFixed(1));
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
  apiKey: string
): Promise<WeatherForecastResponse> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
  );

  if (!response.ok) throw new Error('Nepodařilo se načíst data o počasí');

  return response.json();
};

// Zpracování dat z API
const processWeatherData = (data: WeatherForecastResponse): WeatherState['dailyRecords'] => {
  const processedRecords: Record<
    string,
    { temps: number[]; humidities: number[]; windSpeeds: number[]; icons: string[] }
  > = {};

  data.list.forEach(({ dt_txt, main, wind, weather }) => {
    const date = dt_txt.split(' ')[0];

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
  return Object.keys(processedRecords).map((date) => {
    const record = processedRecords[date];
    return {
      date,
      temp: calculateAverageValue(record.temps),
      humidity: calculateAverageValue(record.humidities),
      windSpeed: calculateAverageValue(record.windSpeeds),
      icon: getMostCommonIcon(record.icons),
    };
  });
};

// Thunk pro volání API
export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async (_, { getState, rejectWithValue }) => {
    const { coordinates } = (getState() as RootState).geo;

    if (!coordinates) return rejectWithValue('Souřadnice nejsou k dispozici');

    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY || '15b747ab3fff0cc5a5ad3fd970ed43e6';

    try {
      const data = await fetchWeatherFromApi(coordinates.latitude, coordinates.longitude, apiKey);
      const dailyRecords = processWeatherData(data);

      return {
        city: data.city.name,
        dailyRecords,
      };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Nepodařilo se načíst data o počasí');
    }
  }
);
