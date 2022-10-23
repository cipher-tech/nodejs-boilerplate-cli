import inquirer from "inquirer";
import fs from "fs-extra";
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
            console.log(":;;;;;;;; copy copy", copy);

        } catch (error) {
            console.log(error);
            throw new Error("There was an error while generating boilerplate")
        }
    }
    async create(name: string) {
        try {
            const userOptions = await this.requestOptions();
            if (!(userOptions?.driver && userOptions?.language)) {
                return new Error("Error while resolving driver or language")
            }
            console.log("Generating Boilerplate ...");
            const generatedProject = await this.generateBoilerplate({ name, ...userOptions })
            console.log("Boilerplate generated successfully ...");
            return userOptions;
        } catch (error) {
            console.log(error);
        }
    }
}

export default NewProject