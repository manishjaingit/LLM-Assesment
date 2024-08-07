import { ApiError } from "../utils/apiError.js";

/*
Global error handler 
*/
const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err?.message,
            error: err?.err,
            // ...(process.env.NODE_ENV === 'development' && { stack: err.stack })  // Include stack trace in development
        });
    };
    console.error(err);
    return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: err?.message
    });
};


/*
  Not Found Error Handler

  If we hit a route that is not found, we mark it as 404 and pass it along to the next error handler to display
*/
const notFoundError = (req, res) => {
    return res.status(404).json({
        status: false,
        message: 'URL does not exist'
    });
};

export {
    notFoundError,
    errorHandler
};