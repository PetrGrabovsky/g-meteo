'use client';

import WeatherCard from '@/components/weather-card';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchCoordinates } from '@/store/thunks/fetch-coordinates';
import { fetchWeatherData } from '@/store/thunks/fetch-weather-data';
import { useEffect } from 'react';

export default function Home() {
  const dispatch = useAppDispatch();
  const coordinates = useAppSelector((state) => state.geo.coordinates);
  const loadingCoordinates = useAppSelector((state) => state.geo.loading);

  const city = useAppSelector((state) => state.weather.city);
  const weather = useAppSelector((state) => state.weather.dailyRecords);
  const loadingWeather = useAppSelector((state) => state.weather.loading);
  const errorWeather = useAppSelector((state) => state.weather.error);

  useEffect(() => {
    dispatch(fetchCoordinates());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchWeatherData());
  }, [dispatch, coordinates]);

  return (
    <section>
      <h2 className="mb-8 text-2xl font-bold drop-shadow-lg">Předpověď pro: {city}</h2>
      <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:justify-center">
        {weather.map((record) => (
          <li key={record.date}>
            <WeatherCard record={record} />
          </li>
        ))}
      </ul>
    </section>
  );
}
