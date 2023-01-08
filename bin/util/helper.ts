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
    if (!fileName || !source || !destination) {
        console.log(chalk.cyan(`An error occurred while creating file`));
        throw new Error(`An error occurred while creating file`);
    }

    const fileAccess = await fileExists(destination)

    if (fileAccess) {
        console.log(chalk.cyan(`File with name: '${ fileName }' already exists`));
        throw new Error(`File with name: '${ fileName }' already exists`);
    }
    await fsExtra.copy(source, destination);
    return true
}

export const addImportToIndexFile = (destination: string, extension: string, fileName: string) => {
    const data = fs.readFileSync(destination).toString().split('\n');
    let done = false;
    let addedImport = false
    let addedExport = false
    let importName = fileName.split('/').slice(-1)
    data.forEach((item, index) => {
        if (item.includes('import') &&
            addedImport === false &&
            index !== 0
        ) {
            const newImport = `import ${ importName }Class from './${ fileName }';`;

            data.splice(index, 0, newImport);
            addedImport = true;
        }
        if (item.includes('export') &&
            done === false &&
            addedExport === false &&
            index !== 0
        ) {
            const newExport = `export const ${ importName } = ${ importName }Class;`;
            data.splice(index, 0, newExport);

            addedExport = true;
            done = true;
        }
    });
    const addNewImport = data.join('\n');
    fs.writeFileSync(`./app/http/controllers/index.${ extension }`, addNewImport);
    return true
}

