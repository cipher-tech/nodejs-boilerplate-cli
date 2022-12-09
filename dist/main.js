/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./database/models sync recursive ^\\.\\/.*$":
/*!****************************************!*\
  !*** ./database/models/ sync ^\.\/.*$ ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var map = {\n\t\"./\": \"./database/models/index.js\",\n\t\"./index\": \"./database/models/index.js\",\n\t\"./index.js\": \"./database/models/index.js\",\n\t\"./user\": \"./database/models/user.js\",\n\t\"./user.js\": \"./database/models/user.js\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./database/models sync recursive ^\\\\.\\\\/.*$\";\n\n//# sourceURL=webpack://nodejs_express_boilerplate/./database/models/_sync_^\\.\\/.*$?");

/***/ }),

/***/ "./app/exceptions/apiError.js":
/*!************************************!*\
  !*** ./app/exceptions/apiError.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var http_status_codes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http-status-codes */ \"http-status-codes\");\n/* harmony import */ var http_status_codes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http_status_codes__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! joi */ \"joi\");\n/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n/**\n * @description Applications Error object class\n * Used to format and return error messages\n *\n * @returns  {object} ApiError class\n */\nclass ApiError extends Error {\n  constructor(code, message) {\n    super(message);\n    // const stack = Error.captureStackTrace(this, this.constructor);\n    this.code = code;\n  }\n\n  /**\n   * Method to handle intentionally thrown exceptions.\n   * @param {object} err express error object\n   * @param {object} req express request object\n   * @param {object} res express response object\n   * @param {function} next express middleware next object\n   */\n  appError(err, req, res, next) {\n    let {\n      code\n    } = err;\n    if (code && typeof code === \"number\") {\n      logger.error(`\n            status - ${code}\n            message - ${err.message} \n            url - ${req.originalUrl} \n            method - ${req.method} \n            IP - ${req.ip}\n            Error Stack - ${err.stack}\n          `);\n      res.status(err.status || 500).json({\n        message: err.message,\n        status: code,\n        url: req.originalUrl,\n        type: (0,http_status_codes__WEBPACK_IMPORTED_MODULE_0__.getReasonPhrase)(code || 500)\n      });\n      // check if error is from JOI validator package\n    } else if (err instanceof joi__WEBPACK_IMPORTED_MODULE_1__.ValidationError) {\n      const {\n        details\n      } = err;\n      const status = 400;\n      code = 400;\n      const {\n        message\n      } = details[0];\n      logger.error(`\n                status - ${status}\n                message - ${message} \n                url - ${req.originalUrl} \n                method - ${req.method} \n                IP - ${req.ip}\n                Error Stack - ${err.stack}\n          `);\n      res.status(err.status || 500).json({\n        message,\n        status: code,\n        url: req.originalUrl,\n        type: (0,http_status_codes__WEBPACK_IMPORTED_MODULE_0__.getReasonPhrase)(code || 500)\n      });\n    } else {\n      next(err);\n    }\n  }\n\n  /**\n   * Generic error response handler of internal and unhandled exceptions.\n   *\n   * @param  {Object}   err\n   * @param  {Object}   req\n   * @param  {Object}   res\n   * @param  {Function} next\n   */\n  genericError(err, req, res, next) {\n    const message = \"An error occurred, we are looking into it.\";\n    const status = http_status_codes__WEBPACK_IMPORTED_MODULE_0__.StatusCodes.INTERNAL_SERVER_ERROR;\n    const url = req.originalUrl;\n    logger.error(`\n        status - ${status}\n        message - ${message} \n        url - ${url} \n        method - ${req.method} \n        IP - ${req.ip}\n        Error Stack - ${err.stack}\n      `);\n    res.status(err.status || 500).json({\n      message,\n      status,\n      url,\n      type: (0,http_status_codes__WEBPACK_IMPORTED_MODULE_0__.getReasonPhrase)(http_status_codes__WEBPACK_IMPORTED_MODULE_0__.StatusCodes.INTERNAL_SERVER_ERROR)\n    });\n  }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ApiError);\n\n//# sourceURL=webpack://nodejs_express_boilerplate/./app/exceptions/apiError.js?");

/***/ }),

/***/ "./app/http/controllers/authController.js":
/*!************************************************!*\
  !*** ./app/http/controllers/authController.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _services_authService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/authService */ \"./app/services/authService/index.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils */ \"./app/utils/index.js\");\n\n\n\n/**\n * User AuthController class\n * contains all methods and properties for Authenticating users.\n *\n * NOTE: Use fat arrow syntax(() => {}) if you wish to use the 'this' keyword\n * using the normal function syntax (foo(){}) will cause the 'this' keyword to be undefined\n *\n * fat arrow syntax(() => {}) automatically binds the 'this' keyword.\n *\n * @returns {object} AuthController\n */\n\nclass AuthController {\n  /**\n   * Method that handles user registration\n   * @param {object} req express request object\n   * @param {object} res express response object\n   * @param {function} next express response object\n   *\n   * @returns {object} response\n   */\n  register = async (req, res, next) => {\n    const {\n      body\n    } = req;\n\n    // instantiates the response class to return formatted and consistent data\n    const response = new _utils__WEBPACK_IMPORTED_MODULE_1__.ResponseHandler(req, res);\n    try {\n      const userAuthService = new _services_authService__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n      const registerService = await userAuthService.registerService(body);\n      if (registerService) {\n        response.success({\n          message: \"Registration successful\",\n          data: registerService\n        });\n      } else {\n        throw new Error(\"An error occurred, we're looking into it.\");\n      }\n    } catch (error) {\n      logger.error(\"Error: Error while registering user in authController.js\", error.code);\n      next(error);\n    }\n  };\n\n  /**\n  * Method that handles user login\n  * @param {object} req express request object\n  * @param {object} res express response object\n  * @param {function} next express response object\n  *\n  * @returns {object} response\n  */\n  login = async (req, res, next) => {\n    const {\n      body\n    } = req;\n    const response = new _utils__WEBPACK_IMPORTED_MODULE_1__.ResponseHandler(req, res);\n    try {\n      logger.info(\"attempting to login user. :::AuthController::login in authController.js\");\n      const userAuthService = new _services_authService__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n      const loginService = await userAuthService.loginService(body);\n      if (loginService) {\n        response.success({\n          message: \"Registration successful\",\n          data: loginService\n        });\n      } else {\n        throw new Error(\"An error occurred, we're looking into it.\");\n      }\n    } catch (error) {\n      next(error);\n    }\n  };\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AuthController);\n\n//# sourceURL=webpack://nodejs_express_boilerplate/./app/http/controllers/authController.js?");

/***/ }),

/***/ "./app/http/controllers/index.js":
/*!***************************************!*\
  !*** ./app/http/controllers/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"AuthController\": () => (/* binding */ AuthController),\n/* harmony export */   \"UserController\": () => (/* binding */ UserController)\n/* harmony export */ });\n/* harmony import */ var _authController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./authController */ \"./app/http/controllers/authController.js\");\n/* harmony import */ var _userController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./userController */ \"./app/http/controllers/userController.js\");\n\n\nconst AuthController = _authController__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\nconst UserController = _userController__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\n\n//# sourceURL=webpack://nodejs_express_boilerplate/./app/http/controllers/index.js?");

/***/ }),

/***/ "./app/http/controllers/userController.js":
/*!************************************************!*\
  !*** ./app/http/controllers/userController.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _services_userService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/userService */ \"./app/services/userService/index.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils */ \"./app/utils/index.js\");\n/**\n * User controller class\n * contains all methods and properties for interacting  with users\n *\n * @returns {object} userController\n */\n\n\n\nclass UserController {\n  constructor() {\n    this.UserService = new _services_userService__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  }\n  getUsers = async (req, res, next) => {\n    try {\n      const response = new _utils__WEBPACK_IMPORTED_MODULE_1__.ResponseHandler(req, res);\n      const users = await this.UserService.getUsers();\n      return response.success({\n        message: \"Registration successful\",\n        data: users\n      });\n    } catch (error) {\n      logger.error(\"Error: Error while fetching users in userController.js\", error);\n      return next(error);\n    }\n  };\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserController);\n\n//# sourceURL=webpack://nodejs_express_boilerplate/./app/http/controllers/userController.js?");

/***/ }),

/***/ "./app/http/middleware/authMiddleware.js":
/*!***********************************************!*\
  !*** ./app/http/middleware/authMiddleware.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var http_status_codes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http-status-codes */ \"http-status-codes\");\n/* harmony import */ var http_status_codes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http_status_codes__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _exceptions_apiError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../exceptions/apiError */ \"./app/exceptions/apiError.js\");\n/* harmony import */ var _services_userService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/userService */ \"./app/services/userService/index.js\");\n\n\n\n\nclass AuthMiddleware {\n  constructor() {\n    this.jwt = (jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default());\n    this.userService = new _services_userService__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\n  }\n  async userAuth(req, res, next) {\n    try {\n      const token = req.header(\"Authorization\");\n      if (!token) {\n        throw new _exceptions_apiError__WEBPACK_IMPORTED_MODULE_2__[\"default\"](http_status_codes__WEBPACK_IMPORTED_MODULE_0__.StatusCodes.UNAUTHORIZED, \"Unauthorized, please login again.\");\n      }\n      const [, userDetails] = token.split(\" \")[1];\n      const user = await this.userService.getUserById(userDetails.id);\n      req.user = user;\n      next();\n    } catch (error) {\n      next(error);\n    }\n  }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AuthMiddleware);\n\n//# sourceURL=webpack://nodejs_express_boilerplate/./app/http/middleware/authMiddleware.js?");

/***/ }),

/***/ "./app/http/middleware/index.js":
/*!**************************************!*\
  !*** ./app/http/middleware/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _authMiddleware__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./authMiddleware */ \"./app/http/middleware/authMiddleware.js\");\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_authMiddleware__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n//# sourceURL=webpack://nodejs_express_boilerplate/./app/http/middleware/index.js?");

/***/ }),

/***/ "./app/http/validator/authValidator.js":
/*!*********************************************!*\
  !*** ./app/http/validator/authValidator.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! joi */ \"joi\");\n/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);\n/* eslint-disable class-methods-use-this */\n\n\n/**\n* A class that holds validation logic for authentication.\n*/\nclass AuthValidator {\n  /**\n  * Validator method.\n  * Uses Joi package to validate inputs.\n  * @param {object} req express request object\n  * @param {object} res express response object\n  * @param {object} next express middleware next object\n  */\n  registerValidator(req, res, next) {\n    logger.info(\"Validating incoming request body in registerValidator method of AuthValidator class in authValidator.js\");\n    const {\n      body\n    } = req;\n    const schema = joi__WEBPACK_IMPORTED_MODULE_0___default().object({\n      name: joi__WEBPACK_IMPORTED_MODULE_0___default().string().min(3).required(),\n      email: joi__WEBPACK_IMPORTED_MODULE_0___default().string().email().min(3).required(),\n      age: joi__WEBPACK_IMPORTED_MODULE_0___default().number().integer().max(300).required(),\n      password: joi__WEBPACK_IMPORTED_MODULE_0___default().string().min(8).required(),\n      phone_number: joi__WEBPACK_IMPORTED_MODULE_0___default().string().max(11),\n      date_of_birth: joi__WEBPACK_IMPORTED_MODULE_0___default().date()\n    });\n    const {\n      error,\n      value\n    } = schema.validate(body);\n    if (error) {\n      logger.error(\"Error occurred while validating incoming request body in registerValidator method of AuthValidator class in authValidator.js\", error);\n      next(error);\n    } else {\n      logger.info(\"Finished validating incoming request body in registerValidator method of AuthValidator class in authValidator.js\");\n      req.validatedBody = value;\n      next();\n    }\n  }\n\n  /**\n  * Validator method.\n  * Uses Joi package to validate inputs.\n  * @param {object} req express request object\n  * @param {object} res express response object\n  * @param {object} next express middleware next object\n  */\n  loginValidator(req, res, next) {\n    logger.info(\"Validating incoming request body in. AuthValidator::loginValidator in authValidator.js\");\n    const {\n      body\n    } = req;\n    const schema = joi__WEBPACK_IMPORTED_MODULE_0___default().object({\n      email: joi__WEBPACK_IMPORTED_MODULE_0___default().string().email().min(3).required(),\n      password: joi__WEBPACK_IMPORTED_MODULE_0___default().string().min(8).required()\n    });\n    const {\n      error,\n      value\n    } = schema.validate(body);\n    if (error) {\n      logger.error(\"Error occurred while validating incoming request body. AuthValidator::loginValidator in authValidator.js in authValidator.js\", error);\n      next(error);\n    } else {\n      logger.info(\"Finished validating incoming request body. AuthValidator::loginValidator in authValidator.js in authValidator.js\");\n      req.validatedBody = value;\n      next();\n    }\n  }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AuthValidator);\n\n//# sourceURL=webpack://nodejs_express_boilerplate/./app/http/validator/authValidator.js?");

/***/ }),

/***/ "./app/services/authService/authService.js":
/*!*************************************************!*\
  !*** ./app/services/authService/authService.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var http_status_codes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http-status-codes */ \"http-status-codes\");\n/* harmony import */ var http_status_codes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http_status_codes__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _exceptions_apiError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../exceptions/apiError */ \"./app/exceptions/apiError.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils */ \"./app/utils/index.js\");\n/* harmony import */ var _tokenService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tokenService */ \"./app/services/tokenService/index.js\");\n/* harmony import */ var _userService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../userService */ \"./app/services/userService/index.js\");\n\n\n\n\n\n\n/**\n* Authentication service class\n* holds methods with logic to authenticate a user\n* @param {object} req express request object\n* @param {object} res express response object\n* @param {function} next express response object\n*\n* @returns {object} response\n*/\nclass AuthService {\n  constructor() {\n    this.UserService = new _userService__WEBPACK_IMPORTED_MODULE_4__[\"default\"]();\n  }\n\n  /**\n  * Method with logic to register a user\n  * @param {object} body express request body\n  * @returns {Promise<object>} {user, token}\n  */\n  registerService = async body => {\n    const {\n      password,\n      email,\n      name,\n      phone_number: phoneNumber,\n      age,\n      date_of_birth: dateOfBirth\n    } = body;\n    logger.info(`Hashing password for ${email}. AuthService::registerService in userAuthService.js`);\n    const hashedPassword = await _utils__WEBPACK_IMPORTED_MODULE_2__.HashText.getHash(password);\n    logger.info(`Finish hashing password for ${email}. AuthService::registerService in userAuthService.js`);\n    logger.info(`Checking if user with email: ${email} exists. AuthService::registerService in userAuthService.js`);\n    const oldUser = await this.UserService.getUserByEmail(email);\n    if (oldUser != null) {\n      logger.error(`user with email: ${email} already exists. AuthService::registerService in userAuthService.js`);\n      throw new _exceptions_apiError__WEBPACK_IMPORTED_MODULE_1__[\"default\"](http_status_codes__WEBPACK_IMPORTED_MODULE_0__.StatusCodes.CONFLICT, \"User with email already exists\");\n    }\n    logger.info(`User with email: ${email} does not exist. AuthService::registerService in userAuthService.js`);\n    logger.info(`Creating user with email: ${email}. AuthService::registerService in userAuthService.js`);\n    const newUser = await this.UserService.storeUser({\n      name,\n      email: email.toLowerCase(),\n      phone_number: phoneNumber,\n      age,\n      password: hashedPassword,\n      date_of_birth: dateOfBirth\n    });\n    logger.info(`Successfully created user with email: ${email}. AuthService::registerService in userAuthService.js`);\n    logger.info(`Generating token for: ${email}. AuthService::registerService in userAuthService.js`);\n    const tokenService = new _tokenService__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\n    const token = await tokenService.generateAuthToken(newUser);\n    logger.info(`Successfully generated token for: ${email}. AuthService::registerService in userAuthService.js`);\n\n    // Exclude password from user object returned dy sequelize\n    const {\n      password: userPassword,\n      ...userDetails\n    } = newUser.dataValues;\n    return {\n      userDetails,\n      token\n    };\n  };\n\n  /**\n  * Method with logic to log a user in\n  * @param {object} body express request body\n  * @returns {Promise<object>} {user, token}\n  */\n  loginService = async body => {\n    try {\n      const {\n        password,\n        email\n      } = body;\n      if (!password || !email) {\n        throw new _exceptions_apiError__WEBPACK_IMPORTED_MODULE_1__[\"default\"](http_status_codes__WEBPACK_IMPORTED_MODULE_0__.StatusCodes.BAD_REQUEST, \"Password and email are required\");\n      }\n      logger.info(`Checking if user with email: ${email} exists. AuthService::loginService in userAuthService.js`);\n      const user = await this.UserService.getUserByEmail(email.toLowerCase());\n      if (!user) {\n        logger.info(`User with email: ${email} does not exists. AuthService::loginService in userAuthService.js`);\n        throw new _exceptions_apiError__WEBPACK_IMPORTED_MODULE_1__[\"default\"](http_status_codes__WEBPACK_IMPORTED_MODULE_0__.StatusCodes.BAD_REQUEST, \"Invalid email or password please try again\");\n      }\n      logger.info(`Checking if password matches user with email: ${email}. AuthService::loginService in userAuthService.js`);\n      const doesPasswordMatch = await _utils__WEBPACK_IMPORTED_MODULE_2__.HashText.verifyHash(password, user.password);\n      if (!doesPasswordMatch) {\n        logger.info(`Password does not match for user with email: ${email}. AuthService::loginService in userAuthService.js`);\n        throw new _exceptions_apiError__WEBPACK_IMPORTED_MODULE_1__[\"default\"](http_status_codes__WEBPACK_IMPORTED_MODULE_0__.StatusCodes.BAD_REQUEST, \"Invalid email or password please try again\");\n      }\n      logger.info(`Password matches user with email: ${email}. AuthService::loginService in userAuthService.js`);\n      logger.info(`Generating token for: ${email}. AuthService::loginService in userAuthService.js`);\n      const tokenService = new _tokenService__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\n      const token = await tokenService.generateAuthToken(user);\n      logger.info(`Successfully generated token for: ${email}. AuthService::loginService in userAuthService.js`);\n\n      // Exclude password from user object returned dy sequelize\n      const {\n        password: userPassword,\n        ...userDetails\n      } = user.dataValues;\n      return {\n        userDetails,\n        token\n      };\n    } catch (error) {\n      logger.error(\"ERROR: error occurred while attempting to login user in userAuthService.js\", error);\n      throw error;\n    }\n  };\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AuthService);\n\n//# sourceURL=webpack://nodejs_express_boilerplate/./app/services/authService/authService.js?");

/***/ }),

/***/ "./app/services/authService/index.js":
/*!*******************************************!*\
  !*** ./app/services/authService/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _authService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./authService */ \"./app/services/authService/authService.js\");\n/* eslint-disable import/prefer-default-export */\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_authService__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n//# sourceURL=webpack://nodejs_express_boilerplate/./app/services/authService/index.js?");

/***/ }),

/***/ "./app/services/tokenService/index.js":
/*!********************************************!*\
  !*** ./app/services/tokenService/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _tokenService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tokenService */ \"./app/services/tokenService/tokenService.js\");\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_tokenService__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n//# sourceURL=webpack://nodejs_express_boilerplate/./app/services/tokenService/index.js?");

/***/ }),

/***/ "./app/services/tokenService/tokenService.js":
/*!***************************************************!*\
  !*** ./app/services/tokenService/tokenService.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ \"dayjs\");\n/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config */ \"./config/index.js\");\n\n\n\n\n/**\n* Class that contains methods for managing tokens with JWT.\n*/\nclass TokenService {\n  /**\n  * Method to generate a singed JWT token\n  * @param {object||string} data information to sign with JWT\n  * @param {date} timeToLive instance of day.js package object.\n  * @returns {text} JWT signed token\n  */\n  generateToken(data, timeToLive) {\n    const payload = {\n      data,\n      exp: timeToLive.unix()\n    };\n    return jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default().sign(payload, _config__WEBPACK_IMPORTED_MODULE_2__[\"default\"].JWT_SECRET);\n  }\n\n  /**\n  * Method to sign and return JWT signed object\n  * @param {object} user user information to sign with JWT\n  * @returns {Promise<Object>} JWT signed token object\n  */\n  async generateAuthToken(user) {\n    if (!user) {\n      logger.error(\"Error: User object required to generate token for TokenService:: generateAuthToken in tokenService.js\");\n      throw new Error(\"We've encountered an issue. Please retry in a few minutes.\");\n    }\n    try {\n      const timeToLive = dayjs__WEBPACK_IMPORTED_MODULE_0___default()().add(_config__WEBPACK_IMPORTED_MODULE_2__[\"default\"].JWT_TIME_TO_LIVE, \"minutes\");\n      const data = {\n        id: user.id,\n        email: user.email\n      };\n      const accessToken = this.generateToken(data, timeToLive);\n      return {\n        access: {\n          token: accessToken,\n          expires: timeToLive.toDate()\n        }\n      };\n    } catch (error) {\n      logger.error(\"Error: An error occurred generating token\", error);\n      throw new Error(\"We've encountered an issue. Please retry in a few minutes. If the issue persists, please contact support.\");\n    }\n  }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TokenService);\n\n//# sourceURL=webpack://nodejs_express_boilerplate/./app/services/tokenService/tokenService.js?");

/***/ }),

/***/ "./app/services/userService/index.js":
/*!*******************************************!*\
  !*** ./app/services/userService/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _userService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./userService */ \"./app/services/userService/userService.js\");\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_userService__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n//# sourceURL=webpack://nodejs_express_boilerplate/./app/services/userService/index.js?");

/***/ }),

/***/ "./app/services/userService/userService.js":
/*!*************************************************!*\
  !*** ./app/services/userService/userService.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../database */ \"./database/index.js\");\n\n\n/**\n* Class contains methods for interacting with the user model.\n*/\nclass UserService {\n  constructor() {\n    this.User = _database__WEBPACK_IMPORTED_MODULE_0__[\"default\"].User;\n  }\n\n  /**\n  * Method to retrieve user by email from the database.\n  * @param {text} email email to search for in the database\n  * @returns {Promise<boolean>} user model\n  */\n  async getUsers() {\n    try {\n      const users = await this.User.findAll({\n        attributes: {\n          exclude: [\"password\", \"updated_at\"]\n        }\n      });\n      return users;\n    } catch (error) {\n      logger.error(\"ERROR: An error occurred while retrieving users in userService.js\", error);\n      throw new Error(\"An error occurred. we're looking into it.\");\n    }\n  }\n  async getUserByEmail(email) {\n    try {\n      const emailToLowerCase = email.toLowerCase();\n      const user = await this.User.findOne({\n        where: {\n          email: emailToLowerCase\n        }\n      });\n      return user;\n    } catch (error) {\n      logger.error(\"ERROR: An error occurred while retrieving user in userService.js\", error);\n      throw new Error(\"An error occurred. we're looking into it.\");\n    }\n  }\n\n  /**\n  * Method to retrieve user by id from the database.\n  * @param {text} id id to search for in the database\n  * @returns {Promise<boolean>} user model\n  */\n  async getUserById(id) {\n    if (!id) {\n      logger.error(\"ERROR: User id cannot be empty in getUserById method of userService.js\");\n      throw new Error(\"An error occurred. we're looking into it.\");\n    }\n    try {\n      const user = await this.User.findByPk(id);\n      return user;\n    } catch (error) {\n      logger.error(\"ERROR: An error occurred while retrieving user in userService.js\", error);\n      throw new Error(\"An error occurred. we're looking into it.\");\n    }\n  }\n\n  /**\n  * Method to store user in the database.\n  * @param {object} userDetails  user details to store in the database\n  * @returns {Promise<boolean>} user model\n  */\n  async storeUser(userDetails) {\n    if (!userDetails) {\n      logger.error(\"ERROR: User info cannot be empty in storeUser method of userService.js\");\n      throw new Error(\"An error occurred. we're looking into it.\");\n    }\n    try {\n      const newUser = await this.User.create({\n        ...userDetails\n      });\n      return newUser;\n    } catch (error) {\n      logger.error(\"ERROR: An error occurred while storing user in userService.js\", error);\n      throw new Error(\"An error occurred. we're looking into it.\");\n    }\n  }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserService);\n\n//# sourceURL=webpack://nodejs_express_boilerplate/./app/services/userService/userService.js?");

/***/ }),

/***/ "./app/utils/hashText.js":
/*!*******************************!*\
  !*** ./app/utils/hashText.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../config */ \"./config/index.js\");\n\n\n\n/**\n* Utility class the with methods to manage text hashing.\n*/\nclass HashText {\n  /**\n  * Static method that generates and returns a hashed text\n  * @param {string} text text to hashed.\n  * @returns {Promise<text>} hashed text\n  */\n  static async getHash(text) {\n    try {\n      logger.info(\"INFO: Attempting to hash text in hashText.js\");\n      const salt = Number(_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].SALT_ROUNDS);\n      const hashedTest = await bcrypt__WEBPACK_IMPORTED_MODULE_0___default().hash(text, salt);\n      logger.info(\"INFO: Text successfully hashed in hashText.js\");\n      return hashedTest;\n    } catch (error) {\n      logger.error(\"ERROR: error occurred while hashing text in hashText.js\", error);\n      throw new Error(\"An error occurred please try again or contact support.\");\n    }\n  }\n\n  /**\n  * Verify token and return token doc (or throw an error if it is not valid)\n  * @param {string} text text to compare with hash\n  * @param {string} hashedText hashed text\n  * @returns {Promise<boolean>}\n  */\n  static async verifyHash(text, hashedText) {\n    try {\n      logger.info(\"INFO: Attempting to verify text in hashText.js\");\n      const isTextAMatch = await bcrypt__WEBPACK_IMPORTED_MODULE_0___default().compare(text, hashedText);\n      logger.info(\"INFO: Text successfully verified in hashText.js\");\n      return isTextAMatch;\n    } catch (error) {\n      logger.error(\"ERROR: error occurred while verifying text in hashText.js\", error);\n      throw new Error(\"Could not hash test.\");\n    }\n  }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HashText);\n\n//# sourceURL=webpack://nodejs_express_boilerplate/./app/utils/hashText.js?");

/***/ }),

/***/ "./app/utils/index.js":
/*!****************************!*\
  !*** ./app/utils/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"HashText\": () => (/* binding */ HashText),\n/* harmony export */   \"RandomNumberHelper\": () => (/* binding */ RandomNumberHelper),\n/* harmony export */   \"ResponseHandler\": () => (/* binding */ ResponseHandler)\n/* harmony export */ });\n/* harmony import */ var _hashText__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hashText */ \"./app/utils/hashText.js\");\n/* harmony import */ var _randomNumberHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./randomNumberHelper */ \"./app/utils/randomNumberHelper.js\");\n/* harmony import */ var _responseHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./responseHandler */ \"./app/utils/responseHandler.js\");\n\n\n\nconst RandomNumberHelper = _randomNumberHelper__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\nconst ResponseHandler = _responseHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"];\nconst HashText = _hashText__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\n\n//# sourceURL=webpack://nodejs_express_boilerplate/./app/utils/index.js?");

/***/ }),

/***/ "./app/utils/randomNumberHelper.js":
/*!*****************************************!*\
  !*** ./app/utils/randomNumberHelper.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ \"uuid\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_0__);\n\n\n/**\n* A utility class for generating both new and consistent random numbers\n*/\nclass RandomNumberHelper {\n  constructor() {\n    this.consistentRandomNumber = null;\n    if (this.consistentRandomNumber === null) {\n      this.consistentRandomNumber = (0,uuid__WEBPACK_IMPORTED_MODULE_0__.v4)();\n    }\n  }\n\n  /**\n  * Method for generating new random number\n  * @returns {string} randomNumber\n  */\n  static generateRandomNumber = () => {\n    const randomNumber = (0,uuid__WEBPACK_IMPORTED_MODULE_0__.v4)();\n    return randomNumber;\n  };\n\n  /**\n  * Method for generating consistent random number\n  * @returns {string} randomNumber\n  */\n  get getConsistentRandomNumber() {\n    return this.consistentRandomNumber;\n  }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RandomNumberHelper);\n\n//# sourceURL=webpack://nodejs_express_boilerplate/./app/utils/randomNumberHelper.js?");

/***/ }),

/***/ "./app/utils/responseHandler.js":
/*!**************************************!*\
  !*** ./app/utils/responseHandler.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config */ \"./config/index.js\");\n/* harmony import */ var _exceptions_apiError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../exceptions/apiError */ \"./app/exceptions/apiError.js\");\n\n\n\n/**\n * Applications response handler class\n * Handles both success and error responses using well defined methods\n * @param {object} req express request object\n * @param {object} res express response object\n *\n * @returns {object} response\n */\nclass Response {\n  constructor(req, res) {\n    this.domain = _config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].DOMAIN;\n    this.environment = _config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ENVIRONMENT;\n    this.request = req;\n    this.response = res;\n    this.apiError = new _exceptions_apiError__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n  }\n\n  /**\n   * Method to Handles success responses to ensure consistency\n   * @param {object} options - {message, data}\n   *\n   * @returns {object} - success response\n   */\n  success(options) {\n    if (!options || Object.entries(options).length === 0) {\n      logger.error(\"options object required in app/utils/responseHandler.js\");\n      return new Error(\"Error: Arguments to the success response handler cannot be empty\");\n    }\n    const {\n      message,\n      data\n    } = options;\n    const currentUrl = `${this.domain}${this.request.originalUrl}`;\n    const status = \"success\";\n    const response = {\n      currentUrl,\n      message,\n      data,\n      status\n    };\n    return this.response.status(200).json(response);\n  }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Response);\n\n//# sourceURL=webpack://nodejs_express_boilerplate/./app/utils/responseHandler.js?");

/***/ }),

/***/ "./config/env/development.js":
/*!***********************************!*\
  !*** ./config/env/development.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst development = {\n  API_VERSION: process.env.API_VERSION,\n  DATABASE_URL: process.env.DATABASE_URL,\n  DOMAIN: process.env.DOMAIN,\n  JWT_SECRET: process.env.JWT_SECRET,\n  SALT_ROUNDS: process.env.SALT_ROUNDS,\n  PAPERTRAIL_URL: process.env.PAPERTRAIL_URL,\n  PORT: process.env.PORT,\n  PAPERTRAIL_PORT: process.env.PAPERTRAIL_PORT,\n  ENVIRONMENT: \"development\",\n  USERNAME: process.env.USERNAME,\n  PASSWORD: process.env.PASSWORD,\n  DATABASE: process.env.DATABASE,\n  HOST: process.env.HOST,\n  DATABASE_PORT: process.env.DATABASE_PORT,\n  DIALECT: process.env.DIALECT,\n  JWT_TIME_TO_LIVE: process.env.JWT_TIME_TO_LIVE\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (development);\n\n//# sourceURL=webpack://nodejs_express_boilerplate/./config/env/development.js?");

/***/ }),

/***/ "./config/env/production.js":
/*!**********************************!*\
  !*** ./config/env/production.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst production = {\n  API_VERSION: process.env.API_VERSION,\n  DATABASE_URL: process.env.DATABASE_URL,\n  DOMAIN: process.env.DOMAIN,\n  JWT_SECRET: process.env.JWT_SECRET,\n  SALT_ROUNDS: process.env.SALT_ROUNDS,\n  PAPERTRAIL_URL: process.env.PAPERTRAIL_URL,\n  PORT: process.env.PORT,\n  PAPERTRAIL_PORT: process.env.PAPERTRAIL_PORT,\n  ENVIRONMENT: \"development\",\n  USERNAME: process.env.USERNAME,\n  PASSWORD: process.env.PASSWORD,\n  DATABASE: process.env.DATABASE,\n  HOST: process.env.HOST,\n  DATABASE_PORT: process.env.DATABASE_PORT,\n  DIALECT: process.env.DIALECT,\n  JWT_TIME_TO_LIVE: process.env.JWT_TIME_TO_LIVE\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (production);\n\n//# sourceURL=webpack://nodejs_express_boilerplate/./config/env/production.js?");

/***/ }),

/***/ "./config/env/staging.js":
/*!*******************************!*\
  !*** ./config/env/staging.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst staging = {\n  API_VERSION: process.env.API_VERSION,\n  DATABASE_URL: process.env.DATABASE_URL,\n  DOMAIN: process.env.DOMAIN,\n  JWT_SECRET: process.env.JWT_SECRET,\n  SALT_ROUNDS: process.env.SALT_ROUNDS,\n  PAPERTRAIL_URL: process.env.PAPERTRAIL_URL,\n  PORT: process.env.PORT,\n  PAPERTRAIL_PORT: process.env.PAPERTRAIL_PORT,\n  ENVIRONMENT: \"development\",\n  USERNAME: process.env.USERNAME,\n  PASSWORD: process.env.PASSWORD,\n  DATABASE: process.env.DATABASE,\n  HOST: process.env.HOST,\n  DATABASE_PORT: process.env.DATABASE_PORT,\n  DIALECT: process.env.DIALECT,\n  JWT_TIME_TO_LIVE: process.env.JWT_TIME_TO_LIVE\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (staging);\n\n//# sourceURL=webpack://nodejs_express_boilerplate/./config/env/staging.js?");

/***/ }),

/***/ "./config/env/testEnv.js":
/*!*******************************!*\
  !*** ./config/env/testEnv.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst testing = {\n  API_VERSION: process.env.API_VERSION,\n  DATABASE_URL: process.env.DATABASE_URL,\n  DOMAIN: process.env.DOMAIN,\n  JWT_SECRET: process.env.JWT_SECRET,\n  SALT_ROUNDS: process.env.SALT_ROUNDS,\n  PAPERTRAIL_URL: process.env.PAPERTRAIL_URL,\n  PORT: process.env.PORT,\n  PAPERTRAIL_PORT: process.env.PAPERTRAIL_PORT,\n  ENVIRONMENT: \"development\",\n  USERNAME: process.env.USERNAME,\n  PASSWORD: process.env.PASSWORD,\n  DATABASE: process.env.DATABASE,\n  HOST: process.env.HOST,\n  DATABASE_PORT: process.env.DATABASE_PORT,\n  DIALECT: process.env.DIALECT,\n  JWT_TIME_TO_LIVE: process.env.JWT_TIME_TO_LIVE\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (testing);\n\n//# sourceURL=webpack://nodejs_express_boilerplate/./config/env/testEnv.js?");

/***/ }),

/***/ "./config/express.js":
/*!***************************!*\
  !*** ./config/express.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var file_stream_rotator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! file-stream-rotator */ \"file-stream-rotator\");\n/* harmony import */ var file_stream_rotator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(file_stream_rotator__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var morgan__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! morgan */ \"morgan\");\n/* harmony import */ var morgan__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(morgan__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var express_fileupload__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! express-fileupload */ \"express-fileupload\");\n/* harmony import */ var express_fileupload__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(express_fileupload__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./logger */ \"./config/logger.js\");\n/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../routes */ \"./routes/index.js\");\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! . */ \"./config/index.js\");\n/* harmony import */ var _app_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../app/utils */ \"./app/utils/index.js\");\n/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../database */ \"./database/index.js\");\n/* harmony import */ var _app_exceptions_apiError__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../app/exceptions/apiError */ \"./app/exceptions/apiError.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n/**\n * Class contains Express configurations\n *\n * @returns Express config\n */\nclass ExpressConfig {\n  constructor() {\n    // instantiates the logger\n    this.logger = null;\n\n    // Generate a correlationId from RandomNumberHelper class for grouping logs\n    this.correlationId = new _app_utils__WEBPACK_IMPORTED_MODULE_9__.RandomNumberHelper();\n\n    // Make correlationId a global variable\n    global.correlationId = this.correlationId.getConsistentRandomNumber;\n\n    // Sets our log directory and creates the directory if it doesn't exist.\n    this.logDirectory = \"./log\";\n    this.checkLogDir = fs__WEBPACK_IMPORTED_MODULE_0___default().existsSync(this.logDirectory) || fs__WEBPACK_IMPORTED_MODULE_0___default().mkdirSync(this.logDirectory);\n    this.router = new _routes__WEBPACK_IMPORTED_MODULE_7__[\"default\"]();\n    this.ApiError = new _app_exceptions_apiError__WEBPACK_IMPORTED_MODULE_11__[\"default\"]();\n  }\n\n  /**\n   * Method to configure application logger\n   * @param {object} app - express app\n   */\n  configureLogger(app) {\n    let accessLogStream;\n\n    // initialize logger for the right environment\n    if (app.get(\"env\") === \"development\") {\n      this.logger = (0,_logger__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(\"development\");\n    } else if (app.get(\"env\") === \"test\") {\n      this.logger = (0,_logger__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(\"test\");\n    } else if (app.get(\"env\") === \"staging\") {\n      this.logger = (0,_logger__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(\"staging\");\n    } else if (app.get(\"env\") === \"production\") {\n      this.logger = (0,_logger__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(\"production\");\n    } else {\n      this.logger = (0,_logger__WEBPACK_IMPORTED_MODULE_6__[\"default\"])();\n    }\n\n    // makes logger a global variable so you don't have to import it in your file to use it.\n    global.logger = this.logger;\n    logger.info(\"Application starting...\");\n    logger.debug(\"Overriding Express logger\");\n\n    // checks if the log directory exists and starts streaming logs to the file\n    if (this.checkLogDir) {\n      accessLogStream = file_stream_rotator__WEBPACK_IMPORTED_MODULE_2___default().getStream({\n        date_format: \"YYYYMMDD\",\n        filename: `${this.logDirectory}/log-%DATE%.log`,\n        frequency: \"weekly\",\n        verbose: false\n      });\n    }\n    app.use(morgan__WEBPACK_IMPORTED_MODULE_3___default()(\"combined\", {\n      stream: accessLogStream\n    }));\n  }\n\n  /**\n   * Method to configure application middleware\n   * @param {object} app - express app\n   */\n  configureRoutes(app) {\n    // enable cors\n    app.use(cors__WEBPACK_IMPORTED_MODULE_5___default()());\n    app.options(\"*\", cors__WEBPACK_IMPORTED_MODULE_5___default()());\n\n    // parse json request\n    app.use(express__WEBPACK_IMPORTED_MODULE_1___default().json());\n\n    // parse urlencoded request\n    app.use(express__WEBPACK_IMPORTED_MODULE_1___default().urlencoded({\n      extended: true\n    }));\n\n    // configures our default routes path\n    app.use(`/api/${___WEBPACK_IMPORTED_MODULE_8__[\"default\"].API_VERSION}`, this.router.run());\n\n    // Handles exceptions thrown in the application\n    app.use(this.ApiError.appError);\n\n    // handle all error instances and returns an errors response\n    // eslint-disable-next-line no-unused-vars\n    app.use(this.ApiError.genericError);\n  }\n  configureDatabase() {\n    return _database__WEBPACK_IMPORTED_MODULE_10__[\"default\"].sequelize.sync();\n  }\n\n  /**\n   * Main Method that bootstraps and calls all the configuration methods\n   * @param {object} app - express app\n   */\n  run(app) {\n    this.configureDatabase();\n    // calls the method to configure our logger\n    this.configureLogger(app);\n\n    // calls the method to configure our routes\n    this.configureRoutes(app);\n\n    // configure route for file upload\n    app.use(express_fileupload__WEBPACK_IMPORTED_MODULE_4___default()({\n      limits: {\n        fileSize: 10 * 1024 * 1024\n      } // 10 MB\n    }));\n  }\n}\n\n// creates a singleton pattern so only one instance of the class exists\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new ExpressConfig());\n\n//# sourceURL=webpack://nodejs_express_boilerplate/./config/express.js?");

/***/ }),

/***/ "./config/index.js":
/*!*************************!*\
  !*** ./config/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("var __dirname = \"config\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _env_development__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./env/development */ \"./config/env/development.js\");\n/* harmony import */ var _env_testEnv__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./env/testEnv */ \"./config/env/testEnv.js\");\n/* harmony import */ var _env_staging__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./env/staging */ \"./config/env/staging.js\");\n/* harmony import */ var _env_production__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./env/production */ \"./config/env/production.js\");\n\n\n\n\n\nconst defaults = {\n  root: path__WEBPACK_IMPORTED_MODULE_0___default().normalize(`${__dirname}/..`),\n  serviceName: \"Node Boilerplate API\"\n};\nconst config = {\n  development: Object.assign(_env_development__WEBPACK_IMPORTED_MODULE_1__[\"default\"], defaults),\n  test: Object.assign(_env_testEnv__WEBPACK_IMPORTED_MODULE_2__[\"default\"], defaults),\n  staging: Object.assign(_env_staging__WEBPACK_IMPORTED_MODULE_3__[\"default\"], defaults),\n  production: Object.assign(_env_production__WEBPACK_IMPORTED_MODULE_4__[\"default\"], defaults)\n}[\"development\" || 0];\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (config);\n\n//# sourceURL=webpack://nodejs_express_boilerplate/./config/index.js?");

/***/ }),

/***/ "./config/logger.js":
/*!**************************!*\
  !*** ./config/logger.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var winston__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! winston */ \"winston\");\n/* harmony import */ var winston__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(winston__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! . */ \"./config/index.js\");\n\n\nconst {\n  DOMAIN = \"\"\n} = ___WEBPACK_IMPORTED_MODULE_1__[\"default\"];\nconst {\n  combine,\n  timestamp,\n  label,\n  printf,\n  splat,\n  simple\n} = winston__WEBPACK_IMPORTED_MODULE_0__.format;\nconst logger = env => {\n  let ret;\n  const loggerFormat = printf(({\n    level,\n    message,\n    label,\n    timestamp\n  }) => `${new Date(timestamp).toGMTString()} [${label}] [${level}] id-${correlationId}: ${message}`);\n  switch (env) {\n    case \"development\":\n      if (DOMAIN.includes(\"localhost\")) {\n        ret = winston__WEBPACK_IMPORTED_MODULE_0___default().createLogger({\n          format: combine(splat(), simple(), timestamp(), label({\n            label: env\n          }), loggerFormat),\n          transports: [new (winston__WEBPACK_IMPORTED_MODULE_0___default().transports.Console)({\n            level: \"debug\",\n            handleExceptions: true,\n            json: false,\n            colorize: true\n          }), new (winston__WEBPACK_IMPORTED_MODULE_0___default().transports.File)({\n            level: \"info\",\n            filename: \"./server.log\",\n            handleExceptions: true,\n            json: false,\n            maxsize: 5242880,\n            maxFiles: 5,\n            colorize: false\n          })],\n          exitOnError: false\n        });\n      } else {\n        ret = winston__WEBPACK_IMPORTED_MODULE_0___default().createLogger({\n          format: combine(splat(), simple(), timestamp(), label({\n            label: env\n          }), loggerFormat),\n          transports: [new (winston__WEBPACK_IMPORTED_MODULE_0___default().transports.Console)({\n            level: \"debug\",\n            handleExceptions: true,\n            json: false,\n            colorize: true\n          }), new (winston__WEBPACK_IMPORTED_MODULE_0___default().transports.File)({\n            level: \"info\",\n            filename: \"./server.log\",\n            handleExceptions: true,\n            json: false,\n            maxsize: 5242880,\n            maxFiles: 5,\n            colorize: false\n          }), new (winston__WEBPACK_IMPORTED_MODULE_0___default().transports.Papertrail)({\n            host: `${___WEBPACK_IMPORTED_MODULE_1__[\"default\"].PAPERTRAIL_URL}`.split(\"\\r\")[0],\n            port: ___WEBPACK_IMPORTED_MODULE_1__[\"default\"].PAPERTRAIL_PORT\n          })],\n          exitOnError: false\n        });\n      }\n      break;\n    case \"test\":\n      ret = winston__WEBPACK_IMPORTED_MODULE_0___default().createLogger({\n        format: combine(splat(), simple(), timestamp(), label({\n          label: env\n        }), loggerFormat),\n        transports: [new (winston__WEBPACK_IMPORTED_MODULE_0___default().transports.File)({\n          level: \"info\",\n          filename: \"./test.log\",\n          handleExceptions: true,\n          json: false,\n          maxsize: 5242880,\n          maxFiles: 50,\n          colorize: false\n        })],\n        exitOnError: false\n      });\n      break;\n    case \"staging\":\n      ret = winston__WEBPACK_IMPORTED_MODULE_0___default().createLogger({\n        format: combine(splat(), simple(), timestamp(), label({\n          label: env\n        }), loggerFormat),\n        transports: [new (winston__WEBPACK_IMPORTED_MODULE_0___default().transports.File)({\n          level: \"info\",\n          filename: \"./server.log\",\n          handleExceptions: true,\n          json: false,\n          maxsize: 5242880,\n          maxFiles: 50,\n          colorize: false\n        }), new (winston__WEBPACK_IMPORTED_MODULE_0___default().transports.Papertrail)({\n          host: `${___WEBPACK_IMPORTED_MODULE_1__[\"default\"].PAPERTRAIL_URL}`.split(\"\\r\")[0],\n          port: ___WEBPACK_IMPORTED_MODULE_1__[\"default\"].PAPERTRAIL_PORT,\n          app_name: `${___WEBPACK_IMPORTED_MODULE_1__[\"default\"].NODE_ENV}-api`\n        })],\n        exitOnError: false\n      });\n      break;\n    case \"production\":\n      ret = winston__WEBPACK_IMPORTED_MODULE_0___default().createLogger({\n        format: combine(splat(), simple(), timestamp(), label({\n          label: env\n        }), loggerFormat),\n        transports: [new (winston__WEBPACK_IMPORTED_MODULE_0___default().transports.Console)({\n          level: \"error\",\n          handleExceptions: true,\n          json: false,\n          colorize: true\n        }), new (winston__WEBPACK_IMPORTED_MODULE_0___default().transports.File)({\n          level: \"info\",\n          filename: \"./server.log\",\n          handleExceptions: true,\n          json: false,\n          maxsize: 5242880,\n          maxFiles: 100,\n          colorize: true\n        }), new (winston__WEBPACK_IMPORTED_MODULE_0___default().transports.Papertrail)({\n          host: `${___WEBPACK_IMPORTED_MODULE_1__[\"default\"].PAPERTRAIL_URL}`.split(\"\\r\")[0],\n          port: ___WEBPACK_IMPORTED_MODULE_1__[\"default\"].PAPERTRAIL_PORT,\n          app_name: `${___WEBPACK_IMPORTED_MODULE_1__[\"default\"].NODE_ENV}-api`\n        })],\n        exitOnError: false\n      });\n      break;\n    default:\n      ret = winston__WEBPACK_IMPORTED_MODULE_0___default().createLogger({\n        format: combine(splat(), simple(), timestamp(), label({\n          label: env\n        }), loggerFormat),\n        transports: [new (winston__WEBPACK_IMPORTED_MODULE_0___default().transports.Console)({\n          level: \"debug\",\n          handleExceptions: true,\n          json: false,\n          colorize: true\n        })],\n        exitOnError: false\n      });\n  }\n  ret.stream = {\n    write: message => {\n      logger.info(message);\n    }\n  };\n  return ret;\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (logger);\n\n//# sourceURL=webpack://nodejs_express_boilerplate/./config/logger.js?");

/***/ }),

/***/ "./database/index.js":
/*!***************************!*\
  !*** ./database/index.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sequelize */ \"sequelize\");\n/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sequelize__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _config_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config/index */ \"./config/index.js\");\n/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models */ \"./database/models/index.js\");\n\n\n\nconst {\n  DATABASE,\n  USERNAME,\n  PASSWORD,\n  HOST,\n  DATABASE_PORT,\n  DIALECT\n} = _config_index__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\nconst sequelize = new (sequelize__WEBPACK_IMPORTED_MODULE_0___default())(DATABASE, USERNAME, PASSWORD, {\n  host: HOST,\n  dialect: DIALECT,\n  port: DATABASE_PORT,\n  operatorsAliases: false,\n  pool: {\n    max: 5,\n    min: 0,\n    acquire: 3000,\n    idle: 0\n  }\n});\nconst database = (DatabaseConfig, sequelizeInstance) => {\n  const model = {};\n  model.Sequelize = (sequelize__WEBPACK_IMPORTED_MODULE_0___default());\n  model.sequelize = sequelize;\n  const modelInstances = (0,_models__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(DatabaseConfig, sequelizeInstance);\n  Object.assign(model, {\n    ...modelInstances\n  });\n  return model;\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (database(sequelize, (sequelize__WEBPACK_IMPORTED_MODULE_0___default())));\n\n//# sourceURL=webpack://nodejs_express_boilerplate/./database/index.js?");

/***/ }),

/***/ "./database/models/index.js":
/*!**********************************!*\
  !*** ./database/models/index.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("var __dirname = \"database/models\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n\n// import { basename as _basename, join } from \"path\";\n// import Sequelize, { DataTypes } from \"sequelize\";\n// import config from \"../database\";\nconst makeModels = (sequelize, Sequelize) => {\n  const basename = \"index.js\";\n  // const env = process.env.NODE_ENV || \"development\";\n  const models = {};\n  const sequelizeModels = (0,fs__WEBPACK_IMPORTED_MODULE_0__.readdirSync)(__dirname).filter(file => file.indexOf(\".\") !== 0 && file !== basename && file.slice(-3) === \".js\");\n  for (let i = 0; i < sequelizeModels.length; i++) {\n    let modelName = sequelizeModels[i].slice(0, -3);\n    // eslint-disable-next-line security/detect-non-literal-require, import/no-dynamic-require\n    const {\n      default: module\n    } = __webpack_require__(\"./database/models sync recursive ^\\\\.\\\\/.*$\")(`./${modelName}`);\n    const instance = module;\n    modelName = modelName[0].toUpperCase() + modelName.substring(1);\n    models[modelName] = instance(sequelize, Sequelize);\n  }\n  return models;\n};\n// Object.keys(models).forEach(modelName => {\n//     if (models[modelName].associate) {\n//         models[modelName].associate(models);\n//     }\n// })\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (makeModels);\n\n//# sourceURL=webpack://nodejs_express_boilerplate/./database/models/index.js?");

/***/ }),

/***/ "./database/models/user.js":
/*!*********************************!*\
  !*** ./database/models/user.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((sequelize, DataTypes) => {\n  //     class User extends sequelize {\n  //         /**\n  //          * Helper method for defining associations.\n  //          * This method is not a part of Sequelize lifecycle.\n  //          * The `models/index` file will call this method automatically.\n  //          */\n  //         static associate(models) {\n  //             // define association here\n  //         }\n  //     }\n  const User = sequelize.define(\"user\", {\n    id: {\n      type: DataTypes.INTEGER,\n      autoIncrement: true,\n      primaryKey: true\n    },\n    name: {\n      type: DataTypes.STRING(60),\n      allowNull: false\n    },\n    email: {\n      type: DataTypes.STRING(60),\n      allowNull: false\n    },\n    phone_number: {\n      type: DataTypes.STRING(11),\n      allowNull: false\n    },\n    password: {\n      type: DataTypes.STRING(),\n      allowNull: false\n    },\n    age: {\n      type: DataTypes.INTEGER,\n      allowNull: false,\n      defaultValue: 18\n    },\n    date_of_birth: {\n      type: DataTypes.DATE,\n      allowNull: false\n    },\n    created_at: {\n      type: DataTypes.DATE,\n      defaultValue: new Date().toISOString()\n    },\n    updated_at: {\n      type: DataTypes.DATE,\n      defaultValue: new Date().toISOString()\n    }\n  }, {\n    sequelize,\n    timestamps: true,\n    // I want updatedAt to actually be called updated_at\n    updatedAt: \"updated_at\",\n    // I want createdAt to actually be called created_at\n    createdAt: \"created_at\",\n    modelName: \"User\"\n  });\n  return User;\n});\n\n//# sourceURL=webpack://nodejs_express_boilerplate/./database/models/user.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var dotenv_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dotenv/config */ \"dotenv/config\");\n/* harmony import */ var dotenv_config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dotenv_config__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config */ \"./config/index.js\");\n/* harmony import */ var _config_express__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config/express */ \"./config/express.js\");\n\n\n\n\n\n// Instantiates the express package\nconst app = express__WEBPACK_IMPORTED_MODULE_1___default()();\n\n// Sets the port the app will run on from environment variable or a default port 4400\nconst port = _config__WEBPACK_IMPORTED_MODULE_2__[\"default\"].PORT || 4400;\n\n// calls the express configuration method with express app as argument\n_config_express__WEBPACK_IMPORTED_MODULE_3__[\"default\"].run(app);\n\n// Starts the server\napp.listen(port, () => {\n  logger.info(\"Server running\");\n  console.log(`Server is listening on port ${port}`);\n});\n\n//# sourceURL=webpack://nodejs_express_boilerplate/./index.js?");

/***/ }),

/***/ "./routes/index.js":
/*!*************************!*\
  !*** ./routes/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _app_utils_responseHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app/utils/responseHandler */ \"./app/utils/responseHandler.js\");\n/* harmony import */ var _v1_authRoute__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./v1/authRoute */ \"./routes/v1/authRoute.js\");\n/* harmony import */ var _v1_userRoute__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./v1/userRoute */ \"./routes/v1/userRoute.js\");\n\n\n\n\n\n/**\n * Main Router that contains Application routes\n * @returns {expressRouterObject} this.routes\n */\n\nclass Router {\n  constructor() {\n    this.router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();\n    this.response = null;\n    // instantiates the class where we define our authentication routes\n    // and adds the authentication routes defined in the class to our routes\n    this.authRoute = new _v1_authRoute__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.router);\n    this.userRoute = new _v1_userRoute__WEBPACK_IMPORTED_MODULE_3__[\"default\"](this.router);\n  }\n  indexRoute() {\n    this.router.get(\"/\", (req, res) => {\n      this.response = new _app_utils_responseHandler__WEBPACK_IMPORTED_MODULE_1__[\"default\"](req, res);\n      this.response.success({\n        message: \"Welcome.\",\n        data: []\n      });\n    });\n  }\n  run() {\n    this.router.use(\"/auth\", this.authRoute.run());\n    this.router.use(\"/users\", this.userRoute.run());\n    this.indexRoute();\n    return this.router;\n  }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Router);\n\n//# sourceURL=webpack://nodejs_express_boilerplate/./routes/index.js?");

/***/ }),

/***/ "./routes/v1/authRoute.js":
/*!********************************!*\
  !*** ./routes/v1/authRoute.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _app_http_controllers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../app/http/controllers */ \"./app/http/controllers/index.js\");\n/* harmony import */ var _app_http_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../app/http/middleware */ \"./app/http/middleware/index.js\");\n/* harmony import */ var _app_http_validator_authValidator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../app/http/validator/authValidator */ \"./app/http/validator/authValidator.js\");\n\n\n\n\n/**\n* A router class that holds all routes related to authentication\n* You can instantiate your controller class in the constructor method\n* and attach it to a route path in the `routes` method.\n* @param {object} router express router object\n*/\nclass AuthRoute {\n  constructor(router) {\n    this.router = router;\n\n    // Instantiate controllers and validator classes before attaching them to the routes\n    this.authValidator = new _app_http_validator_authValidator__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n    this.authController = new _app_http_controllers__WEBPACK_IMPORTED_MODULE_0__.AuthController();\n    this.authMiddleware = new _app_http_middleware__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n    // this.routes();\n  }\n\n  run() {\n    this.routes();\n    return this.router;\n  }\n\n  /**\n   * You can define all the different endpoints related to the AuthRoute class\n   * in the routes method and attach it to a controller function/method.\n   */\n  routes() {\n    this.router.post(\"/register\", this.authValidator.registerValidator, this.authController.register);\n    this.router.post(\"/login\", this.authValidator.loginValidator, this.authController.login);\n  }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AuthRoute);\n\n//# sourceURL=webpack://nodejs_express_boilerplate/./routes/v1/authRoute.js?");

/***/ }),

/***/ "./routes/v1/userRoute.js":
/*!********************************!*\
  !*** ./routes/v1/userRoute.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _app_http_controllers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../app/http/controllers */ \"./app/http/controllers/index.js\");\n\n\n/**\n* A router class that holds all routes related to User\n* You can instantiate your controller class in the constructor method\n* and attach it to a route path in the `routes` method.\n* @param {object} router express router object\n*/\nclass UserRoute {\n  constructor(router) {\n    this.router = router;\n    // Instantiate controllers and validator classes before attaching them to the routes\n    this.userController = new _app_http_controllers__WEBPACK_IMPORTED_MODULE_0__.UserController();\n  }\n  run() {\n    this.routes();\n    return this.router;\n  }\n\n  /**\n   * You can define all the different endpoints related to the UserRoute class\n   * in the routes method and attach it to a controller function/method.\n   */\n  routes() {\n    this.router.get(\"/\", this.userController.getUsers);\n  }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserRoute);\n\n//# sourceURL=webpack://nodejs_express_boilerplate/./routes/v1/userRoute.js?");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("bcrypt");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("cors");

/***/ }),

/***/ "dayjs":
/*!************************!*\
  !*** external "dayjs" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("dayjs");

/***/ }),

/***/ "dotenv/config":
/*!********************************!*\
  !*** external "dotenv/config" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("dotenv/config");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "express-fileupload":
/*!*************************************!*\
  !*** external "express-fileupload" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = require("express-fileupload");

/***/ }),

/***/ "file-stream-rotator":
/*!**************************************!*\
  !*** external "file-stream-rotator" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = require("file-stream-rotator");

/***/ }),

/***/ "http-status-codes":
/*!************************************!*\
  !*** external "http-status-codes" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("http-status-codes");

/***/ }),

/***/ "joi":
/*!**********************!*\
  !*** external "joi" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("joi");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("jsonwebtoken");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("morgan");

/***/ }),

/***/ "sequelize":
/*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("sequelize");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("uuid");

/***/ }),

/***/ "winston":
/*!**************************!*\
  !*** external "winston" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("winston");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;