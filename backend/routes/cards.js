const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', celebrate({
  headers: Joi.object().keys({
  }).unknown(true),
}), getCards);

router.post('/', celebrate({
  headers: Joi.object().keys({
  }).unknown(true),
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri({ scheme: ['http', 'https'] }),
    likes: Joi.array().items(Joi.string()),
  }),
}), createCard);

router.delete('/:cardId', celebrate({
  headers: Joi.object().keys({
  }).unknown(true),
  params: Joi.object().keys({
    cardId: Joi.hex().length(24),
  }),
}), deleteCard);

router.put('/:cardId/likes', celebrate({
  headers: Joi.object().keys({
  }).unknown(true),
  params: Joi.object().keys({
    cardId: Joi.hex().length(24),
  }),
}), likeCard);

router.delete('/:cardId/likes', dislikeCard, celebrate({
  headers: Joi.object().keys({
  }).unknown(true),
  params: Joi.object().keys({
    cardId: Joi.hex().length(24),
  }),
}), dislikeCard);

module.exports = router;
