import inquirer from "inquirer";
import fs from "fs-extra";
import ora from "ora";
import chalk from "chalk";
import path from "path";
import { drivers, languages, framework } from "./constants";

type ILanguage = "TypeScript" | "JavaScript";
type IDriver = "Mongoose" | "Sequelize";
type IFramework = "Express";


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
        try {
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
        } catch (error) {
            console.log(error);
        }
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
        try {
            console.log(":::::::;options options", options);
            const driver = this.verifyDrivers(options.driver)
            const language = this.verifyLanguage(options.language)
            const framework = this.verifyFramework(options.framework)
            console.log("::::::::::: verifyLanguage", {
                driver,
                language,
                framework
            });

            const copy = await fs.copy(path.resolve(__dirname, `./../lib/${ driver }/${ language }/${ framework }`),
                `./${ options.name }`)

        } catch (error) {
            console.log(error);
            throw new Error("There was an error while generating boilerplate")
        }
    }

    async installDependencies(name: string) {
        npmInstallSpinner.start(chalk.cyan(`Installing dependencies packages for ${ name }`));

        const { default: child_process } = await import("child_process");
        const childProcess = child_process.spawn(`cd ${name} && npm install`, {
            shell: true,
        })

        childProcess.on('error', () => {
            npmInstallSpinner.fail(
              chalk.red(
                `
                An error occurred, please try again. 
                If problem persist please raise an issue on Github`
              )
            );
          });
        
          childProcess.on('close', () => {
            npmInstallSpinner.succeed(chalk.green(`Packages installed successfully`));
        
            console.log(
              chalk.green(`
              🥳🥳🥳🥳🥳
            Voila!!! ${name} is ready for development. 
        
            Create something Awesome
               🚀🚀🚀🚀🚀
        
            For How to use and more info on express-api-cli
            Visit https://github.com/tolustar/express-api-cli/ 
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

            console.log("Generating Boilerplate ...");
            const generatedProject = await this.generateBoilerplate({ name, ...userOptions })
            console.log("Boilerplate generated successfully  ...");
            creatingProjectSpinner.succeed(chalk.green(`${ name } created successfully`));

            await this.installDependencies(name)
            return userOptions;
        } catch (error) {
            console.log(error);
        }
    }
}

export default NewProject