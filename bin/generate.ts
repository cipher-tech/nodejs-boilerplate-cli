import chalk from "chalk";
import fs from "fs";
import path from "path";

import { IGenerateCliOptions } from ".";
import { IConfigOptions } from "./constants";
import { getCliConfig, fileExists as fileAccess, createFile } from "./util/helper";

export class Generate {
    formatConfigOptions(config: IConfigOptions) {
        let { language: lang, driver: dbDriver, framework: projectFramework } = config

        return {
            language: lang.toLowerCase(),
            driver: dbDriver.toLowerCase(),
            framework: projectFramework.toLowerCase(),
            extension: lang.toLowerCase() === "javascript" ? "js" : "ts",
        }
    }

    getFileSource(config: IConfigOptions, folderPath: string) {
        let { language, driver, framework, extension } = this.formatConfigOptions(config);
        return path.resolve(__dirname, `./../../lib/${ driver }/${ language }/${ framework }${ folderPath }`);
    }
    async makeModel(options: IGenerateCliOptions, config: IConfigOptions) {
        try {
            const { model = null } = options
            if (!model) {
                return;
            }
            console.log(chalk.green(`Creating model ${ model }`));
            let { extension } = this.formatConfigOptions(config);

            const source = this.getFileSource(config, '/model/template.js');
            const destination = `./database/models/${ model }.${ extension }`;

            await createFile(model, source, destination)

            const generatedModelTemplate = fs.readFileSync(destination).toString();

            let updatedModelTemplate = generatedModelTemplate.replace(/user/g, model);
            updatedModelTemplate = updatedModelTemplate.replace(/User/g, (model || "").charAt(0).toLocaleUpperCase() + (model || "").slice(1))

            fs.writeFileSync(destination, updatedModelTemplate);
            console.log(chalk.green(`Finished creating model ${ model }`));
            return true
        } catch (error) {
            console.log(chalk.red(`An error occurred while generating model file.`));
            throw error
        }
    }

    async makeController(options: IGenerateCliOptions, config: IConfigOptions) {
        try {
            const { controller = null } = options
            if (!controller) {
                return;
            }
            console.log(chalk.green(`Creating controller ${ controller }`));
            let { extension } = this.formatConfigOptions(config);
            const filename = controller.endsWith('Controller') ? controller : `${ controller }Controller`

            const source = this.getFileSource(config, '/controller/template.js');
            const destination = `./app/http/controllers/${ filename }.${ extension }`;

            await createFile(filename, source, destination)

            const generatedModelTemplate = fs.readFileSync(destination).toString();

            let updatedModelTemplate = generatedModelTemplate.replace(/AuthController/g, (filename || "").charAt(0).toLocaleUpperCase() + (filename || "").slice(1))

            fs.writeFileSync(destination, updatedModelTemplate);

            const data = fs.readFileSync(`./app/http/controllers/index.${ extension }`).toString().split('\n');
            let done = false;
            let addedImport = false
            let addedExport = false
            data.forEach((item, index) => {
                if (item.includes('import') &&
                    addedImport === false &&
                    index !== 0
                ) {
                    const newImport = `import ${ filename }Class from './${ filename }';`;

                    data.splice(index, 0, newImport);


                    addedImport = true;
                } 
                if (item.includes('export') &&
                    done === false &&
                    addedExport === false &&
                    index !== 0
                ) {
                    const newExport = `export const ${ filename } = ${ filename }Class;`;
                    data.splice(index, 0, newExport);

                    addedExport = true;
                    done = true;
                }
            });
            const addNewImport = data.join('\n');
            fs.writeFileSync(`./app/http/controllers/index.${ extension }`, addNewImport);

            console.log(chalk.green(`Finished creating controller ${ filename }`));

            return true
        } catch (error) {
            console.log(chalk.red(`An error occurred while generating controller file.`));
            throw error
        }

    }
    async run(options: any) {
        try {
            const config = await getCliConfig();
            await this.makeModel(options, config);
            await this.makeController(options, config);

            return;
        } catch (error: any) {
            console.log(chalk.red("Error: and error occurred"));
            throw new Error(error)
        }
    }
}