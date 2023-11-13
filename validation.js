import { body } from "express-validator";

export const loginValidation = [
    body('email', 'пошта').isEmail(),
    body('password', 'пароль').isLength({ min: 5 }),
];

export const registerValidation = [
    body('email', 'пошта').isEmail(),
    body('password', 'пароль').isLength({ min: 5 }),
    body('fullName', 'імені').isLength({ min: 3 }),
];

export const tenderCreateValidation = [
    body('title', 'Введіть заголовок тендера').isLength({ min: 3 }).isString(),
    body('text', 'Введіть текст тендера').isLength({ min: 10 }).isString(),
    body('price', 'Введіть ціну закупівлі').isLength({min: 1}).isInt(),
    body('unifiedStateRegister', 'Введіть ЄДРПОУ').isLength({min: 8}).isInt,
    body('legalEntity', 'Введіть юридичну особу').isLength({min: 10}).isString(),
];