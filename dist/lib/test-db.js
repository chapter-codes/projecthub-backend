import { pool } from "./db.js";
async function connect() {
    try {
        // const response = await pool.connect();
        const response = await pool.query("SELECT current_database(), NOW();");
        console.log("succes", response.rows);
    }
    catch (error) {
        console.log("error", error);
        process.exitCode = 1;
    }
    finally {
        pool.end();
    }
}
connect();
//# sourceMappingURL=test-db.js.map