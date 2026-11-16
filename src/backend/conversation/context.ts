import "server-only";
import { PlanSchema } from "@/shared/planning";
// The future telephone adapter consumes the same confirmed context as the screen.
// It must revalidate forecast freshness and obtain explicit call authorization.
export function prepareConversation(input: unknown) {
  const plan = PlanSchema.parse(input);
  return {
    version: 1,
    areaId: plan.areaId,
    planId: plan.id,
    crop: plan.crop,
    operation: plan.operation,
    intendedDate: plan.date,
    forecast: {
      id: plan.forecastId,
      fetchedAt: plan.forecastFetchedAt,
      expiresAt: plan.forecastExpiresAt,
      day: plan.day,
    },
    pending: plan.pending,
    decision: "intention",
    callAvailable: false,
  };
}
