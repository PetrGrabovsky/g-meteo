'use client';

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
      {/* Zobrazení načítání souřadnic */}
      {loadingCoordinates ? (
        <p>Načítání polohy...</p>
      ) : (
        coordinates && (
          <p>
            Latitude: {coordinates.latitude}, Longitude: {coordinates.longitude}
          </p>
        )
      )}

      {/* Zobrazení počasí nebo chybové zprávy */}
      {loadingWeather ? (
        <p>Načítání počasí...</p>
      ) : errorWeather ? (
        <p style={{ color: 'red' }}>Chyba: {errorWeather}</p>
      ) : (
        weather.length > 0 && (
          <div>
            <h2>Počasí pro město {city}:</h2> {/* Zobrazení města */}
            {weather.map((record) => (
              <div key={record.date}>
                <p>
                  {record.date}: {record.temp}°C, Vítr: {record.windSpeed} m/s, Vlhkost: {record.humidity}%
                </p>
                <img src={record.icon} alt="Weather Icon" />
              </div>
            ))}
          </div>
        )
      )}
    </section>
  );
}
