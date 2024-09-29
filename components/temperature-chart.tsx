import { Line } from 'react-chartjs-2';
import { useAppSelector } from '@/store/hooks';
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
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function TemperatureChart() {
  const dailyRecords = useAppSelector((state) => state.weather.dailyRecords);

  const labels = useMemo(
    () => dailyRecords.map((record) => new Date(record.date).toLocaleDateString('cs-CZ', { weekday: 'long' })),
    [dailyRecords]
  );

  const data = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: 'Teplota (°C)',
          data: dailyRecords.map((record) => record.temp),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
        },
      ],
    }),
    [labels, dailyRecords]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
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
