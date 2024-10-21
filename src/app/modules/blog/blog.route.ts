import express from 'express';
import { BlogController } from './blog.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get('/', BlogController.getAllBlogs);
router.post('/', auth(USER_ROLE.admin), BlogController.createBlog);
router.get('/:id', BlogController.getSingleBlog);
router.put('/:id', auth(USER_ROLE.admin), BlogController.updateBlog);
router.delete('/:id', auth(USER_ROLE.admin), BlogController.deleteBlog);

export const BlogRoute = router;
