// middlewares/customerValidator.js
import { body, validationResult } from 'express-validator';
import {codeStatus} from '../config/codeStatus'

export const validateCustomer = [
  
  body('name')
    .isString().withMessage('Name debe ser texto')
    .notEmpty().withMessage('Name es obligatorio'),

  body('age')
    .isInt({ min: 0 }).withMessage('Age debe ser un número entero no negativo'),

  body('email')
    .isEmail().withMessage('Email debe ser válido'),

  body('active')
    .isBoolean().withMessage('Active debe ser booleano'),
];

export const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(codeStatus.BAD_REQUEST).json({ errors: errors.array() });
  }
  next()
};
