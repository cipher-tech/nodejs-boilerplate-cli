var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import inquirer from "inquirer";
class NewProject {
    promptUserForOptions() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userSettings = yield inquirer.prompt([
                    {
                        type: 'list',
                        name: 'selectedLanguage',
                        message: 'Select a language',
                        choices: ['Javascript', 'Typescript'],
                        default: 'javascript'
                    },
                    {
                        type: 'list',
                        name: 'selectDbDriver',
                        message: 'Select a database driver',
                        choices: ['Sequelize'],
                        default: 'Sequelize'
                    }
                ]);
                console.log("::::::::: userSettings userSettings", userSettings);
            }
            catch (error) {
                console.log("ad error occurred please try again");
            }
        });
    }
}
export default NewProject;
//# sourceMappingURL=newProject.js.map