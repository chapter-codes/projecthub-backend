import { pool } from "../lib/db.js";
export const findAllProjects = async () => {
    const query = `SELECT * FROM projects ORDER BY id ASC`;
    const result = await pool.query(query);
    return result.rows;
};
export const createProject = async ({ name, status }) => {
    const query = `
        INSERT INTO projects (name, status) 
         VALUES ($1, $2)
         RETURNING id, name, status;`;
    const result = await pool.query(query, [name, status]);
    return result.rows;
};
export const updateProject = async ({ name, status, id }) => {
    const query = `
        UPDATE projects
          SET 
            name = COALESCE($1, name),
            status = COALESCE($2, status)
            WHERE id = $3
            RETURNING id, name, status;`;
    const result = await pool.query(query, [name ?? null, status ?? null, id]);
    return result.rows;
};
export const deleteProject = async (id) => {
    const query = `
    DELETE FROM projects WHERE id = $1
          RETURNING id, name, status;`;
    const result = await pool.query(query, [id]);
    return result.rows;
};
//# sourceMappingURL=projects.repository.js.map