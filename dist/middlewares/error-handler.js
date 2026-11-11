import fsP from "node:fs/promises";
export const errorHandler = async (err, req, res, next) => {
    console.error("Application error:", err);
    const status = err.status ?? 500;
    await fsP.appendFile("./error.log", `${new Date().toISOString()} - ${req.method} ${req.url}\n  Error Log: ${err?.message} \n`);
    res.status(500).json({
        success: false,
        message: status == 400 ? "Invalid request body" : "Internal server error",
    });
};
//# sourceMappingURL=error-handler.js.map