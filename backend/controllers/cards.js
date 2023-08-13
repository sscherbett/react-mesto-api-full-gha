const { CastError, ValidationError } = require('mongoose').Error;
const Card = require('../models/card');
const {
  ERROR_CODE_OK,
  ERROR_CODE_CREATED,
} = require('../utils/constants');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

const getAllCards = async (req, res, next) => {
  try {
    const card = await Card.find({});
    res.status(ERROR_CODE_OK).send(card);
  } catch (err) {
    next(err);
  }
};

const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });
    res.status(ERROR_CODE_CREATED).send(card);
  } catch (err) {
    if (err instanceof ValidationError) {
      next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      return;
    }
    next(err);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      throw new NotFoundError('Карточка с указанным _id не найдена');
    }

    if (req.user._id === card.owner.toString()) {
      await Card.deleteOne(card);
      res.status(ERROR_CODE_OK).send({
        message: 'Карточка удалена',
      });
    } else {
      throw new ForbiddenError('Отсутствуют права для удаления карточки');
    }
  } catch (err) {
    if (err instanceof CastError) {
      next(new BadRequestError('Передан некорректный _id карточки'));
      return;
    }
    next(err);
  }
};

const putLike = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    );
    if (!card) {
      throw new NotFoundError('Карточка с указанным _id не найдена');
    } else {
      res.status(ERROR_CODE_OK).send(card);
    }
  } catch (err) {
    if (err instanceof CastError) {
      next(new BadRequestError('Передан некорректный _id карточки'));
      return;
    }
    next(err);
  }
};

const removeLike = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      throw new NotFoundError('Карточка с указанным _id не найдена');
    } else {
      res.status(ERROR_CODE_OK).send(card);
    }
  } catch (err) {
    if (err instanceof CastError) {
      next(new BadRequestError('Передан некорректный _id карточки'));
      return;
    }
    next(err);
  }
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  putLike,
  removeLike,
};
