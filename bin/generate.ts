import chalk from "chalk";
import fsExtra from "fs-extra";
import path from "path";

import { IGenerateCliOptions } from ".";
import { getCliConfig, fileExists as fileAccess, createFile } from "./util/helper";

export class Generate {

    async model(options: IGenerateCliOptions, config: any) {
        try {
            const { model = null } = options
            let { language: lang, driver: dbDriver, framework: projectFramework } = config

            const language = lang.toLowerCase();
            const driver = dbDriver.toLowerCase();
            const framework = projectFramework.toLowerCase();
            const extension = language === "javascript" ? "js" : "ts";
            if (!model) {
                return;
            }

            const source =path.resolve(__dirname, `./../../lib/${ driver }/${ language }/${ framework }/model/template.js`) ;
            const destination = `./database/models/${ model }.${ extension }`;

            await createFile(model, source, destination)
            return true
        } catch (error) {
            console.log(chalk.red(`An error occurred while generating model file.`));
            throw error
        }
    }

    async run(options: any) {
        try {
            const config = await getCliConfig();
            console.log("::::::::: ri", config, options);
            await this.model(options, config);

            return;
        } catch (error: any) {
            console.log(chalk.red("Error: and error occurred"));
            throw new Error(error)
        }
    }
}