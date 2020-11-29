
const statusCode = require('./status-code.utils')

const successResponse = (res, records) => (
    res.status(statusCode.SuccessOK).json({
        success: true,
        data: records,
    })
);

const errorResponse = (req, res, error) => (
    res.status(statusCode.ServerErrorInternal).json({
        success: false,
        error: 'Internal Server Error',
        message: error.message || error,
        stack: error
    })
);


const validationErrorResponse = (req, res, error) => (
    res.status(statusCode.ClientErrorBadRequest).json({
        success: false,
        error: 'Validation Error',
        message: error.message || error,

    })
);

const notFoundErrorResponse = (res, message) => (
    res.status(statusCode.ClientErrorNotFound).json({
        success: false,
        error: 'Not Found Error',
        message: message,
    })
  );

module.exports = {
    validationErrorResponse, successResponse, errorResponse,notFoundErrorResponse
};
