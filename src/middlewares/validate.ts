import type { RequestHandler } from "express";
import { success, z } from "zod";

interface ValidateBodyProps {
  schema: z.ZodType;
}
export const validateBody = ({ schema }: ValidateBodyProps): RequestHandler => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    req.body = result.data;
    next();
  };
};
