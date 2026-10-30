import { WeatherDayRecord } from '@/utils/types';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useMemo } from 'react';
import { getDescriptionFromIcon, isToday, parseLocalDate } from '@/utils/helpers';

interface WeatherCardProps {
  record: WeatherDayRecord;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const WeatherCard: React.FC<WeatherCardProps> = React.memo(({ record, isActive, onMouseEnter, onMouseLeave }) => {
  const date = useMemo(() => parseLocalDate(record.date), [record.date]);
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
      aria-label={`Předpověď na ${fullDate}, ${translatedDescription}, teplota až ${record.tempMax} °C, v noci ${record.tempMin} °C, vlhkost ${record.humidity}%`}
      className={clsx(
        isActive ? 'scale-105 bg-white/30 shadow-lg' : 'bg-white/20 hover:scale-105 hover:bg-white/30',
        isDateToday && 'text-blue-700',
        'animate-fadeIn cursor-pointer rounded-lg p-6 shadow-md transition-transform',
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
      <hr className="my-3 border-t border-white/20" />
      <div className="mb-4 flex items-center justify-between sm:flex-col sm:justify-center">
        <div className="mb-1 flex flex-col sm:items-center">
          <p className="text-4xl font-bold" aria-live="polite">
            {record.tempMax}°C
          </p>
          <p className="mt-1 text-lg opacity-80">noc {record.tempMin}°C</p>
        </div>
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
