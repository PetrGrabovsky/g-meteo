export interface Coordinates {
  latitude: number;
  longitude: number;
}

interface WeatherDayRecord {
  date: string;
  temp: number;
  humidity: number;
  windSpeed: number;
  icon: string;
}

export interface WeatherState {
  city: string;
  dailyRecords: WeatherDayRecord[];
  loading: boolean;
  error: string | null;
}
