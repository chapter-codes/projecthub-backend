import { z } from "zod";
export const createProjectSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Project name must be at least 3 characters")
        .max(150, "Project name cannot exceed 150 characters"),
    status: z
        .enum(["planned", "in-progress", "completed", "cancelled"])
        .default("planned"),
});
export const updateProjectSchema = z
    .object({
    name: z.string().trim().min(3).max(150).optional(),
    status: z.enum(["planned", "in-progress", "completed", "cancelled"]).optional(),
})
    .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
});
//# sourceMappingURL=project.schema.js.map