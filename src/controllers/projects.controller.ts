import { type RequestHandler } from "express";
import {
  createNewProject,
  deleteExistingProject,
  getAllProjects,
  UpdateExistingProject,
} from "../service/projects.service.js";

export const getProjectsController: RequestHandler = async (req, res, next) => {
  try {
    const data = await getAllProjects();
    res.status(200).json({ success: true, data: data });
  } catch (error: any) {
    next(error);
  }
};

export const createProjectController: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const { name, status } = req.body;
    const result = await createNewProject({ name, status });
    res.status(201).json({
      sucess: true,
      message: "project created sucessfully",
      data: result[0],
    });
  } catch (err) {
    next(err);
  }
};

export const updateProjectController: RequestHandler = async (
  req,
  res,
  next,
) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: "project 'id' must be type of number",
    });
  }

  try {
    const { name, status } = req.body;
    const result = await UpdateExistingProject({ name, status, id });

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: result[0],
    });
  } catch (err) {
    next(err);
  }
};

export const deleteProjectsController: RequestHandler = async (
  req,
  res,
  next,
) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: "project 'id' must be type of number",
    });
  }

  try {
    const result = await deleteExistingProject(id);
    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
      data: result[0],
    });
  } catch (err) {
    next(err);
  }
};
