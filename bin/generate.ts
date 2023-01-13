import chalk from "chalk";
import fs from "fs";
import path from "path";
import util from "util";

import { IGenerateCliOptions } from ".";
import { IConfigOptions } from "./constants";
import { getCliConfig, createFile, addImportToIndexFile, capitalize, generateFile, createIndexFileInFolder } from "./util/helper";

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
        return path.resolve(__dirname, `./../../lib/${ driver }/${ language }/${ framework }${ folderPath }.${ extension }`);
    }

    async makeModel(options: IGenerateCliOptions, config: IConfigOptions) {
        try {
            const { model = null } = options
            if (!model) {
                return;
            }
            console.log(chalk.green(`Creating model ${ model }`));
            let { extension } = this.formatConfigOptions(config);

            const source = this.getFileSource(config, '/model/template');
            const destination = `./database/models/${ model }.${ extension }`;

            await generateFile({
                destination, 
                source, 
                filename: model, 
                placeholder:['User', "user"], 
                extension,
                addIndex: false
            })
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
            // get file extension
            let { extension } = this.formatConfigOptions(config);
            // get file name
            const filename = controller.toLocaleLowerCase().endsWith('Controller') ? controller : `${ controller }Controller`
            
            // define file source path to copy template
            const source = this.getFileSource(config, '/controller/template');
            // define file destination path to copy template to
            const destination = `./app/http/controllers/${ filename }.${ extension }`;
            // get the destination folder ./test/test.js === ./test/
            let destinationFolder: string | string[] = destination.split("/");
            destinationFolder.pop();

            await generateFile({
                destination, 
                source, 
                filename, 
                placeholder:['AuthController'], 
                extension,
                addIndex: true
            })

            console.log(chalk.green(`Finished creating controller ${ filename }`));
            return true
        } catch (error) {
            console.log(chalk.red(`An error occurred while generating controller file.`));
            throw error
        }

    }

    async makeService(options: IGenerateCliOptions, config: IConfigOptions) {
        try {
            const { service = null } = options
            if (!service) {
                return;
            }

            console.log(chalk.green(`Creating service ${ service }`));

            let { extension } = this.formatConfigOptions(config);
            const filename = service.toLocaleLowerCase().endsWith('Service') ? service : `${ service }Service`

            console.log(chalk.green(`Generating service template ${ service }`));

            const source = this.getFileSource(config, '/service/template');
            const destination = `./app/services/${ filename }.${ extension }`;
            let destinationFolder: string | string[] = destination.split("/");
            destinationFolder.pop();

            await generateFile({
                destination, 
                source, 
                filename, 
                placeholder:['TemplateService'], 
                extension,
                addIndex: true
            })

            console.log(chalk.green(`Finish creating service ${ service }`));
            return true
        } catch (error) {
            console.log(chalk.red(`An error occurred while generating service file.`));
            throw error
        }

    }

    async makeRoute(options: IGenerateCliOptions, config: IConfigOptions) {
        try {
            const { route = null } = options
            if (!route) {
                return;
            }

            console.log(chalk.green(`Creating route ${ route }`));

            return true
        } catch (error) {
            console.log(chalk.red(`An error occurred while generating route file.`));
            throw error
        }

    }
    async run(options: any) {
        try {
            const config = await getCliConfig();
            await this.makeModel(options, config);
            await this.makeController(options, config);
            await this.makeService(options, config);
            return;
        } catch (error: any) {
            console.log(chalk.red("Error: and error occurred"));
            throw new Error(error)
        }
    }
}