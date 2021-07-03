import { model, Schema } from "mongoose";

const doxSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        default: "Hk$hit"
    },
    content: {
        type: String,
        required: true
    },
    creation: {
        type: String
    },
    password: {
        type: String,
        required: false
    },
    visibility: {
        type: Boolean,
        required: false
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    },
    views: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
});

export default model('Dx', doxSchema);