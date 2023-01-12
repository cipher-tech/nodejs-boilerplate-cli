import chalk from "chalk";
import fsExtra from "fs-extra";
import util from "util";
import path from "path";
import fs from "fs"

import { cliConfigName } from "../constants";

export const capitalize = (text: string) => {
    return (text || "").charAt(0).toLocaleUpperCase() + (text || "").slice(1)
}
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
    if (data.length <= 1) {
        const newImport = `import ${ importName }Class from './${ importName }'; \n`;
        data.push(newImport);

        const newExport = `export const ${ importName } = ${ importName }Class;`;
        data.push(newExport);
    } else {
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            if (item.includes('import') &&
                addedImport === false &&
                i !== 0
            ) {
                const newImport = `import ${ importName }Class from './${ importName }';`;

                data.splice(i, 0, newImport);
                addedImport = true;
            }
            if (item.includes('export') &&
                done === false &&
                addedExport === false &&
                i !== 0
            ) {
                const newExport = `export const ${ importName } = ${ importName }Class;`;
                data.splice(i, 0, newExport);

                addedExport = true;
                done = true;
            }
        };
    }

    fs.writeFileSync(destination, data.join('\n'));
    return true
}

