import type { ErrorRequestHandler } from "express";
import fsP from "node:fs/promises";

export const errorHandler: ErrorRequestHandler = async (
  err,
  _req,
  res,
  next,
) => {
  console.error("Application error:", err);
  const status = err.status ?? 500;
  res.status(500).json({
    success: false,
    message: status == 400 ? "Invalid request body" : "Internal server error",
  });
};
