# Meu plantio — presentation site

A standalone, mobile-first presentation for the IAGORA project. The page adds depth beyond the 30-second pitch: the grower persona, predictive planning, voice access, the proposed contextual telephone flow, and intended social and environmental impact.

## Local development

```powershell
npm ci
npm run dev
```

Local URL: http://localhost:3031/

```powershell
npm run typecheck
npm run build
```

Next.js 16.4.6 + TypeScript, with `output: 'export'`. Build output is `out/`. Hosting identity is retained in `.openai/hosting.json`. No server endpoints, personal-data collection, analytics, or app-state persistence are introduced by this presentation.

## Content and behavior

- Persona: an explicitly illustrative small vegetable grower, using Mogi das Cruzes as the project's regional reference. Practical needs include crop/month choice, water/time/budget constraints, and the ability to question, decline or defer a decision.
- Predictive planning: three keyboard-accessible explanation tabs distinguish regional climate history, seven-day weather forecasting, and the proposed whole-rotation comparison engine. Actual app screenshots accompany the explanations. Whole-rotation agronomic simulation and plot-level outcome predictions are identified as work in development.
- Voice: reuses the app's actual ListenButton and narration adapter. Playback starts only after a user action, supports stopping, and exposes browser failures. Transcript is available. Browser voice playback is not guaranteed offline.
- Calling: a dedicated section explains the planned alert → producer request → contextual conversation → confirmation/refusal/deferral → audio summary flow. The sample dialogue is explicitly illustrative. Telephone calls are not available in the current app.
- Pitch: a prominent, dedicated inline video section at `#pitch`, native controls, no autoplay, English narration and a download link. Hero and navigation links scroll to this section. There is no modal.
- Team: the final `#team` section introduces Luís Garcês, Jessica Pereira, Joana Carolina, Ingrid Lorena, Hudson Oliveira and Ane Freitas. Every portrait/name card links to the exact LinkedIn URL supplied by the user in a new tab. Jessica, Joana and Ane use the supplied photos WA0081, WA0082 and WA0083 respectively, with the association corrected explicitly by the user; Luís, Ingrid and Hudson use portraits obtained from their supplied LinkedIn pages. Local copies avoid expiring image URLs. Profile display names were checked; Ane's visible name follows the user's supplied name. No project roles were inferred.
- Impact: goals and measures for water applied, discarded harvest, replanting, local soil condition and producer comprehension. No claimed savings, yield gains or soil recovery results.
- The external app demo is https://agroloop-dev.vercel.app/ . Landing interactions do not modify producer records.

## Shared visual source

`src/shared-ui` contains unchanged snapshots of the real app Brand, Button, ListenButton/useNarration, brand CSS and tokens. `npm run sync:shared` refreshes those files when this directory is inside the NASA-FARM-2026 checkout. The command is optional for standalone builds, which use the checked-in snapshots. Presentation-specific layouts stay in this site's `globals.css`; no new producer-app UI pattern was added.

Crop and garden-bed vectors were rendered from the existing app illustration components. `public/media/home.png`, `rotation.png` and `climate.png` are actual local-app screenshots extracted from the recorded pitch take. Farm records and saved plans shown are samples, identified in the presentation; environmental sources retain their own limits. The seven-day tab's image shows the Home entry point, not a fabricated future weather result.

`public/media/pitch.mp4` is the approved 30-second English V2 pitch, with NASA POWER mentioned in the narration and the official Space Apps event logo. The footer uses the same unmodified 2026 event logo; no NASA endorsement is claimed.

## Evidence

- **3.9 million family farming establishments / 77% of establishments, Brazil, 2017:** [IBGE Censo Agropecuário 2017](https://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/25786-em-11-anos-agricultura-familiar-perde-9-5-dos-estabelecimentos-e-2-2-milhoes-de-postos-de-trabalho). National context, not a count of vegetable growers or the local persona population.
- **26.4% of Brazilian family farmers could not read/write in 2017:** [Ipea analysis, table 7, printed p.269](https://repositorio.ipea.gov.br/bitstream/11058/14052/6/Agricultura%20familiar_Cap6.pdf#page=34), based on IBGE 2017. Historical national statistic; not a current estimate and not applied to all small growers or Mogi specifically.
- **El Niño context:** [INPE technical note, June 2026](https://www.gov.br/inpe/pt-br/assuntos/ultimas-noticias/nota-tecnica-conjunta-aponta-alta-probabilidade-de-el-nino-no-segundo-semestre-de-2026). Effects vary by region and event.
- **Environmental data:** [NASA POWER](https://power.larc.nasa.gov/) regional historical climate 2021–2025 in the existing app and [Open-Meteo](https://open-meteo.com/) seven-day forecasts. Regional history is not a plot sensor, a validated agronomic recommendation, or a deterministic seasonal forecast.
- **Event asset:** [NASA Space Apps brand assets](https://www.spaceappschallenge.org/brand/), unmodified 2026 white/color SVG.

## Verification

TypeScript check and production static build passed. Browser checks at 1440 × 1000 and 375 × 812 confirmed loaded images and no horizontal page overflow after fixing decorative mobile orbits. Mobile navigation opens; the pitch link points to `#pitch`; native video controls are present, paused and autoplay is false. Predictive tabs switch by Enter and left/right arrow keys. Listen toggles its active state and stops; this checks the control behavior, not audible pronunciation quality or comprehension by farmers. The call-status disclosure opens and explains that no telephone call is placed. Main mobile copy is at least 16px and source/meta text generally at least 12px; decorative screenshot text remains part of the original product capture.

No accessibility or agronomic validation with the intended audience has been claimed. Local preview remains available for refinement.
