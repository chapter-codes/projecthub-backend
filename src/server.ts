import express from "express";
import fsP from "node:fs/promises";
import { pool } from "./lib/db.js";
import { errorHandler } from "./middlewares/error-handler.js";
import { validateBody } from "./middlewares/validate.js";
import {
  createProjectSchema,
  updateProjectSchema,
} from "./schemas/project.schema.js";
import { number } from "zod";

const PORT = process.env.PORT || 8000;

const projects = [
  { id: 1, name: "ProjectHub API", status: "in-progress" },
  { id: 2, name: "Portfolio Website", status: "completed" },
];

const app = express();

// middlewares
app.use(express.json()); // parse incoming request body
app.set("json spaces", 2);

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

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to ProjectHub API" });
});
app.get("/about", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "this is a the official API  for projectHUb. Projecthub lets users collaborate on projects.",
  });
});

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/projects", async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM projects ORDER BY id ASC");
    res.status(200).json({ success: true, data: result.rows });
  } catch (error: any) {
    next(error);
    // const errorMessage = "Server Error: " + error?.message;

    // await fsP.appendFile(
    //   "error.log",
    //   `${new Date().toISOString()} - ${req.method} ${req.url}\n  ${errorMessage} \n`,
    // );
  }
});

app.post(
  "/projects/",
  validateBody({ schema: createProjectSchema }),
  async (req, res, next) => {
    try {
      const { name, status } = req.body;
      const result = await pool.query(
        `INSERT INTO projects (name, status) 
         VALUES ($1, $2)
         RETURNING id, name, status;`,
        [name, status],
      );
      res.status(201).json({
        sucess: true,
        message: "project created sucessfully",
        data: result.rows[0],
      });
    } catch (err) {
      next(err);
    }
    // add to db.
    //handle success or failure
    //send response with data
  },
);
app.patch(
  "/projects/:id",
  validateBody({ schema: updateProjectSchema }),
  async (req, res, next) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({
        success: false,
        message: "project 'id' must be type of number",
      });
    }

    try {
      const { name, status } = req.body;
      const result = await pool.query(
        `UPDATE projects
          SET 
            name = COALESCE($1, name),
            status = COALESCE($2, status)
            WHERE id = $3
            RETURNING id, name, status;`,
        [name ?? null, status ?? null, id],
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Project updated successfully",
        data: result.rows[0],
      });
    } catch (err) {
      next(err);
    }
  },
);
app.delete(
  "/projects/:id",
  async (req, res, next) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({
        success: false,
        message: "project 'id' must be type of number",
      });
    }

    try {
      const result = await pool.query(
        `DELETE FROM projects WHERE id = $1
          RETURNING id name, status;`,
        [id],
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Project deleted successfully",
        data: result.rows[0],
      });
    } catch (err) {
      next(err);
    }
  },
);

app.get("/projects/:id", (req, res) => {
  const { id } = req.params;

  // handle none-integers for project ids with integers.
  if (!Number.isInteger(Number(id)) || Number(id) <= 0)
    return res.status(400).json({
      success: false,
      message: `ID of '${id}' is not valid. Project ID must be an integer greater than 0`,
    });

  //find project
  const project = projects.find((project) => project.id === Number(id));

  if (project) return res.status(200).json({ success: true, data: project });
  return res.status(404).json({ sucess: false, message: "invalid project ID" });
});

app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
