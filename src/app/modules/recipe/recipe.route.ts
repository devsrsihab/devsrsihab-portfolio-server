import express from 'express';
import { RecipeController } from './recipe.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post('/', auth(USER_ROLE.user, USER_ROLE.admin), RecipeController.createRecipe);

// get all recipe base user
router.get('/', auth(USER_ROLE.user, USER_ROLE.admin), RecipeController.getAllRecipes);

// recipe feeds
router.get('/feeds', RecipeController.getRecipeFeeds);

router.get('/:id', auth(USER_ROLE.user, USER_ROLE.admin), RecipeController.getSingleRecipe);

router.put('/:id', auth(USER_ROLE.user, USER_ROLE.admin), RecipeController.updateRecipe);
router.delete('/:id', auth(USER_ROLE.user, USER_ROLE.admin), RecipeController.deleteRecipe);
router.post('/:id/upvote', auth(USER_ROLE.user, USER_ROLE.admin), RecipeController.upvoteRecipe);
router.post(
  '/:id/downvote',
  auth(USER_ROLE.user, USER_ROLE.admin),
  RecipeController.downvoteRecipe,
);

// user recipes route recipe
router.get('/user/:id', auth(USER_ROLE.user, USER_ROLE.admin), RecipeController.getUserRecipes);

export const RecipeRoute = router;
