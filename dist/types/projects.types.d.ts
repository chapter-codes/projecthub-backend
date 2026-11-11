export interface CreateProjectDTO {
    name: string;
    status: "planned" | "in-progress" | "completed" | "cancelled";
}
export interface UpdateProjectDTO extends Partial<CreateProjectDTO> {
    id: number;
}
export type DeleteProjectDTO = number;
//# sourceMappingURL=projects.types.d.ts.map