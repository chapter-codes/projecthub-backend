import type { CreateProjectDTO, DeleteProjectDTO, UpdateProjectDTO } from "../types/projects.types.js";
export declare const findAllProjects: () => Promise<any[]>;
export declare const createProject: ({ name, status }: CreateProjectDTO) => Promise<any[]>;
export declare const updateProject: ({ name, status, id }: UpdateProjectDTO) => Promise<any[]>;
export declare const deleteProject: (id: DeleteProjectDTO) => Promise<any[]>;
//# sourceMappingURL=projects.repository.d.ts.map