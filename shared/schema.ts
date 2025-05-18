
import { z } from "zod";

export const insertFileSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  subject: z.string(),
  grade: z.string(),
  semester: z.string(),
  filename: z.string(),
  filepath: z.string(),
  filetype: z.string(),
  filesize: z.number()
});

export type FileWithRefs = z.infer<typeof insertFileSchema>;
