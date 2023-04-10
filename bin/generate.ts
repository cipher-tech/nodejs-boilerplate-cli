import chalk from "chalk";
import fs from "fs";
import path from "path";
import util from "util";

import { IGenerateCliOptions } from ".";
import { IConfigOptions } from "./constants";
import { getCliConfig, generateFile, addRouteToIndex } from "./util/helper";

type IMakeResource = {
    model: string;
    controller: string
    service: string
    route: string
}
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

    async makeModel(options: IGenerateCliOptions | IMakeResource, config: IConfigOptions) {
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
                placeholder: [ 'User', "user" ],
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

    async makeController(options: IGenerateCliOptions | IMakeResource, config: IConfigOptions) {
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
                placeholder: [ 'AuthController' ],
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

    async makeService(options: IGenerateCliOptions | IMakeResource, config: IConfigOptions) {
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
                placeholder: [ 'TemplateService' ],
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

    async makeRoute(options: IGenerateCliOptions | IMakeResource, config: IConfigOptions) {
        try {
            const { route = null } = options
            if (!route) {
                return;
            }
            if (route.startsWith('/')) {
                console.log(chalk.red(`Filename cannot start with '/'`));
                throw new Error(`Filename cannot start with '/'`)
            }
            console.log(chalk.green(`Creating route ${ route }`));

            let { extension } = this.formatConfigOptions(config);
            const filename = route.toLocaleLowerCase().endsWith('Route') ? route : `${ route }Route`

            console.log(chalk.green(`Generating route template ${ route }`));

            const source = this.getFileSource(config, '/route/template');
            const destination = `./routes/${ filename }.${ extension }`;
            let destinationFolder: string | string[] = destination.split("/");
            destinationFolder.pop();

            await generateFile({
                destination,
                source,
                filename,
                placeholder: [ 'UserRoute' ],
                extension,
                addIndex: false
            })

            console.log(chalk.green(`Finish creating route ${ route }`));
            console.log(chalk.green(`Adding route '${ route }' to index file`));
            await addRouteToIndex(filename)
            console.log(chalk.green(`Finished adding route '${ route }' to index file`));

            return true
        } catch (error) {
            console.log(chalk.red(`An error occurred while generating route file.`));
            throw error
        }
    }

    async makeResource(options: IGenerateCliOptions, config: IConfigOptions) {
        try {
            const { resource = null } = options
            if (!resource) {
                return;
            }
            console.log(chalk.green(`Creating service ${ resource }`));

            const resourceMap = {
                model: resource,
                controller: resource,
                service: resource,
                route: resource
            }

            await this.makeModel(resourceMap, config);
            await this.makeController(resourceMap, config);
            await this.makeService(resourceMap, config);
            await this.makeRoute(resourceMap, config);

            console.log(chalk.green(`Finished creating service ${ resource }`));
            return true
        } catch (error) {
            console.log(chalk.red(`An error occurred while generating route file.`));
            throw error
        }
    }


    async makeUtility(options: IGenerateCliOptions, config: IConfigOptions) {
        try {
            const { utility = null } = options
            if (!utility) {
                return;
            }

            console.log(chalk.green(`Creating utility ${ utility }`));

            let { extension } = this.formatConfigOptions(config);
            const filename = utility.toLocaleLowerCase().endsWith('Helper') ? utility : `${ utility }Helper`

            console.log(chalk.green(`Generating utility template ${ utility }`));

            const source = this.getFileSource(config, '/utils/template');
            const destination = `./app/utils/${ filename }.${ extension }`;
            let destinationFolder: string | string[] = destination.split("/");
            destinationFolder.pop();

            await generateFile({
                destination,
                source,
                filename,
                placeholder: [ 'Template' ],
                extension,
                addIndex: true
            })

            console.log(chalk.green(`Finish creating utility ${ utility }`));
            return true
        } catch (error) {
            console.log(chalk.red(`An error occurred while generating utility file.`));
            throw error
        }

    }

    async makeMiddleware(options: IGenerateCliOptions, config: IConfigOptions) {
        try {
            const { middleware = null } = options
            if (!middleware) {
                return;
            }

            console.log(chalk.green(`Creating middleware ${ middleware }`));
            let { extension } = this.formatConfigOptions(config);
            const filename = middleware.toLocaleLowerCase().endsWith('middleware') ? middleware : `${ middleware }Middleware`

            console.log(chalk.green(`Generating middleware template ${ middleware }`));

            const source = this.getFileSource(config, '/middleware/template');
            const destination = `./app/http/middleware/${ filename }.${ extension }`;
            let destinationFolder: string | string[] = destination.split("/");
            destinationFolder.pop();

            await generateFile({
                destination,
                source,
                filename,
                placeholder: [ 'Template' ],
                extension,
                addIndex: true
            })

            console.log(chalk.green(`Finish creating middleware ${ middleware }`));
            return true
        } catch (error) {
            console.log(chalk.red(`An error occurred while generating middleware file.`));
            throw error
        }
    }

    async makeValidator(options: IGenerateCliOptions, config: IConfigOptions) {
        try {
            const { validator = null } = options
            if (!validator) {
                return;
            }

            console.log(chalk.green(`Creating validator file ${ validator }`));
            let { extension } = this.formatConfigOptions(config);
            const filename = validator.toLocaleLowerCase().endsWith('validator') ? validator : `${ validator }Validator`

            console.log(chalk.green(`Generating validator template ${ validator }`));

            const source = this.getFileSource(config, '/validator/template');
            const destination = `./app/http/validator/${ filename }.${ extension }`;
            let destinationFolder: string | string[] = destination.split("/");
            destinationFolder.pop();

            await generateFile({
                destination,
                source,
                filename,
                placeholder: [ 'Template' ],
                extension,
                addIndex: true
            })

            console.log(chalk.green(`Finish creating validator ${ validator }`));
            return true
        } catch (error) {
            console.log(chalk.red(`An error occurred while generating validator file.`));
            throw error
        }
    }

    async makeUnittest(options: IGenerateCliOptions, config: IConfigOptions) {
        try {
            const { unittest = null } = options
            if (!unittest) {
                return;
            }

            console.log(chalk.green(`Creating unittest file ${ unittest }`));
            let { extension } = this.formatConfigOptions(config);
            const filename = unittest.toLocaleLowerCase().endsWith('.test') ? unittest : `${ unittest }.test`

            console.log(chalk.green(`Generating unit test template ${ unittest }`));

            const source = this.getFileSource(config, '/test/unittest');
            const destination = `./test/unit/${ filename }.${ extension }`;
            let destinationFolder: string | string[] = destination.split("/");
            destinationFolder.pop();

            await generateFile({
                destination,
                source,
                filename: unittest,
                placeholder: [ 'Template' ],
                extension,
                addIndex: false
            })

            console.log(chalk.green(`Finish creating unit test ${ unittest }`));
            return true
        } catch (error) {
            console.log(chalk.red(`An error occurred while generating unit test file.`));
            throw error
        }
    }

    async run(options: any) {
        try {
            const config = await getCliConfig();
            await this.makeModel(options, config);
            await this.makeController(options, config);
            await this.makeService(options, config);
            await this.makeRoute(options, config);
            await this.makeResource(options, config)
            await this.makeUtility(options, config)
            await this.makeMiddleware(options, config)
            await this.makeValidator(options, config)
            await this.makeUnittest(options, config)
            return;
        } catch (error: any) {
            console.log(chalk.red("Error: and error occurred"));
            throw new Error(error)
        }
    }
}