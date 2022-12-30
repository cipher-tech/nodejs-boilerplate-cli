"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
const ora_1 = __importDefault(require("ora"));
const child_process_1 = __importDefault(require("child_process"));
const chalk_1 = __importDefault(require("chalk"));
const constants_1 = require("./constants");
const creatingProjectSpinner = (0, ora_1.default)({
    spinner: 'star2'
});
const npmInstallSpinner = (0, ora_1.default)({
    spinner: 'star2'
});
class NewProject {
    requestOptions() {
        return __awaiter(this, void 0, void 0, function* () {
            const options = [
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
            const response = yield inquirer_1.default.prompt(options);
            return response;
        });
    }
    verifyDrivers(driver) {
        if (constants_1.drivers[driver] == null) {
            throw new Error(`No such driver: ${driver}`);
        }
        return constants_1.drivers[driver];
    }
    verifyLanguage(language) {
        if (constants_1.languages[language] == null) {
            throw new Error(`Language not supported: ${language}`);
        }
        return constants_1.languages[language];
    }
    verifyFramework(option) {
        if (constants_1.framework[option] == null) {
            throw new Error(`Language not supported: ${option}`);
        }
        return constants_1.framework[option];
    }
    generateBoilerplate(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const fsAccess = (0, util_1.promisify)(fs_1.default.access);
            const fsRename = (0, util_1.promisify)(fs_1.default.rename);
            const { name } = options;
            try {
                console.log(":::::::;options options", options);
                const driver = this.verifyDrivers(options.driver);
                const language = this.verifyLanguage(options.language);
                const framework = this.verifyFramework(options.framework);
                const repoToClone = `${driver}/${language}/${framework}`;
                console.log("::::::::::: verifyLanguage", {
                    driver,
                    language,
                    framework
                });
                const cloneRepo = child_process_1.default.spawn(`git clone ${constants_1.repos[repoToClone]}`, {
                    shell: true,
                });
                yield cloneRepo.on('error', () => {
                    npmInstallSpinner.fail(chalk_1.default.red(`
                    An error occurred, please try again. 
                    If problem persist please raise an issue on Github https://github.com/cipher-tech/nodejs-boilerplate-cli`));
                });
                return yield new Promise((resolve, reject) => {
                    cloneRepo.on('close', () => __awaiter(this, void 0, void 0, function* () {
                        npmInstallSpinner.succeed(chalk_1.default.green(`Packages installed successfully`));
                        const hasAccess = yield fsAccess("enyata-node-base", fs_1.default.constants.F_OK);
                        console.log(":::::::: hasAccess hasAccess", hasAccess);
                        if (!hasAccess) {
                            yield fsRename('enyata-node-base', name);
                        }
                        else {
                            console.log('The file already exists');
                        }
                        console.log(chalk_1.default.green(` Repo cloned successfully!!!... `));
                        resolve(true);
                    }));
                });
            }
            catch (error) {
                console.log("There was an error while generating boilerplate");
                throw error;
            }
        });
    }
    addConfigFile(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = options;
            const fsAccess = (0, util_1.promisify)(fs_1.default.access);
            try {
                console.log(chalk_1.default.cyan("Generating CLI config file ..."));
                console.log("::::::::::;; configToString", options);
                const hasAccess = yield fsAccess(name, fs_1.default.constants.F_OK);
                if (!hasAccess) {
                    yield fs_extra_1.default.writeJSON(`./${name}/.clirc.json`, options);
                }
                else {
                    console.log('The folder doesn\'t exists');
                }
                console.log(chalk_1.default.cyan("Finished generating CLI config file."));
            }
            catch (error) {
                console.log(chalk_1.default.cyan("An error while generating CLI config file."));
                console.log(error);
            }
        });
    }
    installDependencies(name) {
        return __awaiter(this, void 0, void 0, function* () {
            npmInstallSpinner.start(chalk_1.default.cyan(`Installing dependencies for ${name}`));
            const { default: child_process } = yield Promise.resolve().then(() => __importStar(require("child_process")));
            const childProcess = child_process.spawn(`cd ${name} && npm install`, {
                shell: true,
            });
            childProcess.on('error', () => {
                npmInstallSpinner.fail(chalk_1.default.red(`
                    An error occurred, please try again. 
                    If problem persist please raise an issue on Github
                `));
            });
            childProcess.on('close', () => {
                npmInstallSpinner.succeed(chalk_1.default.green(`Packages installed successfully`));
                console.log(chalk_1.default.green(`
              🥳🥳🥳🥳🥳
            Voila!!! ${name} is ready for development. 
        
            Create something Awesome
               🚀🚀🚀🚀🚀
        
            For How to use and more info on cli
            Visit  ..
            Cheers!!!
        
            `));
            });
        });
    }
    create(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userOptions = yield this.requestOptions();
                if (!((userOptions === null || userOptions === void 0 ? void 0 : userOptions.driver) && (userOptions === null || userOptions === void 0 ? void 0 : userOptions.language))) {
                    return new Error("Error while resolving driver or language");
                }
                creatingProjectSpinner.start(chalk_1.default.cyan(`Creating ${name}`));
                console.log(chalk_1.default.cyan("Generating Boilerplate ..."));
                const generatedProject = yield this.generateBoilerplate(Object.assign({ name }, userOptions));
                console.log("Boilerplate generated successfully.");
                creatingProjectSpinner.succeed(chalk_1.default.green(`${name} created successfully`));
                yield this.addConfigFile(Object.assign({ name }, userOptions));
                yield this.installDependencies(name);
                return userOptions;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = NewProject;
