import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema(
    {
        usersId: {
            type: Array,
            default: [],
        },
        messages: {
            type: Object,
            /* messageId: {
                type: String,
            },
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            content: {
                tupe: String,
            }, */
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Chats', ChatSchema);
