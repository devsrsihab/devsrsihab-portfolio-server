import { Project } from './project.model';
import { TProject } from './project.interface';

// create project
const createProjectToDB = async (payload: TProject) => {
  const result = await Project.create(payload);
  return result;
};

// get all projects
const getAllProjectFromDB = async () => {
  const result = await Project.find().populate('technologies', 'name image');
  return result;
};

// get single project
const getSingleProjectFromDB = async (id: string) => {
  const result = await Project.findById(id).populate('technologies', 'name image');
  return result;
};

// update project
const updateProjectToDB = async (id: string, payload: Partial<TProject>) => {
  const result = await Project.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

// delete project
const deleteProjectFromDB = async (id: string) => {
  const result = await Project.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  return result;
};

export const ProjectServices = {
  deleteProjectFromDB,
  createProjectToDB,
  getAllProjectFromDB,
  getSingleProjectFromDB,
  updateProjectToDB,
};
