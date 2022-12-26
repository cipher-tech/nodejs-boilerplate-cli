import chalk from "chalk";
import fsExtra from "fs-extra";
import { cliConfigName } from "./constants";
export class Generate {
    async getCliConfig() {
        try {
            const cliConfig = await fsExtra.readFile(`./${cliConfigName}`);
            return JSON.parse(cliConfig.toString());
        } catch (error) {
            console.log(chalk.red(`An error occurred while getting cli config. 
            Please ensure that theres a 'clirc.json' file in the project directory.
            see project GitHub page for more info.`));
            throw error
        }

    }
    async model(options: any, config: any) {
        const {model = null} = options
        if(!model){
            return;
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