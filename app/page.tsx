'use client';

import TemperatureChart from '@/components/home/temperature-chart';
import WeatherCardList from '@/components/home/weather-card-list';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchCoordinates } from '@/store/thunks/fetch-coordinates';
import { fetchWeatherData } from '@/store/thunks/fetch-weather-data';
import { useEffect } from 'react';

export default function Home() {
  const dispatch = useAppDispatch();
  const coordinates = useAppSelector((state) => state.geo.coordinates);
  const cityName = useAppSelector((state) => state.weather.city);
  const weatherLoading = useAppSelector((state) => state.weather.loading);
  const dailyWeatherRecords = useAppSelector((state) => state.weather.dailyRecords);
  const weatherError = useAppSelector((state) => state.weather.error);

  useEffect(() => {
    dispatch(fetchCoordinates());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchWeatherData());
  }, [dispatch, coordinates]);

  if (weatherError) {
    return (
      <div className="flex flex-grow items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-2">
          <span className="text-6xl">❌</span>
          <p>{weatherError}</p>
        </div>
      </div>
    );
  }

  if (weatherLoading || !coordinates) {
    return (
      <div className="flex flex-grow items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-2">
          <span className="animate-spin text-6xl">⏳</span>
          <p>Načítám data...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <section aria-label="Seznam karet s předpovědí počasí" className="py-8">
        <header>
          <h2 className="h2-style">
            Předpověď pro:{' '}
            <span aria-live="polite" className="animate-pulse">
              {cityName}
            </span>
          </h2>
        </header>
        <WeatherCardList dailyWeatherRecords={dailyWeatherRecords} />
      </section>
      <section aria-label="Graf vývoje teplot" className="py-8">
        <header>
          <h2 className="h2-style">
            Vývoj teplot pro:{' '}
            <span aria-live="polite" className="animate-pulse">
              {cityName}
            </span>
          </h2>
        </header>
        <TemperatureChart dailyWeatherRecords={dailyWeatherRecords} />
      </section>
    </>
  );
}
