#!/usr/bin/env node

import { Command } from "commander";
import { Generate } from "./generate.js";
import NewProject from "./newProject.js";

export type IGenerateCliOptions = {
    model: string
    controller: string
    service: string
    route: string
    resource: string
    utility: string
    middleware: string
    validator: string
    unittest: string
    integration_test: string
    test: string
}
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
        console.log("::::::: logs", { name, options });
        const newProject = new NewProject();
        const response = await newProject.create(name);
        console.log("::::::: response log", response);
        return
    });

program.command('make')
    .description('Generate project files')
    .option('-m, --model <string>', 'Generate a model file')
    .option('-c, --controller <string>', 'Generate a controller file')
    .option('-s, --service <string>', 'Generate a service file')
    .option('-r, --route <string>', 'Generate a route file')
    .option('-R, --resource <string>', 'Generate a new route, model, controller and service file in their respective directories')
    .option('-u, --utility <string>', 'Generate a route file')
    .option('-M, --middleware <string>', 'Generate a middleware file')
    .option('-v, --validator <string>', 'Generate a validator file')
    .option('-U, --unittest <string>', 'Generate a unit test file')
    .option('-I, --integration_test <string>', 'Generate a integration test file')
    .option('-T, --test <string>', 'Generate a integration and unit test files')
    .action(async (options: IGenerateCliOptions) => {
        const generate = new Generate();
        console.log("::::::: make", { options });
        generate.run(options) 
        return
    });

program.parse();