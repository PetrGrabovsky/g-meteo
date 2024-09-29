import { WeatherDayRecord } from '@/utils/types';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useMemo } from 'react';
import { isToday } from '@/utils/helpers';

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

  return (
    <article
      onMouseOver={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={clsx(
        isActive ? 'scale-105 transform bg-opacity-30 shadow-lg' : 'hover:scale-105 hover:bg-opacity-30',
        isDateToday && 'text-blue-700',
        'animate-fadeIn cursor-pointer rounded-lg bg-white bg-opacity-20 p-6 shadow-md transition-transform',
        'duration-200'
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold">{weekday}</h3>
        <p className="text-lg">{fullDate}</p>
      </div>
      <hr className="my-3 border-t border-white border-opacity-20" />
      <div className="mb-4 flex items-center justify-between">
        <p className="mb-1 text-4xl font-bold">{record.temp}°C</p>
        <Image
          src={`https://openweathermap.org/img/wn/${record.icon}@2x.png`}
          alt="Ikona počasí"
          width={100}
          height={100}
          className="h-24 w-24"
        />
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
