import UserModel from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

export const me = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                massage: 'Пользователь не найден',
            });
        }

        const { password, ...userData } = user._doc;

        res.json({
            ...userData,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            massage: 'Нет доступа',
        });
    }
};

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({
            email: req.body.email,
        });

        if (!user) {
            console.log(req.body);
            console.log('Нет пользователя');
            return res.status(400).json({
                message: 'Не найден такой пользователь',
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.password);
        if (!isValidPass) {
            return res.status(404).json({
                massage: 'Не верный логин или пароль',
            });
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '30d',
            },
        );

        const { password, ...userData } = user._doc;

        res.json({
            ...userData,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            massage: 'Не удалось авторизоваться',
        });
    }
};

export const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const userPassword = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(userPassword, salt);

        const doc = new UserModel({
            email: req.body.email,
            password: hash,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
        });

        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '30d',
            },
        );

        const { password, ...userData } = user._doc;

        res.json({
            ...userData,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            massage: 'Не удалось зарегистрироваться',
        });
    }
};
