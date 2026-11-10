import express from "express";
import fsP from "node:fs/promises";
import { pool } from "./lib/db.js";
import { errorHandler } from "./middlewares/error-handler.js";


// controllers import
import projectsRoutes from './routes/projects.routes.js'


const PORT = process.env.PORT || 8000;
const app = express();

// middlewares
app.use(express.json()); // parse incoming request body
app.set("json spaces", 2);

// server log
app.use(async (req, res, next) => {
  try {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    await fsP.appendFile(
      "server.log",
      `${new Date().toISOString()} - ${req.method} ${req.url}\n`,
    );
    next();
  } catch (err) {
    res.status(500).json({ success: false, message: "internal server Error" });
  }
});

// api home
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to ProjectHub API" });
});

// api about
app.get("/about", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "this is a the official API  for projectHUb. Projecthub lets users collaborate on projects.",
  });
});

// api health
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

// /api/projects 
app.use("/projects", projectsRoutes );


app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
