import { z } from "zod";
import { readCropLabel } from "./legacy-language";

export const CropSchema = z.preprocess(readCropLabel, z.enum(["Lettuce", "Carrot", "Tomato"]));
export type Crop = z.infer<typeof CropSchema>;
