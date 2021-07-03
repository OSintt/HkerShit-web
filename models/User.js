import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    doxes: {
        ref: "Dx",
        type: Array
    }
})

userSchema.methods.encriptarPwd = async (password) => {
    const salts = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salts);
}

export default model('User', userSchema);