import mongoose, { mongo } from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    user: {
        // here in user there will be user id who created task/
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // in ref ye jo id hai wo kiski hogi , in this case it is of "User" , make sure ref will be of collection.
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Task = mongoose.model("Task", schema);
