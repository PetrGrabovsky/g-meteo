'use client';

import WeatherCardList from '@/components/weather-card-list';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchCoordinates } from '@/store/thunks/fetch-coordinates';
import { fetchWeatherData } from '@/store/thunks/fetch-weather-data';
import { useEffect } from 'react';

export default function Home() {
  const dispatch = useAppDispatch();
  const coordinates = useAppSelector((state) => state.geo.coordinates);
  const city = useAppSelector((state) => state.weather.city);

  useEffect(() => {
    dispatch(fetchCoordinates());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchWeatherData());
  }, [dispatch, coordinates]);

  return (
    <section>
      <h2 className="mb-8 text-2xl font-bold drop-shadow-lg">Předpověď pro: {city}</h2>
      <WeatherCardList />
    </section>
  );
}
