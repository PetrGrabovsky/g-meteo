import WeatherCard from './weather-card';
import { useState } from 'react';
import { useAppSelector } from '@/store/hooks';

export default function WeatherCardList() {
  const dailyRecords = useAppSelector((state) => state.weather.dailyRecords);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);

  const handleMouseEnter = (index: number) => {
    if (activeCardIndex !== index) setActiveCardIndex((prevState) => (prevState !== index ? index : prevState));
  };

  const handleMouseLeave = () => {
    setActiveCardIndex(0);
  };

  return (
    <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:justify-center">
      {dailyRecords.map((record, index) => (
        <li key={index}>
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
