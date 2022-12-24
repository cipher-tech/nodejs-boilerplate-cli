type IRepos = {
    [ Key: string]: string
}

export const boilerplateURL = 'https://github.com/enyata/enyata-node-base.git'

export const repos: IRepos = {
    'sequelize/javascript/express': boilerplateURL
}
// map drivers to file name
export const drivers = {
    Sequelize: "sequelize",
    Mongoose: "mongoose",
} 

// map languages to file name
export const languages = {
    JavaScript: "javascript",
    TypeScript: "typescript",
}

export const framework = {
    Express: "express",
    Koa: "Koa",
}