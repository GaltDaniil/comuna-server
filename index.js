import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import cors from 'cors';

import { validationResult } from 'express-validator';
import { registerValidation, loginValidation, adsCreateValidation } from './validations/auth.js';
import chechToken from './utils/checkAuth.js';

import * as UserController from './controllers/UserController.js';
import * as AdsController from './controllers/AdsController.js';
import * as ChatController from './controllers/ChatController.js';
import { categories } from './date/categories.js';

mongoose.set('strictQuery', false);

mongoose
    .connect(
        'mongodb+srv://Daniilgalt:9293709Bb13@comuna.jr29kuu.mongodb.net/users?retryWrites=true&w=majority',
    )
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

// Логика для чтения Экспреса json файлов
app.use(express.json());
app.use(cors());

app.get('/auth/me', chechToken, UserController.me);
app.get('/categories', (req, res) => {
    res.json(categories);
});
app.post('/auth/login', loginValidation, UserController.login);
app.post('/auth/register', registerValidation, UserController.register);
app.post('/user/setting', registerValidation, UserController.register);
app.post('/users/seller', UserController.isSeller);

app.post('/chats/my', ChatController.getMyChats);
app.post('/chats/check', ChatController.checkActiveChats);
app.patch('/chats', ChatController.sendMessage);
app.put('/chats', ChatController.createChat);

app.get('/ads', adsCreateValidation, AdsController.getAllAds);
app.post('/ads/user', adsCreateValidation, AdsController.getUserAds);
app.post('/ads', adsCreateValidation, AdsController.createAds);
app.post('/ads/id', AdsController.getOneAd);
app.delete('/ads', AdsController.deleteAds);
app.put('/ads/ok', AdsController.acceptAd);
app.put('/ads/decline', AdsController.declineAd);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// Чтобы сервер слушал определенный порт
app.listen(8080, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server OK');
});
