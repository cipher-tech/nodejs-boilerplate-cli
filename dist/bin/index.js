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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Command } from "commander";
import { Generate } from "./generate.js";
import NewProject from "./newProject.js";
var program = new Command();
program
    .name('string-util')
    .description('CLI to some JavaScript string utilities')
    .version('0.1.0');
program.command('split')
    .description('Split a string into substrings and display as an array')
    .argument('<string>', 'string to split')
    .option('--first', 'display just the first substring')
    .option('-s, --separator <char>', 'separator character', ',')
    .action(function (str, options) {
    var limit = options.first ? 1 : undefined;
    console.log(str.split(options.separator, limit));
});
program.command('create')
    .description('Create a new project')
    .argument('<string>', 'Specify the project name')
    .action(function (name, options) { return __awaiter(void 0, void 0, void 0, function () {
    var newProject, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("::::::: logs", { name: name, options: options });
                newProject = new NewProject();
                return [4 /*yield*/, newProject.create(name)];
            case 1:
                response = _a.sent();
                console.log("::::::: response log", response);
                return [2 /*return*/];
        }
    });
}); });
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
    .action(function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var generate;
    return __generator(this, function (_a) {
        generate = new Generate();
        console.log("::::::: make", { options: options });
        generate.run(options);
        return [2 /*return*/];
    });
}); });
program.parse();
//# sourceMappingURL=index.js.map