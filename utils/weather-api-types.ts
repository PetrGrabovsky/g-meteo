interface MainWeatherInfo {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

interface WeatherDescription {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface City {
  id: number;
  name: string;
  country: string;
  coord: {
    lon: number;
    lat: number;
  };
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface WeatherListEntry {
  dt: number;
  main: MainWeatherInfo;
  weather: WeatherDescription[];
  clouds: {
    all: number;
  };
  wind: Wind;
  visibility: number;
  pop: number;
  rain?: {
    '1h': number;
    '3h'?: number;
  };
  dt_txt: string;
}

export interface WeatherForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherListEntry[];
  city: City;
}
