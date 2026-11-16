import { z } from "zod";
import { CropSchema } from "./crops";

export const PathIssueSchema = z.object({
  id: z.enum(["climate-window", "soil-nutrients"]),
  source: z.string(),
  title: z.string(),
  message: z.string(),
  limit: z.string(),
  action: z.string(),
  href: z.preprocess(
    (value) => value === "/planejar" ? "/plan" : value === "/minha-area" ? "/my-area" : value,
    z.enum(["/plan", "/my-area"]),
  ),
});
export type PathIssue = z.infer<typeof PathIssueSchema>;

export const PlanPathExampleSchema = z.object({
  kind: z.literal("illustrative-example"),
  revision: z.number().int().min(1).default(1),
  currentCrop: CropSchema,
  nextCrop: CropSchema,
  nextOperation: z.string(),
  nextDate: z.string().nullable(),
  issues: z.array(PathIssueSchema).min(1),
});
export type PlanPathExample = z.infer<typeof PlanPathExampleSchema>;

// On-demand demonstration data. These are not observations or analysis results.
export const planPathExample: PlanPathExample = {
  kind: "illustrative-example",
  revision: 3,
  currentCrop: "Lettuce",
  nextCrop: "Tomato",
  nextOperation: "Transplant seedlings",
  nextDate: null,
  issues: [
    {
      id: "climate-window",
      source: "NASA POWER · simulated example",
      title: "Temperature: review the season",
      message:
        "Example: historical temperature could affect the start of the tomato crop. Compare another season before keeping the date.",
      limit:
        "Simulated. The real NASA sample in this project does not support this conclusion.",
      action: "Review in planning",
      href: "/plan",
    },
    {
      id: "soil-nutrients",
      source: "Soil test · simulated example",
      title: "Low nutrients",
      message:
        "Example: a fictional soil test shows low nutrients for tomato. Check the real test before deciding on management.",
      limit:
        "Without a real test, we do not recommend fertilizer, doses or a different crop.",
      action: "View My area",
      href: "/my-area",
    },
  ],
};
