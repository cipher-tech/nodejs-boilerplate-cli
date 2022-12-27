import chalk from "chalk";
import fs from "fs"
import fsExtra from "fs-extra";
import path from "path";
import util from "util";

import { cliConfigName } from "./constants";
export class Generate {
    async getCliConfig() {
        try {
            const cliConfig = await fsExtra.readFile(`./${ cliConfigName }`);
            return JSON.parse(cliConfig.toString());
        } catch (error) {
            console.log(chalk.red(`An error occurred while getting cli config. 
            Please ensure that theres a 'clirc.json' file in the project directory.
            see project GitHub page for more info.`));
            throw error
        }

    }
    async fileExists(path: string) {
        const fsAccess = util.promisify(fs.access);

        try {
            const fileExist = await new Promise((resolve, reject) => {
                resolve(fsAccess(path, fs.constants.F_OK))
            })
            return true;
        } catch (error) {
            // file does not exists
            return false
        }
    }
    async model(options: any, config: any) {
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

            const source = `./../../lib/${ driver }/${ language }/${ framework }/model/template.js`;
            const destination = `./database/models/${ model }.${ extension }`;

            const fileExists = await this.fileExists(destination)
            console.log("File with name already exists", fileExists);
            if (fileExists) {
                console.log("File with name already exists");
                return;
            }
            console.log({
                source,
                destination
            });
            await fsExtra.copy(path.resolve(__dirname, source), destination);
            return true
        } catch (error) {
            console.log(chalk.red(`An error occurred while generating model file.`));
            throw error
        }
    }

    async run(options: any) {
        try {
            const config = await this.getCliConfig();
            console.log("::::::::: ri", config, options);
            await this.model(options, config);

            return;
        } catch (error: any) {
            console.log(chalk.red("Error: and error occurred"));
            throw new Error(error)
        }
    }
}