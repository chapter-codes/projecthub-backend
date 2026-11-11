import { createProject, deleteProject, findAllProjects, updateProject, } from "../repositories/projects.repository.js";
export const getAllProjects = async () => {
    return await findAllProjects();
};
export const createNewProject = async (data) => {
    return await createProject({ ...data });
};
export const UpdateExistingProject = async (data) => {
    return await updateProject({ ...data });
};
export const deleteExistingProject = async (id) => {
    return await deleteProject(id);
};
//# sourceMappingURL=projects.service.js.map