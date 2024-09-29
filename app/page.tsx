'use client';

import TemperatureChart from '@/components/temperature-chart';
import WeatherCardList from '@/components/weather-card-list';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchCoordinates } from '@/store/thunks/fetch-coordinates';
import { fetchWeatherData } from '@/store/thunks/fetch-weather-data';
import { useEffect } from 'react';

export default function Home() {
  const dispatch = useAppDispatch();
  const coordinates = useAppSelector((state) => state.geo.coordinates);
  const city = useAppSelector((state) => state.weather.city);
  const weatherLoading = useAppSelector((state) => state.weather.loading);

  useEffect(() => {
    dispatch(fetchCoordinates());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchWeatherData());
  }, [dispatch, coordinates]);

  if (weatherLoading) {
    return (
      <div className="flex flex-grow items-center justify-center">
        <div className="animate-spin text-6xl">⏳</div>
      </div>
    );
  }

  return (
    <>
      <section className="py-8">
        <h2 className="h2-style">
          Předpověď pro: <span className="animate-pulse">{city}</span>
        </h2>
        <WeatherCardList />
      </section>
      <section className="py-8">
        <h2 className="h2-style">
          Vývoj teplot pro: <span className="animate-pulse">{city}</span>
        </h2>
        <TemperatureChart />
      </section>
    </>
  );
}
