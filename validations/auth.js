import { body } from 'express-validator';

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
];

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
];

/* export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
    body('fullName', 'Укажите ваше имя').isLength({ min: 3 }),
    body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
]; */

export const editValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
    body('fullName', 'Укажите ваше имя').isLength({ min: 3 }),
    body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
];

export const adsCreateValidation = [
    body('imagesUrl', 'Добавьте изображение для товара или услуги').isArray({ min: 1 }),
    body('title', 'Введите краткий заголовог').isLength({ min: 5, max: 220 }).isString(),
    body('description', 'Введите подробное описание').isLength({ min: 100, max: 2200 }).isString(),
    body('price', 'укажите цену').isLength({ min: 1, max: 10 }).isNumeric(),
    body('categorie', 'укажите категорию').isLength({ min: 1, max: 10 }).isNumeric(),
];
