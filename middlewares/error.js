export const errorMiddleware = (err, req, res, next) => {
    // if msg is not passed from next() then err.message will be "" so
    err.message = err.message || "Internal Server Error";

    return res.status(404).json({
        success: false,
        message: err.message,
    });
};
