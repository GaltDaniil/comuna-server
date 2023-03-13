import ChatModel from '../models/Chat.js';
import UserModel from '../models/User.js';

import { validationResult } from 'express-validator';

export const createChat = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const chatIDs = [req.body.sellerId, req.body.userId];

        const doc = new ChatModel({
            usersId: chatIDs,
            messages: [],
        });

        const { _id } = await doc.save();
        const userAds = await UserModel.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { chats: _id } },
        );
        console.log(userAds);

        res.json({
            messages: 'ChatIsCreated',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            massage: 'Не удалось создать чат',
        });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }
        console.log(req.body);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            massage: 'Не удалось отправить сообщение',
        });
    }
};

export const checkActiveChats = async (req, res) => {
    try {
        const myChats = await ChatModel.find({
            _id: { $in: req.body.chatsId },
        });
        console.log(myChats);
        const alreadyChating = myChats.filter((el) => el.usersId === req.body.sellerId);
        console.log(alreadyChating === []);

        if (alreadyChating) {
            res.json(true);
        } else {
            res.json(false);
        }

        /* if (!user) {
            return res.status(404).json({
                massage: 'Пользователь не найден',
            });
        } */

        /* const { password, ...userData } = ads._doc; */

        /* res.json([...myChats]); */
    } catch (error) {
        console.log(error);
        res.status(500).json({
            massage: 'Ошибка при поиске активных чатов',
        });
    }
};

export const getMyChats = async (req, res) => {
    try {
        console.log(req.body.chatId);

        const myChats = await ChatModel.find({
            _id: { $in: req.body.chatId },
        });
        console.log(myChats);

        /* if (!user) {
            return res.status(404).json({
                massage: 'Пользователь не найден',
            });
        } */

        /* const { password, ...userData } = ads._doc; */

        /* res.json([...myChats]); */
        res.json([...myChats]);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            massage: 'Нет доступа',
        });
    }
};
