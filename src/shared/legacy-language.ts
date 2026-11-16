/** Read old app-owned labels without changing anything written by the farmer. */
const legacyCrops: Record<string, string> = {
  Alface: "Lettuce",
  Cenoura: "Carrot",
  Tomate: "Tomato",
  Cebola: "Onion",
  "Feijão-vagem": "Green bean",
};

const legacyActions: Record<string, string> = {
  Plantei: "Planted",
  Reguei: "Watered",
  Colhi: "Harvested",
};

const legacyPending: Record<string, string> = {
  "Conferir o canteiro": "Check the bed",
  "Conferir sementes ou mudas": "Check seeds or seedlings",
  "Rever o tempo antes de sair": "Check the weather before heading out",
  "Atualizar a previsão": "Update forecast",
  "Conferir água disponível": "Check available water",
  "Conferir fim do cultivo atual": "Check the end of the current crop",
  "Conferir cultivo atual": "Check the current crop",
};

function translateKnown(value: unknown, labels: Record<string, string>) {
  return typeof value === "string" ? labels[value] ?? value : value;
}

export const readCropLabel = (value: unknown) => translateKnown(value, legacyCrops);
export const readActionLabel = (value: unknown) => translateKnown(value, legacyActions);
export const readPendingLabel = (value: string): string => legacyPending[value] ?? value;

export function readLegacyExampleArea(value: unknown) {
  if (!value || typeof value !== "object" || !("exampleLoadedAt" in value) || !value.exampleLoadedAt)
    return value;
  const farm = value as Record<string, unknown>;
  if (!farm.area || typeof farm.area !== "object") return value;
  const area = farm.area as Record<string, unknown>;
  // Only exact defaults from our opt-in demonstration are app-owned copy.
  return {
    ...farm,
    area: {
      ...area,
      name: area.name === "Canteiro da casa" ? "Home garden bed" : area.name,
      water: area.water === "Rega com mangueira — exemplo" ? "Watering with a hose — example" : area.water,
      soil: area.soil === "Sem análise informada — exemplo" ? "No soil test provided — example" : area.soil,
    },
  };
}
