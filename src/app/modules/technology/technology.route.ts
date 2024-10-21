import express from 'express';
import { TechnologyController } from './technology.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post('/', auth(USER_ROLE.admin), TechnologyController.createTechnology);
router.put('/:id', auth(USER_ROLE.admin), TechnologyController.updateTechnology);
router.get('/', TechnologyController.getAllTechnologies);
router.get('/:id', TechnologyController.getSingleTechnology);
router.delete('/:id', auth(USER_ROLE.admin), TechnologyController.deleteTechnology);

export const TechnologyRoute = router;
