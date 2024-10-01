import { WeatherDayRecord } from '@/utils/types';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useMemo } from 'react';
import { isToday } from '@/utils/helpers';
import { getDescriptionFromIcon } from '@/utils/helpers';

interface WeatherCardProps {
  record: WeatherDayRecord;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const WeatherCard: React.FC<WeatherCardProps> = React.memo(({ record, isActive, onMouseEnter, onMouseLeave }) => {
  const date = useMemo(() => new Date(record.date), [record.date]);
  const weekday = useMemo(() => date.toLocaleDateString('cs-CZ', { weekday: 'long' }), [date]);
  const fullDate = useMemo(() => date.toLocaleDateString('cs-CZ'), [date]);
  const isDateToday = useMemo(() => isToday(date), [date]);
  const translatedDescription = useMemo(() => getDescriptionFromIcon(record.icon), [record.icon]);

  return (
    <article
      onMouseOver={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-labelledby={`weather-${record.date}`}
      role="region"
      tabIndex={0}
      aria-label={`Předpověď na ${fullDate}, ${translatedDescription}, teplota ${record.temp} °C, vlhkost ${record.humidity}%`}
      className={clsx(
        isActive ? 'scale-105 transform bg-opacity-30 shadow-lg' : 'hover:scale-105 hover:bg-opacity-30',
        isDateToday && 'text-blue-700',
        'animate-fadeIn cursor-pointer rounded-lg bg-white bg-opacity-20 p-6 shadow-md transition-transform',
        'duration-200'
      )}
    >
      <header className="flex items-center justify-between">
        <h3 id={`weather-${record.date}`} className="text-2xl font-semibold">
          {weekday}
        </h3>
        <time className="text-lg" dateTime={record.date}>
          {fullDate}
        </time>
      </header>
      <hr className="my-3 border-t border-white border-opacity-20" />
      <div className="mb-4 flex items-center justify-between sm:flex-col sm:justify-center">
        <p className="mb-1 text-4xl font-bold" aria-live="polite">
          {record.temp}°C
        </p>
        <div className="flex flex-col items-center justify-center">
          <Image
            src={`https://openweathermap.org/img/wn/${record.icon}@2x.png`}
            alt={`Ikona počasí: ${translatedDescription}`}
            width={100}
            height={100}
            priority
            className="h-24 w-24"
          />
          <p
            aria-label={`Popis počasí: ${translatedDescription}`}
            role="img"
            className={clsx(
              'mt-2 rounded-full border-2 border-blue-200 bg-blue-400 px-3 py-1 text-center text-sm font-semibold',
              'text-white shadow-lg'
            )}
          >
            {translatedDescription}
          </p>
        </div>
      </div>
      <div className="space-y-2 text-lg">
        <p>Vlhkost: {record.humidity}%</p>
        <p>Rychlost větru: {record.windSpeed} m/s</p>
      </div>
    </article>
  );
});

WeatherCard.displayName = 'WeatherCard';
export default WeatherCard;
