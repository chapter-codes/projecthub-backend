import type { CreateProjectDTO, UpdateProjectDTO } from "../types/projects.types.js";
export declare const findAllProjects: () => Promise<any[]>;
export declare const createProject: ({ name, status }: CreateProjectDTO) => Promise<any[]>;
export declare const updateProject: ({ name, status, id }: UpdateProjectDTO) => Promise<any[]>;
//# sourceMappingURL=projects.repository.d.ts.map