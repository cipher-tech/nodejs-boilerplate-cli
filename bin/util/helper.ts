import chalk from "chalk";
import fsExtra from "fs-extra";
import util from "util";
import path from "path";
import fs from "fs"

import { cliConfigName } from "../constants";

export const getCliConfig = async () => {
    try {
        // read config options from cliConfigrc.jsonfile
        const cliConfig = await fsExtra.readFile(`./${ cliConfigName }`);
        return JSON.parse(cliConfig.toString());
    } catch (error) {
        console.log(chalk.red(`An error occurred while getting cli config. 
        Please ensure that theres a 'clirc.json' file in the project directory.
        see project GitHub page for more info.`));
        throw error
    }

}

export const fileExists = async (path: string) => {
    // convert async callback function to async/await 
    const fsAccess = util.promisify(fs.access);

    try {
        // check if file exists
        const fileExist = await new Promise((resolve, reject) => {
            resolve(fsAccess(path, fs.constants.F_OK))
        })
        return true;
    } catch (error) {
        // file does not exists
        return false
    }
}

export const createFile = async (fileName: string, source: string, destination: string) => {
    const fileAccess = await fileExists(destination)
    if (fileAccess) {
        console.log(chalk.cyan(`File with name: '${ fileName }' already exists`));
        return;
    }
    console.log({
        source,
        destination
    });
    await fsExtra.copy(path.resolve(__dirname, source), destination);
}

