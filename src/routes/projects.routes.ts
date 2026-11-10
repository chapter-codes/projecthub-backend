import { Router } from "express";
import { createProjectController, deleteProjectsController, getProjectsController, updateProjectController } from "../controllers/projects.controller.js";
import { validateBody } from "../middlewares/validate.js";
import { createProjectSchema, updateProjectSchema } from "../schemas/project.schema.js";




const router = Router()

router.get('/', getProjectsController)
router.post('/', validateBody({schema:createProjectSchema}), createProjectController)
router.patch('/:id', validateBody({schema:updateProjectSchema}), updateProjectController)
router.delete("/:id", deleteProjectsController);


export default router