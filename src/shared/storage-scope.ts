/** Demonstrations never read or write the farmer's normal records. */
export function storageKeys(demoMode = false) {
  const prefix = demoMode ? "agroloop:demo:" : "agroloop:";
  return {
    farm: `${prefix}farm:v1`,
    plan: `${prefix}plan:v1`,
    history: `${prefix}history:v1`,
    forecast: `${prefix}forecast:v1`,
  };
}

export function isDemoEnvironment(
  environment: string | undefined,
  demoMode?: string,
) {
  return environment === "preview" || demoMode === "true";
}
