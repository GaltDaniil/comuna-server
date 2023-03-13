import AdsModel from '../models/Ads.js';
import UserModel from '../models/User.js';
// прикреплять ли ID объявлений за юзером? Ускорит ли это поиск?

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

export const createAds = async (req, res) => {
    try {
        const doc = new AdsModel({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            condition: req.body.condition,
            price: req.body.price,
            imagesUrl: req.body.imagesUrl,
            userId: req.body.userId,
            endDate: req.body.endDate,
            currency: req.body.currency,
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

export const getOneAd = async (req, res) => {
    try {
        const ad = await AdsModel.findById(req.body.id);

        res.status(200).json(ad);
    } catch (error) {
        console.log(error);
    }
};

export const getAllAds = async (req, res) => {
    try {
        const adss = await AdsModel.find();
        console.log(adss);
        /* if (!user) {
            return res.status(404).json({
                massage: 'Пользователь не найден',
            });
        } */

        /* const { password, ...userData } = ads._doc; */

        res.json([...adss]);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            massage: 'Нет доступа',
        });
    }
};

export const getUserAds = async (req, res) => {
    try {
        console.log(req.body);
        const userAds = await AdsModel.find({ userId: req.body._id });
        console.log(userAds);
        if (!userAds) {
            console.log('Не найдено ни одного объявления');
            return res.status(400).json({
                message: 'У данного пользователя нет объявлений',
            });
        }

        res.json([...userAds]);
    } catch (error) {
        console.log(req.body);
        console.log(error);
        res.status(500).json({
            massage: 'Нет объявлений',
        });
    }
};

export const deleteAds = async (req, res) => {};

export const acceptAd = async (req, res) => {
    try {
        const adId = req.body._id;
        console.log(adId);
        const ad = await AdsModel.findOneAndUpdate({ _id: adId }, { $set: { status: 1 } });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            massage: 'Не удалось принять объявление',
        });
    }
};
export const declineAd = async (req, res) => {
    try {
        const adId = req.body._id;
        const adStatus = req.body.status;
        const ad = await AdsModel.findOneAndUpdate({ _id: adId }, { $set: { status: adStatus } });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            massage: 'Не удалось отклонить объявление',
        });
    }
};
