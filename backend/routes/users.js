const userRouter = require('express').Router();
const {
  getAllUsers,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
  findUser,
} = require('../controllers/users');
const { getUserByIdValidation, updateUserInfoValidation, updateUserAvatarValidation } = require('../middlewares/validation');

userRouter.get('/', getAllUsers);
userRouter.get('/me', findUser);
userRouter.get('/:userId', getUserByIdValidation, getUserById);
userRouter.patch('/me', updateUserInfoValidation, updateUserInfo);
userRouter.patch('/me/avatar', updateUserAvatarValidation, updateUserAvatar);

module.exports = userRouter;
