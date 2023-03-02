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

mongoose.set('strictQuery', false);

mongoose
    .connect(
        'mongodb+srv://Daniilgalt:9293709Bb13@comuna.jr29kuu.mongodb.net/users?retryWrites=true&w=majority',
    )
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

// Логика для чтения Экспреса json файлов
app.use(express.json());
app.use(cors());

app.get('/auth/me', chechToken, UserController.me);
app.post('/auth/login', loginValidation, UserController.login);
app.post('/auth/register', registerValidation, UserController.register);
app.post('/user/setting', registerValidation, UserController.register);

app.get('/ads', adsCreateValidation, AdsController.takeAds);
app.post('/ads', adsCreateValidation, AdsController.create);
app.delete('/ads', AdsController.deleteAds);
app.patch('/ads', adsCreateValidation, AdsController.update);

// Чтобы сервер слушал определенный порт
app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server OK');
});
