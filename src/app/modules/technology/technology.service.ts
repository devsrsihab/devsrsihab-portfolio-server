import { Technology } from './technology.model';
import { TTechnology } from './technology.interface';

// create recipe
const createTechnologyToDB = async (payload: TTechnology) => {
  const result = await Technology.create(payload);
  return result;
};

// get all recipes
const getAllTechnologyFromDB = async () => {
  const result = await Technology.find();
  return result;
};

// get single recipe
const getSingleTechnologyFromDB = async (id: string) => {
  const result = await Technology.findById(id);
  return result;
};

// update recipe
const updateTechnologyToDB = async (id: string, payload: Partial<TTechnology>) => {
  const result = await Technology.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

// delete recipe
const deleteTechnologyFromDB = async (id: string) => {
  const result = await Technology.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  return result;
};

export const TechnologyServices = {
  deleteTechnologyFromDB,
  createTechnologyToDB,
  getAllTechnologyFromDB,
  getSingleTechnologyFromDB,
  updateTechnologyToDB,
};
