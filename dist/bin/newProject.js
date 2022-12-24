var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import inquirer from "inquirer";
import fsExtra from "fs-extra";
import fs from "fs";
import { promisify } from 'util';
import ora from "ora";
import child_process from "child_process";
import chalk from "chalk";
import { drivers, languages, framework, repos } from "./constants";
const creatingProjectSpinner = ora({
    spinner: 'star2'
});
const npmInstallSpinner = ora({
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
            const response = yield inquirer.prompt(options);
            return response;
        });
    }
    verifyDrivers(driver) {
        if (drivers[driver] == null) {
            throw new Error(`No such driver: ${driver}`);
        }
        return drivers[driver];
    }
    verifyLanguage(language) {
        if (languages[language] == null) {
            throw new Error(`Language not supported: ${language}`);
        }
        return languages[language];
    }
    verifyFramework(option) {
        if (framework[option] == null) {
            throw new Error(`Language not supported: ${option}`);
        }
        return framework[option];
    }
    generateBoilerplate(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const fsAccess = promisify(fs.access);
            const fsRename = promisify(fs.rename);
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
                const cloneRepo = child_process.spawn(`git clone ${repos[repoToClone]}`, {
                    shell: true,
                });
                yield cloneRepo.on('error', () => {
                    npmInstallSpinner.fail(chalk.red(`
                    An error occurred, please try again. 
                    If problem persist please raise an issue on Github https://github.com/cipher-tech/nodejs-boilerplate-cli`));
                });
                return yield new Promise((resolve, reject) => {
                    cloneRepo.on('close', () => __awaiter(this, void 0, void 0, function* () {
                        npmInstallSpinner.succeed(chalk.green(`Packages installed successfully`));
                        const hasAccess = yield fsAccess("enyata-node-base", fs.constants.F_OK);
                        console.log(":::::::: hasAccess hasAccess", hasAccess);
                        if (!hasAccess) {
                            yield fsRename('enyata-node-base', name);
                        }
                        else {
                            console.log('The file already exists');
                        }
                        console.log(chalk.green(` Repo cloned successfully!!!... `));
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
            const fsAccess = promisify(fs.access);
            try {
                console.log(chalk.cyan("Generating CLI config file ..."));
                console.log("::::::::::;; configToString", options);
                const hasAccess = yield fsAccess(name, fs.constants.F_OK);
                if (!hasAccess) {
                    yield fsExtra.writeJSON(`./${name}/.clirc.json`, options);
                }
                else {
                    console.log('The folder doesn\'t exists');
                }
                console.log(chalk.cyan("Finished generating CLI config file."));
            }
            catch (error) {
                console.log(chalk.cyan("An error while generating CLI config file."));
                console.log(error);
            }
        });
    }
    installDependencies(name) {
        return __awaiter(this, void 0, void 0, function* () {
            npmInstallSpinner.start(chalk.cyan(`Installing dependencies for ${name}`));
            const { default: child_process } = yield import("child_process");
            const childProcess = child_process.spawn(`cd ${name} && npm install`, {
                shell: true,
            });
            childProcess.on('error', () => {
                npmInstallSpinner.fail(chalk.red(`
                    An error occurred, please try again. 
                    If problem persist please raise an issue on Github
                `));
            });
            childProcess.on('close', () => {
                npmInstallSpinner.succeed(chalk.green(`Packages installed successfully`));
                console.log(chalk.green(`
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
                creatingProjectSpinner.start(chalk.cyan(`Creating ${name}`));
                console.log(chalk.cyan("Generating Boilerplate ..."));
                const generatedProject = yield this.generateBoilerplate(Object.assign({ name }, userOptions));
                console.log("Boilerplate generated successfully.");
                creatingProjectSpinner.succeed(chalk.green(`${name} created successfully`));
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
export default NewProject;
//# sourceMappingURL=newProject.js.map