import express from 'express';
import { SkillController } from './skill.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get('/', SkillController.getAllSkills);
router.post('/', auth(USER_ROLE.admin), SkillController.createSkill);
router.get('/:id', SkillController.getSingleSkill);
router.put('/:id', auth(USER_ROLE.admin), SkillController.updateSkill);
router.delete('/:id', auth(USER_ROLE.admin), SkillController.deleteSkill);

export const SkillRoute = router;
