import WeatherCard from './weather-card';
import { useState } from 'react';
import { useAppSelector } from '@/store/hooks';

export default function WeatherCardList() {
  const dailyRecords = useAppSelector((state) => state.weather.dailyRecords);
  const todayDate = new Date().toISOString().split('T')[0];
  const [activeCard, setActiveCard] = useState<string>(todayDate);

  const handleMouseEnter = (date: string) => {
    if (activeCard !== date) setActiveCard((prevState) => (prevState !== date ? date : prevState));
  };

  const handleMouseLeave = () => {
    if (activeCard !== todayDate) setActiveCard((prevState) => (prevState !== todayDate ? todayDate : prevState));
  };

  return (
    <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:justify-center">
      {dailyRecords.map((record) => (
        <li key={record.date}>
          <WeatherCard
            record={record}
            isActive={activeCard === record.date}
            onMouseEnter={() => handleMouseEnter(record.date)}
            onMouseLeave={handleMouseLeave}
          />
        </li>
      ))}
    </ul>
  );
}
