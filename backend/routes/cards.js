const cardRouter = require('express').Router();
const {
  getAllCards,
  createCard,
  deleteCard,
  putLike,
  removeLike,
} = require('../controllers/cards');
const { createCardValidation, cardIdValidation } = require('../middlewares/validation');

cardRouter.get('/', getAllCards);
cardRouter.post('/', createCardValidation, createCard);
cardRouter.delete('/:cardId', cardIdValidation, deleteCard);
cardRouter.put('/:cardId/likes', cardIdValidation, putLike);
cardRouter.delete('/:cardId/likes', cardIdValidation, removeLike);
module.exports = cardRouter;
