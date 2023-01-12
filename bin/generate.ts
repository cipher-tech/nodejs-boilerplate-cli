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

            destinationFolder = destinationFolder.join('/');
            
            // copy file from source to destination
            await createFile(filename, source, destination)

            const generatedModelTemplate = fs.readFileSync(destination).toString();

            // replace placeholders in generated file
            let updatedModelTemplate = generatedModelTemplate.replace(/AuthController/g, capitalize(filename.split('/').slice(-1).join()))

            fs.writeFileSync(destination, updatedModelTemplate);


            const indexFileLocation = `${ destinationFolder }/index.${ extension }`;
            // check if index file exists in folder
            await createIndexFileInFolder(indexFileLocation);
            // import file in index folder
            addImportToIndexFile(indexFileLocation, extension, filename)

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

            generateFile({
                destination, 
                source, 
                filename, 
                placeholder:['TemplateService'], 
                extension,
                addIndex: true
            })
            // destinationFolder = destinationFolder.join('/');
            // await createFile(filename, source, destination)

            // console.log(chalk.green(`Finish Generating service template ${ service }`));

            // const generatedModelTemplate = fs.readFileSync(destination).toString();

            // let updatedModelTemplate = generatedModelTemplate.replace(/TemplateService/g, capitalize(filename.split('/').slice(-1).join()))
            // fs.writeFileSync(destination, updatedModelTemplate);

            // let indexFileLocation = `${ destinationFolder }/index.${ extension }`
            // // check if index file exists in folder
            // await this.createIndexFileInFolder(indexFileLocation);

            // addImportToIndexFile(indexFileLocation, extension, filename)

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