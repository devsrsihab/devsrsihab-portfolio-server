import express from 'express';
import { ProjectController } from './project.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get('/', ProjectController.getAllProjects);
router.post('/', auth(USER_ROLE.admin), ProjectController.createProject);
router.get('/:id', ProjectController.getSingleProject);
router.put('/:id', auth(USER_ROLE.admin), ProjectController.updateProject);
router.delete('/:id', auth(USER_ROLE.admin), ProjectController.deleteProject);

export const ProjectRoute = router;
