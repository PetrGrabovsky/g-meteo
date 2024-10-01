import WeatherCard from './weather-card';
import { WeatherDayRecord } from '@/utils/types';
import { useState } from 'react';

interface WeatherCardListProps {
  dailyWeatherRecords: WeatherDayRecord[];
}

export default function WeatherCardList({ dailyWeatherRecords }: WeatherCardListProps) {
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);

  const handleMouseEnter = (index: number) => {
    if (activeCardIndex !== index) setActiveCardIndex((prevState) => (prevState !== index ? index : prevState));
  };

  const handleMouseLeave = () => {
    setActiveCardIndex(0);
  };

  return (
    <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:justify-center">
      {dailyWeatherRecords.map((record, index) => (
        <li key={index} role="listitem" aria-selected={activeCardIndex === index}>
          <WeatherCard
            record={record}
            isActive={activeCardIndex === index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          />
        </li>
      ))}
    </ul>
  );
}
