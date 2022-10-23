#!usr/bin/env/ node

import {Command} from "commander";
import NewProject from "./newProject";

const program = new Command();

program
    .name('string-util')
    .description('CLI to some JavaScript string utilities')
    .version('0.1.0');

program.command('split')
    .description('Split a string into substrings and display as an array')
    .argument('<string>', 'string to split')
    .option('--first', 'display just the first substring')
    .option('-s, --separator <char>', 'separator character', ',')
    .action((str: any, options: any) => {
        const limit = options.first ? 1 : undefined;
        console.log(str.split(options.separator, limit));
    });

program.command('create')
    .description('Create a new project')
    .argument('<string>', 'Specify the project name')
    .action(async (name: string, options: any) => {
        console.log("::::::; logs", { name, options });
        const newProject = new NewProject();
        const response = await newProject.create(name);
        console.log("::::::: response log", response);
        
    });

program.parse();