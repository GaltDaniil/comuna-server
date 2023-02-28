import AdsModel from '../models/Ads.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

export const create = async (req, res) => {
    try {
        const doc = new AdsModel({
            title: req.body.title,
            description: req.body.description,
            categorie: req.body.categorie,
            price: req.body.price,
            imagesUrl: req.body.imagesUrl,
            user: req.userId,
        });

        const ads = await doc.save();
        // создать структуру, наполнить, сохранить, прикрепить id из бд к юзеру в ads (тогда будет поиск)

        res.json(ads);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалость создать карточку товара',
        });
    }
};

export const takeAds = async (req, res) => {
    try {
        const adss = await AdsModel.find();
        console.log(adss);
        /* if (!user) {
            return res.status(404).json({
                massage: 'Пользователь не найден',
            });
        } */

        /* const { password, ...userData } = ads._doc; */

        res.json({
            ...adss,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            massage: 'Нет доступа',
        });
    }
};

export const deleteAds = async (req, res) => {};
export const update = async (req, res) => {};
