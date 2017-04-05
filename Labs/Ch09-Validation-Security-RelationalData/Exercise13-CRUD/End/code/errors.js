'use strict';

const createError = require("create-error");

module.exports = {
	AuthenticationError: createError("AuthenticationError", {isCustomError: true, statusCode: 401}),
	UnauthorizedError: createError("UnauthorizedError", {isCustomError: true, statusCode: 403}),
	NotFoundError: createError("NotFoundError", {isCustomError: true, statusCode: 404})
};
