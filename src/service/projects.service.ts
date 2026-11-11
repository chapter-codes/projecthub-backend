import {
  createProject,
  deleteProject,
  findAllProjects,
  updateProject,
} from "../repositories/projects.repository.js";
import type {
  CreateProjectDTO,
  DeleteProjectDTO,
  UpdateProjectDTO,
} from "../types/projects.types.js";

export const getAllProjects = async () => {
  return await findAllProjects();
};
export const createNewProject = async (data: CreateProjectDTO) => {
  return await createProject({ ...data });
};

export const UpdateExistingProject = async (data: UpdateProjectDTO) => {
  return await updateProject({ ...data });
};

export const deleteExistingProject = async (id: DeleteProjectDTO) => {
  return await deleteProject(id);
};