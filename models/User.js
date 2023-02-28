import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            default: 'Неизвестный заяц',
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            default: '',
        },
        localPhone: {
            type: String,
            default: '',
        },
        avatar: {
            type: String,
        },
        ads: {
            type: Array,
            default: [],
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('User', UserSchema);
