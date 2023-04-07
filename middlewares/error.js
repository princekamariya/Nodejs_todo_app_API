// from Error class we can only send error message , we can't send status code with it so we defined user defined class
export class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message); // it means message will be passed to parent class constructor
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    // if msg is not passed from next() then err.message will be "" so
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500; // 500 - Internal Server Error

    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
