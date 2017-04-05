'use strict';

const createError = require("create-error");

module.exports = {
	AuthenticationError: createError("AuthenticationError", 
			{isCustomError: true, statusCode: 401}),
	
	ValidationError: createError("ValidationError", 
   			{isCustomError: true, statusCode: 422})
};
