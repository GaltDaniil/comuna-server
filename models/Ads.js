import mongoose from 'mongoose';

const AdsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: Number,
            required: true,
        },
        condition: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        },
        imagesUrl: {
            type: Array,
            required: true,
        },
        viewsCount: {
            type: Number,
            default: 0,
        },
        favoriteCount: {
            type: Number,
            default: 0,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        status: {
            type: Number,
            default: 0,
        },
        endDate: {
            type: String,
            default: 0,
        },
        location: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Ads', AdsSchema);
