import { z } from "zod";
export declare const createProjectSchema: z.ZodObject<{
    name: z.ZodString;
    status: z.ZodDefault<z.ZodEnum<{
        cancelled: "cancelled";
        completed: "completed";
        "in-progress": "in-progress";
        planned: "planned";
    }>>;
}, z.core.$strip>;
export declare const updateProjectSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        cancelled: "cancelled";
        completed: "completed";
        "in-progress": "in-progress";
        planned: "planned";
    }>>;
}, z.core.$strip>;
//# sourceMappingURL=project.schema.d.ts.map