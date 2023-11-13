import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "common_user",
        required: true,
    }
},
{
    timestamps: true,
}
);

export default mongoose.model('User', UserSchema);
