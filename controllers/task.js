import { ErrorHandler } from "../middlewares/error.js";
import { Task } from "../model/task.js";

export const newTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        await Task.create({
            title,
            description,
            user: req.user,
        });
        // alternative of this create is :
        // const task = new Task({title,description,user:req.user});
        // await task.save();

        res.status(201).json({
            success: true,
            message: "Task added Successfully",
        });
    } catch (error) {
        next(error);
    }
};

export const getMyTask = async (req, res, next) => {
    try {
        const userid = req.user._id;

        const tasks = await Task.find({ user: userid });

        res.status(200).json({
            success: true,
            tasks,
        });
    } catch (error) {
        next(error);
    }
};

export const updateTask = async (req, res, next) => {
    try {
        const id = req.params.id;
        const task = await Task.findById(id);

        if (!task)
            return next(new ErrorHandler("Invalid ID or Task not found!", 404)); // if we use inbuilt Error class then we can only pass message like : return next(new Error("Invalid ID or Task not found!"))

        task.isCompleted = !task.isCompleted;

        await task.save();

        res.status(200).json({
            success: true,
            message: "Task Updated!",
        });
    } catch (error) {
        next(error);
    }
};

export const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);

        if (!task) return next(new ErrorHandler("Invalid ID", 404));

        await task.deleteOne();

        res.status(200).json({
            success: true,
            message: "Task Deleted!",
        });
    } catch (error) {
        next(error);
    }
};
