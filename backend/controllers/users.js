const { CastError, ValidationError } = require('mongoose').Error;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  ERROR_CODE_OK,
  ERROR_CODE_CREATED,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const ConflictError = require('../errors/conflict-err');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthorizedError('Неправильная почта или пароль');
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      throw new UnauthorizedError('Неправильная почта или пароль');
    }
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'signature',
      { expiresIn: '7d' },
    );
    res.send({ token });
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(ERROR_CODE_OK).send(users);
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      throw new NotFoundError('Пользователь по указанному _id не найден');
    } else {
      res.status(ERROR_CODE_OK).send(user);
    }
  } catch (err) {
    if (err instanceof CastError) {
      next(new BadRequestError('Передан некорректныq _id пользователя'));
      return;
    }
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const {
      name,
      about,
      avatar,
      email,
      password,
    } = req.body;
    const hash = await bcrypt.hash(password, 10);
    await User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });
    res.status(ERROR_CODE_CREATED)
      .send({
        name,
        about,
        avatar,
        email,
      });
  } catch (err) {
    if (err.code === 11000) {
      next(new ConflictError('email уже существует'));
      return;
    }
    next(err);
  }
};

const updateUserInfo = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    res.status(ERROR_CODE_OK).send(user);
  } catch (err) {
    if (err instanceof ValidationError) {
      next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      return;
    }
    next(err);
  }
};

const updateUserAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );
    res.status(ERROR_CODE_OK).send(user);
  } catch (err) {
    if (err instanceof ValidationError) {
      next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      return;
    }
    next(err);
  }
};

const findUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new NotFoundError('Нет пользователя с указанным id');
    }
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  getAllUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  findUser,
};
