import { Line } from 'react-chartjs-2';
import { WeatherDayRecord } from '@/utils/types';
import { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(CategoryScale, Filler, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface TemperatureChartProps {
  dailyWeatherRecords: WeatherDayRecord[];
}

export default function TemperatureChart({ dailyWeatherRecords }: TemperatureChartProps) {
  const labels = useMemo(
    () => dailyWeatherRecords.map((record) => new Date(record.date).toLocaleDateString('cs-CZ', { weekday: 'long' })),
    [dailyWeatherRecords]
  );

  const data = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: 'Teplota (°C)',
          data: dailyWeatherRecords.map((record) => record.temp),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
          pointRadius: 10,
          pointHoverRadius: 15,
          pointHoverBackgroundColor: 'rgba(60, 155, 155, 1)',
          pointHoverBorderColor: 'rgba(55, 150, 150, 0.8)',
        },
      ],
    }),
    [labels, dailyWeatherRecords]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          displayColors: false,
          bodyFont: {
            size: 17,
          },
          titleFont: {
            size: 15,
          },
          callbacks: {
            label: (context: any) => `${context.raw} °C`,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: 'rgba(255, 255, 255, 0.6)',
          },
        },
        y: {
          ticks: {
            color: 'rgba(255, 255, 255, 0.6)',
            beginAtZero: true,
          },
        },
      },
    }),
    []
  );

  return <Line data={data} options={options} />;
}
