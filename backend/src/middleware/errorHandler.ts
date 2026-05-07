const errorHandler = (err: any, req: any, res: any, next: any) => {
    console.error(err.message);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        error: err.message || "Internal Server Error"
    });

    
}
module.exports = errorHandler;