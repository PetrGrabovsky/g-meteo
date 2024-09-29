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
          pointRadius: 7,
          pointHoverRadius: 10,
          pointHoverBackgroundColor: 'rgba(60, 155, 155, 1)',
          pointHoverBorderColor: 'rgba(55, 150, 150, 0.8)',
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
          displayColors: false,
          bodyFont: {
            size: 16,
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
