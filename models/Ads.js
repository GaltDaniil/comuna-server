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
        categorie: {
            type: String,
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
        user: {
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
