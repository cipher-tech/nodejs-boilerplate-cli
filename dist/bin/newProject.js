var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import inquirer from "inquirer";
import fsExtra from "fs-extra";
import fs from "fs";
import { promisify } from 'util';
import ora from "ora";
import child_process from "child_process";
import chalk from "chalk";
import { drivers, languages, framework, repos } from "./constants.js";
var creatingProjectSpinner = ora({
    spinner: 'star2'
});
var npmInstallSpinner = ora({
    spinner: 'star2'
});
var NewProject = /** @class */ (function () {
    function NewProject() {
    }
    NewProject.prototype.requestOptions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var options, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = [
                            {
                                type: 'list',
                                name: 'language',
                                message: 'Select a development language',
                                choices: ['JavaScript', 'TypeScript']
                            },
                            {
                                type: 'list',
                                name: 'driver',
                                message: 'Select a database driver',
                                choices: ['Sequelize', 'Mongoose']
                            },
                            {
                                type: 'list',
                                name: 'framework',
                                message: 'Select a database driver',
                                choices: ['Express']
                            },
                        ];
                        return [4 /*yield*/, inquirer.prompt(options)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    NewProject.prototype.verifyDrivers = function (driver) {
        if (drivers[driver] == null) {
            throw new Error("No such driver: ".concat(driver));
        }
        return drivers[driver];
    };
    NewProject.prototype.verifyLanguage = function (language) {
        if (languages[language] == null) {
            throw new Error("Language not supported: ".concat(language));
        }
        return languages[language];
    };
    NewProject.prototype.verifyFramework = function (option) {
        if (framework[option] == null) {
            throw new Error("Language not supported: ".concat(option));
        }
        return framework[option];
    };
    NewProject.prototype.generateBoilerplate = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var fsAccess, fsRename, name, driver, language, framework_1, repoToClone, cloneRepo_1, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fsAccess = promisify(fs.access);
                        fsRename = promisify(fs.rename);
                        name = options.name;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        console.log(":::::::;options options", options);
                        driver = this.verifyDrivers(options.driver);
                        language = this.verifyLanguage(options.language);
                        framework_1 = this.verifyFramework(options.framework);
                        repoToClone = "".concat(driver, "/").concat(language, "/").concat(framework_1);
                        console.log("::::::::::: verifyLanguage", {
                            driver: driver,
                            language: language,
                            framework: framework_1
                        });
                        cloneRepo_1 = child_process.spawn("git clone ".concat(repos[repoToClone]), {
                            shell: true,
                        });
                        return [4 /*yield*/, cloneRepo_1.on('error', function () {
                                npmInstallSpinner.fail(chalk.red("\n                    An error occurred, please try again. \n                    If problem persist please raise an issue on Github https://github.com/cipher-tech/nodejs-boilerplate-cli"));
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                cloneRepo_1.on('close', function () { return __awaiter(_this, void 0, void 0, function () {
                                    var hasAccess;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                npmInstallSpinner.succeed(chalk.green("Packages installed successfully"));
                                                return [4 /*yield*/, fsAccess("enyata-node-base", fs.constants.F_OK)];
                                            case 1:
                                                hasAccess = _a.sent();
                                                console.log(":::::::: hasAccess hasAccess", hasAccess);
                                                if (!!hasAccess) return [3 /*break*/, 3];
                                                return [4 /*yield*/, fsRename('enyata-node-base', name)];
                                            case 2:
                                                _a.sent();
                                                return [3 /*break*/, 4];
                                            case 3:
                                                console.log('The file already exists');
                                                _a.label = 4;
                                            case 4:
                                                console.log(chalk.green(" Repo cloned successfully!!!... "));
                                                resolve(true);
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                            })];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        error_1 = _a.sent();
                        console.log("There was an error while generating boilerplate");
                        throw error_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    NewProject.prototype.addConfigFile = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var name, fsAccess, hasAccess, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = options.name;
                        fsAccess = promisify(fs.access);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        console.log(chalk.cyan("Generating CLI config file ..."));
                        console.log("::::::::::;; configToString", options);
                        return [4 /*yield*/, fsAccess(name, fs.constants.F_OK)];
                    case 2:
                        hasAccess = _a.sent();
                        if (!!hasAccess) return [3 /*break*/, 4];
                        return [4 /*yield*/, fsExtra.writeJSON("./".concat(name, "/.clirc.json"), options)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        console.log('The folder doesn\'t exists');
                        _a.label = 5;
                    case 5:
                        console.log(chalk.cyan("Finished generating CLI config file."));
                        return [3 /*break*/, 7];
                    case 6:
                        error_2 = _a.sent();
                        console.log(chalk.cyan("An error while generating CLI config file."));
                        console.log(error_2);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    NewProject.prototype.installDependencies = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var child_process, childProcess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        npmInstallSpinner.start(chalk.cyan("Installing dependencies for ".concat(name)));
                        return [4 /*yield*/, import("child_process")];
                    case 1:
                        child_process = (_a.sent()).default;
                        childProcess = child_process.spawn("cd ".concat(name, " && npm install"), {
                            shell: true,
                        });
                        childProcess.on('error', function () {
                            npmInstallSpinner.fail(chalk.red("\n                    An error occurred, please try again. \n                    If problem persist please raise an issue on Github\n                "));
                        });
                        childProcess.on('close', function () {
                            npmInstallSpinner.succeed(chalk.green("Packages installed successfully"));
                            console.log(chalk.green("\n              \uD83E\uDD73\uD83E\uDD73\uD83E\uDD73\uD83E\uDD73\uD83E\uDD73\n            Voila!!! ".concat(name, " is ready for development. \n        \n            Create something Awesome\n               \uD83D\uDE80\uD83D\uDE80\uD83D\uDE80\uD83D\uDE80\uD83D\uDE80\n        \n            For How to use and more info on cli\n            Visit  ..\n            Cheers!!!\n        \n            ")));
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    NewProject.prototype.create = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var userOptions, generatedProject, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.requestOptions()];
                    case 1:
                        userOptions = _a.sent();
                        if (!((userOptions === null || userOptions === void 0 ? void 0 : userOptions.driver) && (userOptions === null || userOptions === void 0 ? void 0 : userOptions.language))) {
                            return [2 /*return*/, new Error("Error while resolving driver or language")];
                        }
                        creatingProjectSpinner.start(chalk.cyan("Creating ".concat(name)));
                        console.log(chalk.cyan("Generating Boilerplate ..."));
                        return [4 /*yield*/, this.generateBoilerplate(__assign({ name: name }, userOptions))];
                    case 2:
                        generatedProject = _a.sent();
                        console.log("Boilerplate generated successfully.");
                        creatingProjectSpinner.succeed(chalk.green("".concat(name, " created successfully")));
                        return [4 /*yield*/, this.addConfigFile(__assign({ name: name }, userOptions))];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.installDependencies(name)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, userOptions];
                    case 5:
                        error_3 = _a.sent();
                        throw error_3;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return NewProject;
}());
export default NewProject;
//# sourceMappingURL=newProject.js.map