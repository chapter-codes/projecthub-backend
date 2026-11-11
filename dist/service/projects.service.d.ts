import type { CreateProjectDTO, DeleteProjectDTO, UpdateProjectDTO } from "../types/projects.types.js";
export declare const getAllProjects: () => Promise<any[]>;
export declare const createNewProject: (data: CreateProjectDTO) => Promise<any[]>;
export declare const UpdateExistingProject: (data: UpdateProjectDTO) => Promise<any[]>;
export declare const deleteExistingProject: (id: DeleteProjectDTO) => Promise<any[]>;
//# sourceMappingURL=projects.service.d.ts.map