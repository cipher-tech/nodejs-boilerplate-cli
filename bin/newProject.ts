import inquirer from "inquirer";
import fsExtra from "fs-extra";
import fs from "fs";
import { promisify } from 'util'
import ora from "ora";
import child_process from "child_process";
import chalk from "chalk";
import { drivers, languages, framework, repos, IConfigOptions } from "./constants.js";
import path from "path";

type ILanguage = keyof typeof languages;
type IDriver = keyof typeof drivers;
type IFramework = keyof typeof framework;

type IUserOptions = {
    language: ILanguage,
    driver: IDriver,
    framework: IFramework
}
type IGenerateBoilerplateOptions = {
    language: ILanguage;
    driver: IDriver
    framework: IFramework
    name: string,
}

const creatingProjectSpinner = ora({
    spinner: 'star2'
});
const npmInstallSpinner = ora({
    spinner: 'star2'
});
class NewProject {
    async requestOptions() {
        const options = [
            {
                type: 'list',
                name: 'language',
                message: 'Select a development language',
                choices: [ 'JavaScript', 'TypeScript' ]
            },
            {
                type: 'list',
                name: 'driver',
                message: 'Select a database driver',
                choices: [ 'Sequelize', 'Mongoose' ]
            },
            {
                type: 'list',
                name: 'framework',
                message: 'Select a database driver',
                choices: [ 'Express' ]
            },
        ]

        const response: IUserOptions = await inquirer.prompt(options)
        return response
    }

    verifyDrivers(driver: IDriver) {
        if (drivers[ driver ] == null) {
            throw new Error(`No such driver: ${ driver }`)
        }
        return drivers[ driver ]
    }

    verifyLanguage(language: ILanguage) {
        if (languages[ language ] == null) {
            throw new Error(`Language not supported: ${ language }`)
        }
        return languages[ language ]
    }

    verifyFramework(option: IFramework) {
        if (framework[ option ] == null) {
            throw new Error(`Language not supported: ${ option }`)
        }
        return framework[ option ]
    }
    async generateBoilerplate(options: IGenerateBoilerplateOptions) {
        const fsAccess = promisify(fs.access)
        const fsRename = promisify(fs.rename)
        const { name } = options
        try {
            const driver = this.verifyDrivers(options.driver)
            const language = this.verifyLanguage(options.language)
            const framework = this.verifyFramework(options.framework)

            const repoToClone = `${ driver }/${ language }/${ framework }`
            console.log(chalk.cyanBright("Config options"), {
                driver,
                language,
                framework
            });
            const newFolderExists: any = fs.existsSync(name)
            if(newFolderExists){
                console.log('The folder already exists', name);
                return false
            }

            const cloneRepo = child_process.spawn(`cd ${ path.resolve() } && git clone ${ repos[ repoToClone ] }`, {
                shell: true,
            })

            cloneRepo.on('error', () => {
                npmInstallSpinner.fail(
                    chalk.red(
                        `
                    An error occurred, please try again. 
                    If problem persist please raise an issue on Github https://github.com/cipher-tech/nodejs-boilerplate-cli`
                    )
                );
            });

            return await new Promise((resolve, reject) => {
                cloneRepo.on('close', async () => {
                    try {
                        npmInstallSpinner.succeed(chalk.green(` Repo cloned successfully!!!... `));

                        const repoExists: any = fs.existsSync("node_express_boilerplate")

                        if (!repoExists || !newFolderExists) {
                            await fsRename('node_express_boilerplate', name)
                        } else {
                            console.log('The file already exists');
                        }
                        resolve(true)
                    } catch (error) {
                        console.log("There was an error while renaming boilerplate");
                        throw error
                    }
                });

            })

        } catch (error) {
            console.log("There was an error while generating boilerplate");
            throw error
        }
    }
    async addConfigFile(options: IGenerateBoilerplateOptions) {
        const { name } = options
        const fsAccess = promisify(fs.access)

        try {
            console.log(chalk.cyan("Generating CLI config file ..."));

            console.log(chalk.cyan("Cli config options"), options);
            const hasAccess: any = await fsAccess(name, fs.constants.F_OK)
            if (!hasAccess) {
                await fsExtra.writeJSON(`./${ name }/.clirc.json`, options)
            } else {
                console.log(chalk.red('The folder doesn\'t exists'));
            }

            console.log(chalk.cyan("Finished generating CLI config file."));
        } catch (error) {
            console.log(chalk.red("An error while generating CLI config file."));
            console.error(error);
        }

    }
    async installDependencies(name: string) {
        npmInstallSpinner.start(chalk.cyan(`Installing dependencies for ${ name }`));
        const { default: child_process } = await import("child_process");
        const childProcess = child_process.spawn(`cd ${ name } && npm install`, {
            shell: true,
        })

        childProcess.on('error', () => {
            npmInstallSpinner.fail(
                chalk.red(
                    `
                    An error occurred, please try again. 
                    If problem persist please raise an issue on Github
                `
                )
            );
        });

        childProcess.on('close', () => {
            npmInstallSpinner.succeed(chalk.green(`Packages installed successfully`));

            console.log(
                chalk.green(`
              🥳🥳🥳🥳🥳
            Voila!!! ${ name } is ready for development. 
        
            Create something Awesome
               🚀🚀🚀🚀🚀
        
            For How to use and more info on cli
            Visit  https://github.com/cipher-tech/node_express_boilerplate
            Cheers!!!
        
            `)
            );
        });
    }
    async create(name: string) {
        try {
            const userOptions = await this.requestOptions();
            if (!(userOptions?.driver && userOptions?.language)) {
                return new Error("Error while resolving driver or language")
            }
            creatingProjectSpinner.start(chalk.cyan(`Creating ${ name }`));
            console.log(chalk.cyan("Generating Boilerplate ..."));
            const generatedProject = await this.generateBoilerplate({ name, ...userOptions })
            console.log("Boilerplate generated successfully.");
            creatingProjectSpinner.succeed(chalk.green(`${ name } created successfully`));

            await this.addConfigFile({ name, ...userOptions })

            await this.installDependencies(name)
            return userOptions;
        } catch (error) {
            throw error
        }
    }
}

export default NewProject