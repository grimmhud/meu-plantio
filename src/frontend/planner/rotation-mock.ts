// Conteúdo ilustrativo versionado. Mapeamento completo: docs/predicao-tres-perguntas.md.
// Não contém resultados de análise nem é persistido no FarmProvider.
export const rotationQuestions = [
  {
    id: "climate",
    title: "How does climate affect this choice?",
    source: "NASA data in planning",
    intro:
      "The season for each stage will be compared with the environmental history of Mogi das Cruzes.",
    input:
      "Example: two sequences, without dates yet. We need to place each crop’s stages on the calendar.",
    sources:
      "NASA POWER: rainfall, temperature and radiation over several years, combined with the calendar, stages and technical crop references. Open-Meteo supports tasks in the next seven days.",
    limit:
      "Local sample: November 1–14, 2025, municipal reference for Mogi. It does not allow a comparison of seasons. This screen does not process that sample. History is not a future forecast; no winning season has been calculated.",
    examples: [
      {
        message:
          "Each vegetable goes through planting, growth and harvest at different times. Let’s check the climate for each stage.",
        action: "Check the dates for each crop.",
        followUp:
          "Review the forecast near the task date and record when it happens.",
      },
      {
        message:
          "A cover crop also occupies part of the year. We need to assess when it starts and ends before returning to vegetables.",
        action: "Check the cover crop species and calendar.",
        followUp:
          "Record when the cover crop is planted and removed to review the next stage.",
      },
    ],
  },
  {
    id: "history",
    title: "Does it fit what I grew before?",
    source: "Bed history + technical references",
    intro:
      "Previous crops help us understand which paths need assessment.",
    input:
      "Example: Lettuce → Carrot → Tomato or Lettuce → Cover crop to be decided → Tomato. These are illustrative candidates, without confirmed previous history.",
    sources:
      "Farmer’s records: crops and dates in the same area, diagnosed problems and varieties where relevant. Embrapa and reviewed profiles: families, hosts and applicable intervals.",
    limit:
      "Changing families alone does not guarantee compatibility. No report does not prove no disease. Technical rules are not integrated yet; no path is approved.",
    examples: [
      {
        message:
          "The example switches from lettuce to carrot and then tomato. Before continuing, we need to check what came before and the bed’s known problems.",
        action: "Check previous crops and dates in My area.",
        followUp:
          "Record the next plantings and review if the history is corrected.",
      },
      {
        message:
          "Adding a cover crop in between does not guarantee the sequence fits the history. The species also needs assessment.",
        action: "Check the history before choosing the cover crop.",
        followUp:
          "Record the species actually planted and the problems assessed in the field.",
      },
    ],
  },
  {
    id: "soil",
    title: "What do the soil conditions allow us to grow next?",
    source: "Local soil + crop requirements",
    intro:
      "Let’s check what we know about the soil before considering the next crop.",
    input:
      "Example of missing information: no local soil test available for this comparison. No pH, nutrients or texture have been filled with fictional values.",
    sources:
      "Local test: date, depth, units and properties relevant to the crop; technical assessment of physical limitations and drainage; reviewed technical requirements. SoilGrids may provide estimated context if valid values are available.",
    limit:
      "SoilGrids returned null values at the queried point. Appearance and reports are not a soil test. SMAP describes regional moisture, not bed fertility. No diagnosis, dose or recovery has been calculated.",
    examples: [
      {
        message:
          "We do not yet know whether the soil meets the needs of carrot and tomato. We need to check local information before suggesting this path.",
        action: "Check My area for a soil test or known limitation.",
        followUp:
          "Save the test reference and review the path after technical assessment.",
      },
      {
        message:
          "A cover crop is an option to assess. Without knowing the soil and management goal, we cannot choose the species or claim it will restore the soil.",
        action: "Check the soil and goal before choosing a cover crop.",
        followUp:
          "With technical support, define what to measure and compare between cycles.",
      },
    ],
  },
] as const;

export type RotationQuestion = (typeof rotationQuestions)[number];

// Tela e áudio utilizam os mesmos campos; não manter um roteiro paralelo.
export function questionNarration(
  question: RotationQuestion,
  selected: number,
) {
  const example = question.examples[selected];
  return `Illustrative example. ${question.title} ${example.message} Next step: ${example.action} Then: ${example.followUp}`;
}
