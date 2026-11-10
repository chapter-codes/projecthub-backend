import {} from "express";
import { pool } from "../lib/db.js";
export const getProjectsController = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM projects ORDER BY id ASC");
        res.status(200).json({ success: true, data: result.rows });
    }
    catch (error) {
        next(error);
    }
};
export const createProjectController = async (req, res, next) => {
    try {
        const { name, status } = req.body;
        const result = await pool.query(`INSERT INTO projects (name, status) 
         VALUES ($1, $2)
         RETURNING id, name, status;`, [name, status]);
        res.status(201).json({
            sucess: true,
            message: "project created sucessfully",
            data: result.rows[0],
        });
    }
    catch (err) {
        next(err);
    }
    // add to db.
    //handle success or failure
    //send response with data
};
export const updateProjectController = async (req, res, next) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(400).json({
            success: false,
            message: "project 'id' must be type of number",
        });
    }
    try {
        const { name, status } = req.body;
        const result = await pool.query(`UPDATE projects
          SET 
            name = COALESCE($1, name),
            status = COALESCE($2, status)
            WHERE id = $3
            RETURNING id, name, status;`, [name ?? null, status ?? null, id]);
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
    }
    catch (err) {
        next(err);
    }
};
export const deleteProjectsController = async (req, res, next) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(400).json({
            success: false,
            message: "project 'id' must be type of number",
        });
    }
    try {
        const result = await pool.query(`DELETE FROM projects WHERE id = $1
          RETURNING id name, status;`, [id]);
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
    }
    catch (err) {
        next(err);
    }
};
//# sourceMappingURL=projects.controller.js.map