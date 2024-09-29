# Gmeteo - Předpověď počasí na 6 dní

**Gmeteo** je moderní aplikace pro předpověď počasí na 6 dní pro jakékoliv místo na světě. S aplikací Gmeteo můžete snadno zjistit aktuální i budoucí počasí a sledovat vývoj teplot pomocí přehledného grafu.

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
├── app/   							# Hlavní složka se stránkou Home a RootLayoutem
├── components/   					# Složka pro komponenty
├── public/     					# Složka pro statické soubory (ikony, manifest, city.list.json)
├── store/							# Redux store složka
│   ├── slices/  					# Redux slice soubory pro jednotlivé části stavu
│   │   ├── city-slice.ts			# Slice pro správu stavu měst a vyhledávání
│   │   ├── geo-slice.ts			# Slice pro správu geografických souřadnic
│   │   └── weather-slice.ts		# Slice pro správu stavu předpovědi počasí
│   └── thunks/ 					# Redux thunks pro API volání a filtrovávní měst
└── utils/                    		# Utility funkce a pomocné soubory
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
