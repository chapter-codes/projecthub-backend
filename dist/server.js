import express from "express";
import fsP from "node:fs/promises";
const PORT = process.env.PORT || 8000;
const projects = [
    { id: 1, name: "ProjectHub API", status: "in-progress" },
    { id: 2, name: "Portfolio Website", status: "completed" },
];
const app = express();
// middlewares
app.use(express.json()); // parse incoming request body
app.use(async (req, res, next) => {
    try {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
        await fsP.appendFile("server.log", `${new Date().toISOString()} - ${req.method} ${req.url}\n`);
        next();
    }
    catch (err) {
        res.status(500).send("Error writing to log file");
    }
});
app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to ProjectHub API" });
});
app.get("/about", (req, res) => {
    res.status(200).json({
        success: true,
        message: "this is a the official API  for projectHUb. Projecthub lets users collaborate on projects.",
    });
});
app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
});
app.get("/projects", (req, res) => {
    res.status(200).json({ success: true, data: projects });
});
app.get("/projects/:id", (req, res) => {
    const { id } = req.params;
    // handle none-integers for project ids with integers.
    if (!Number.isInteger(Number(id)) || Number(id) <= 0)
        return res
            .status(400)
            .json({
            success: false,
            message: `ID of '${id}' is not valid. Project ID must be an integer greater than 0`,
        });
    //find project
    const project = projects.find((project) => project.id === Number(id));
    if (project)
        return res.status(200).json({ success: true, data: project });
    return res.status(404).json({ sucess: false, message: "invalid project ID" });
});
app.use((_req, res) => {
    res.status(404).json({ success: false, message: "Route not found" });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map