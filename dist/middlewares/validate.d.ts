import type { RequestHandler } from "express";
import { z } from "zod";
interface ValidateBodyProps {
    schema: z.ZodType;
}
export declare const validateBody: ({ schema }: ValidateBodyProps) => RequestHandler;
export {};
//# sourceMappingURL=validate.d.ts.map