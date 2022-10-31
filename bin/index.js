#!usr/bin/env/ node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const newProject_1 = __importDefault(require("./newProject"));
const program = new commander_1.Command();
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
    console.log("::::::; logs", { name, options });
    const newProject = new newProject_1.default();
    const response = yield newProject.create(name);
    console.log("::::::: response log", response);
}));
program.parse();