# Meu plantio 🌱

**Bringing Earth data closer to the people who grow our food.**

A conceptual project created by team **IAGORA** during the remote **[NASA Space Apps Challenge 2026](https://www.spaceappschallenge.org/2026/challenges/field-shift-adapting-farms-with-nasa-data/)** hackathon to present an accessible approach to vegetable crop rotation planning. Meu plantio aims to support small vegetable growers by connecting environmental information, plot history and farmer choices through illustrations and audio.

This repository brings together the **landing page and application** in a single Next.js project. The interface and pitch are in English. The demonstration combines implemented features and illustrative scenarios; it is not a validated agronomic solution or an official NASA product.

![Meu plantio](public/media/pitch-poster.png)

## Explore the project

**Online:** [Presentation](https://meu-plantio-one.vercel.app/) · [Application](https://meu-plantio-one.vercel.app/app) · [Pitch](https://meu-plantio-one.vercel.app/#pitch)

| Path | Content |
| --- | --- |
| `/` | Landing page: problem, persona, proposal, data, voice and impact |
| `/#pitch` | 30-second pitch with English narration |
| `/#team` | Team IAGORA and LinkedIn profiles |
| `/app` | Application home |
| `/plan` | Plan crop rotation |
| `/my-plan` | My plan |
| `/notices` | Alerts and conversations |
| `/my-area` | My area and history |
| `/design-system` | Development catalog using the actual components |

The **Explore the demo** button opens `/app` on the same domain. The application's Home links and PWA launch URL also point to `/app`. Other screens keep the paths listed above.

The public repository is linked in the top menu (including on mobile), through the **View on GitHub** button next to **Explore the demo**, and in the footer. These links open in a new tab.

## Why it exists

Planning the next crop involves weather, water, plot history, time and budget. This information often comes from separate sources. Changes in rainfall and temperature patterns, including regional effects of El Niño, increase the need to review decisions.

The proposal considers barriers to reading and accessing information. Images, plain language and audio help make decisions understandable. Farmers remain in control: they can confirm, correct, decline or postpone.

## Implementation and limitations

| Feature | Status |
| --- | --- |
| Landing page | Responsive, with pitch, sources, team and access to the app |
| Planning and monitoring | Screens connected through `FarmProvider`, keeping the current crop separate from the next crop |
| Records and choices | Stored locally in the browser, without server synchronization |
| Climate history | Regional NASA POWER data for 2021–2025; neither a plot sensor nor a seasonal forecast |
| Seven-day forecast | Open-Meteo, with source, timestamp and validity; depends on the external service |
| Voice | User-triggered browser speech synthesis; voices and availability depend on the device |
| Full rotation prediction | Core vision under development; agronomic comparisons and local outcomes require validation |
| Contextual phone call | Proposed flow: alert → request → conversation → confirmation → audio summary. Telephony is not yet available |
| PWA installation | Manifest and icons prepared; full offline access is not yet implemented |

Waste reduction, water savings, productivity and soil recovery are **goals to measure**, not proven results. Screenshots and the demonstration may contain sample records and plans, labeled in the interface.

## Run locally

Requirements: **Node.js 22** recommended (minimum 20.9) and npm.

```bash
git clone https://github.com/grimmhud/meu-plantio.git
cd meu-plantio
npm ci
npm run dev
```

Presentation: **http://localhost:3018/**. Application: **http://localhost:3018/app**.

No API key is required for the current public data sources. To start with the demonstration examples populated, create `.env.local` and restart the server:

```dotenv
DEMO_MODE=true
```

Demo mode uses separate storage (`agroloop:demo:*`), preserving normal records (`agroloop:*`). Vercel previews also enable this mode. Without this setting, development and production use normal mode.

```bash
npm test
npm run typecheck
npm run build
npm start
```

The local production server also uses port 3018. Run only one server at a time on that port.

## Structure

```text
src/app/(presentation)/  Landing page and its layouts
src/app/(producer)/      App screens, layouts and FarmProvider
src/app/api/             Weather and conversation endpoints
src/app/manifest.ts      PWA installation, starting at /app
src/presentation/        Landing content, styles and components
src/frontend/            Farmer interface and state
src/backend/             Integrations and server logic
src/shared/              Shared contracts and rules
public/media/            Pitch, screenshots and illustrations
public/team/             Team member photos
public/brands/           Product branding and event identity
data/nasa/               Data series and provenance records
docs/                    Product, evidence and decisions
tests/                   Checks for implemented rules
```

Route groups in parentheses do not appear in URLs. Separate root layouts preserve each experience's styles and state. Navigating between the landing page and the app reloads the page; farmer choices remain in local storage.

## Deploy to Vercel

Import **grimmhud/meu-plantio**, select **Next.js**, use the repository root directory and Node.js 22. Build command: `npm run build`. Keep the default Next.js output settings.

This project includes server endpoints: **do not use static export**. The landing page and app deploy together, without depending on the old URL. Set `DEMO_MODE=true` in Production to populate examples for the event presentation.

The current deployment was made through the authenticated CLI in the `meu-plantio` project under the `hudson-oliveiras-projects` team. Automatic GitHub deployment is not yet enabled: new pushes do not deploy automatically. To update manually with access to the team:

```bash
npx vercel link --project meu-plantio --scope hudson-oliveiras-projects
npx vercel deploy --prod --scope hudson-oliveiras-projects
```

## Evidence and sources

- [IBGE — 2017 Agricultural Census](https://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/25786-em-11-anos-agricultura-familiar-perde-9-5-dos-estabelecimentos-e-2-2-milhoes-de-postos-de-trabalho): approximately 3.9 million family farming establishments, representing 77% of Brazilian establishments in 2017. Historical national context, not a local count of vegetable growers.
- [Ipea — chapter 6, table 7, p. 269](https://repositorio.ipea.gov.br/bitstream/11058/14052/6/Agricultura%20familiar_Cap6.pdf#page=34): 26.4% of family farmers could not read or write, based on 2017 data. This is neither a current estimate nor a percentage specific to Mogi das Cruzes.
- [NASA POWER](https://power.larc.nasa.gov/): regional temperature, rainfall and radiation history. Provenance records in `data/nasa/`.
- [Open-Meteo](https://open-meteo.com/): seven-day weather forecast, separate from NASA historical data.
- [INPE — El Niño in 2026](https://www.gov.br/inpe/pt-br/assuntos/ultimas-noticias/nota-tecnica-conjunta-aponta-alta-probabilidade-de-el-nino-no-segundo-semestre-de-2026): effects depend on the region and event.
- [NASA Space Apps — brand assets](https://www.spaceappschallenge.org/brand/): official event identity. Participation and use of data do not imply NASA endorsement of the product.

## Team IAGORA

| Member | LinkedIn |
| --- | --- |
| Hudson Oliveira | [grimmhud](https://www.linkedin.com/in/grimmhud/?locale=en) |
| Joana Carolina | [joanacarol](https://www.linkedin.com/in/joanacarol/) |
| Ane Freitas | [anefreitas](https://www.linkedin.com/in/anefreitas/) |
| Jessica Pereira | [jessiepsx](https://www.linkedin.com/in/jessiepsx/) |
| Luís Garcês | [luisgarces2005](https://www.linkedin.com/in/luisgarces2005/) |
| Ingrid Lorena | [ingrid-lorena](https://www.linkedin.com/in/ingrid-lorena/) |

## Documentation and license

- [Product definition](docs/product-definition.md): frozen local reference; includes future capabilities.
- [Content and current decisions](docs/content.md).
- [Design system](docs/design-system.md).
- [Continuity and shared state](docs/continuidade.md).
- [Audio and limitations](docs/audio.md).
- [Landing page origin notes](docs/presentation.md): record from before integration into this repository.

Code is licensed under the [Apache License 2.0](LICENSE), preserving the existing license. Third-party photos and trademarks remain subject to their respective owners' rights; the code license does not grant rights to those materials.
