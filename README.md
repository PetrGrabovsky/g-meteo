# Gmeteo – 5-Day Weather Forecast

A 5-day weather forecast for any city in the world. It opens on Prague and, if you allow location access, switches to where you are. Any other city is one search away in the header. The interface is in Czech.

**Live demo:** https://g-meteo-eight.vercel.app

![Gmeteo showing the forecast for Prague](docs/screenshot.png)

I wrote Gmeteo in September 2024 while learning to program. In October 2026 I upgraded it with Claude Code to Next.js 16 and React 19 and fixed it: city search moved to the server, so the browser no longer downloads almost 42 MB of city data, the cards show the daily high and the overnight low instead of an average of all readings, forecast days no longer shift across time zones, and the page can be zoomed on mobile.

## Features

- 5-day forecast: daytime high, overnight low, humidity, wind and a weather icon
- A chart of the daily highs and lows
- Search across about 200,000 cities that ignores diacritics („usti“ finds Ústí nad Labem)
- Keyboard control of the search (arrow keys, Enter, Esc)

## Tech Stack

| Area      | Technology                                           |
| --------- | ---------------------------------------------------- |
| Framework | Next.js 16 (App Router, Route Handlers), React 19    |
| State     | Redux Toolkit (slices and thunks)                    |
| Styling   | Tailwind CSS 4                                       |
| Charts    | Chart.js with react-chartjs-2                        |
| Data      | [OpenWeatherMap](https://openweathermap.org/) API    |
| Tooling   | TypeScript, ESLint 10, Prettier, Husky + lint-staged |

## How It Works

The forecast and the city search go through Next.js Route Handlers (`app/api/forecast`, `app/api/cities`). The OpenWeatherMap API key stays on the server, and the browser never has to load the full city list.

## Getting Started

Requirements: Node.js 24, [pnpm](https://pnpm.io/) and an OpenWeatherMap API key (the free plan is enough).

```bash
git clone https://github.com/PetrGrabovsky/g-meteo.git
cd g-meteo
pnpm install
cp .env.example .env.local
```

Put your key in `WEATHER_API_KEY` in `.env.local` and start the dev server:

```bash
pnpm dev
```

The app runs on [localhost:3000](http://localhost:3000).

Other scripts: `pnpm build` (production build), `pnpm lint`, `pnpm typecheck` and `pnpm format`.

## Project Structure

```
app/          page, layout and Route Handlers
components/   header with search, forecast cards and the chart
data/         city list from OpenWeatherMap
hooks/        mobile and scroll detection
store/        Redux store: slices and thunks for location, weather and search
utils/        types, metadata and helpers
```

## Author

Petr Grabovský · [LinkedIn](https://www.linkedin.com/in/petr-grabovsky) · [GitHub](https://github.com/PetrGrabovsky)
