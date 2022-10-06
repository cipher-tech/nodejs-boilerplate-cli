import inquirer from "inquirer";
// interface IOptions {
//     language: "typescript" | "javascript"
//     framework: "express"
//     database: "sequelize" | "mongodb" 
// }  
  
type IOptions = {
    name: string;  
}

class NewProject {
    async promptUserForOptions() {
        try {
            const userSettings = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'selectedLanguage',
                    message: 'Select a language',
                    choices: [ 'Javascript', 'Typescript' ],
                    default: 'javascript'
                },
                {
                    type: 'list',
                    name: 'selectDbDriver',
                    message: 'Select a database driver',
                    choices: [ 'Sequelize' ],
                    default: 'Sequelize'
                }
            ])

            console.log("::::::::: userSettings userSettings", userSettings);
        } catch (error) {
            console.log("ad error occurred please try again");
        }
    }
}

export default NewProject