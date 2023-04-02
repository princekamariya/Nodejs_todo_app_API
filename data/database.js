import mongoose from "mongoose";

// so calling this fuunction and databse will be connected with app
export const connectDB = () => {
    mongoose
        .connect(process.env.MONGO_URI, {
            dbName: "backendapi",
        })
        .then(() => console.log("Database Connected"))
        .catch((e) => console.log(e));
};
