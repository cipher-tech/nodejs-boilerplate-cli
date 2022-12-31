#!/usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Command } from "commander";
import { Generate } from "./generate";
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
    .action((str, options) => {
    const limit = options.first ? 1 : undefined;
    console.log(str.split(options.separator, limit));
});
program.command('create')
    .description('Create a new project')
    .argument('<string>', 'Specify the project name')
    .action((name, options) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("::::::: logs", { name, options });
    const newProject = new NewProject();
    const response = yield newProject.create(name);
    console.log("::::::: response log", response);
    return;
}));
program.command('make')
    .description('Generate project files')
    .option('-m, --model <string>', 'Generate a model file')
    .action((options) => __awaiter(void 0, void 0, void 0, function* () {
    const generate = new Generate();
    console.log("::::::: make", { options });
    generate.run(options);
    return;
}));
program.parse();
//# sourceMappingURL=index.js.map