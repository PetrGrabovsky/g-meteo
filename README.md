# Gmeteo - Předpověď počasí na 6 dní

**Gmeteo** je moderní aplikace pro předpověď počasí na 5 dní pro jakékoliv místo na světě. Stačí zadat své město nebo povolit určování polohy a okamžitě se dozvíte, jaké počasí vás čeká.

## Demo

Aplikace je nasazená a dostupná online na následující adrese:

[**Gmeteo - Předpověď počasí**](https://g-meteo-eight.vercel.app)

## Funkce

1.  [x] Získání souřadnic aktuální polohy z geolokace.
2.  [x] Načtení a zobrazení předpovědi počasí z OpenWeatherMap API
3.  [x] Vyhledávání měst a zobrazení předpovědi pro vybrané místo
4.  [x] Zobrazení vývoje teplot pomocí grafu

## Požadavky

- Node.js (verze 16 a vyšší)
- NPM nebo Yarn

## Podporované prohlížeče

Aplikace podporuje poslední verze těchto prohlížečů:

- **Google Chrome**
- **Mozilla Firefox**
- **Microsoft Edge**

## Instalace

1.  Naklonujte tento repozitář:

```bash
git clone https://github.com/PetrGrabovsky/g-meteo.git
```

2.  Přejděte do adresáře projektu:

```bash
cd g-meteo
```

3.  Nainstalujte závislosti:

```bash
npm install
```

## Použití

1.  Spusťte aplikaci:

```bash
npm run dev
```

2.  Otevřete http://localhost:3000 ve vašem prohlížeči.
3.  Vyhledejte město v pravé horní části stránky, nebo nechte aplikaci použít vaši polohu pro zobrazení předpovědi počasí.

## Struktura projektu

```
g-meteo/
├── app/                          # Hlavní složka aplikace obsahující Home a RootLayout stránky
├── components/                   # Složka pro komponenty
├── public/                       # Složka pro statické soubory (ikony, manifest, city.list.json)
├── hooks/                        # Složka pro custom hooky
├── store/                        # Složka pro Redux store
│   ├── slices/                   # Složka obsahující Redux slice soubory pro různé části stavu
│   │   ├── ui-slice.ts           # Slice pro správu stavu uživatelského rozhraní
│   │   ├── city-slice.ts         # Slice pro správu stavu měst a vyhledávání
│   │   ├── geo-slice.ts          # Slice pro správu geografických souřadnic (polohy)
│   │   └── weather-slice.ts      # Slice pro správu stavu předpovědi počasí
│   └── thunks/                   # Redux thunks pro API volání a asynchronní operace
│       ├── fetch-all-cities.ts   # Thunk pro načtení všech dostupných měst
│       ├── fetch-coordinates.ts  # Thunk pro získání geografických souřadnic uživatele
│       ├── fetch-weather-data.ts # Thunk pro načtení dat o počasí na základě souřadnic
│       └── filter-cities.ts      # Thunk pro filtrování měst na základě vstupu uživatele
└── utils/                        # Utility funkce a pomocné soubory pro podporu aplikace
```

## Klíčové technologie

- [x] **Next.js**: React framework pro server-side rendering a statické generování stránek.
- [x] **TypeScript**: Přidává typovou bezpečnost do JavaScriptu.
- [x] **Tailwind CSS**: Moderní CSS framework pro rychlé a efektivní stylování komponent.
- [x] **Redux**: Správa globálního stavu aplikace.
- [x] **Chart.js**: Knihovna pro tvorbu grafů (vizualizace teplot).

## Autor

**Petr Grabovský**
[GitHub](https://github.com/PetrGrabovsky)
