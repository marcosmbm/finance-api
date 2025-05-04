
module.exports = function (plop){
  plop.setGenerator("repository", {
    description: "Cria um repository padrão",
    prompts: [
      {
        type: "input",
        name: "entity",
        message: "Nome da entidade (ex: user)",
      },
      {
        type: "input",
        name: "name",
        message: "Nome da função (ex: get-user-by-id)",
      },
    ],
    actions: [
      {
        type: "add",
        path: "../src/repositories/postgres/{{kebabCase entity}}/{{kebabCase name}}.ts",
        templateFile: "./templates/repository.hbs",
      },
      {
        type: "add",
        path: "../src/repositories/postgres/{{kebabCase entity}}/index.ts",
        templateFile: "./templates/index.hbs",
        skipIfExists: true
      },
      {
        type: "append",
        path: "../src/repositories/postgres/{{kebabCase entity}}/index.ts",
        pattern: /(\/\/ PLOP:EXPORT)/,
        template: 'export * from "./{{kebabCase name}}";',
      },
      {
        type: "add",
        path: "../src/use-cases/{{kebabCase entity}}/{{kebabCase name}}.ts",
        templateFile: "./templates/use-case.hbs",
      },
      {
        type: "add",
        path: "../src/use-cases/{{kebabCase entity}}/index.ts",
        templateFile: "./templates/index.hbs",
        skipIfExists: true
      },
      {
        type: "append",
        path: "../src/use-cases/{{kebabCase entity}}/index.ts",
        pattern: /(\/\/ PLOP:EXPORT)/,
        template: 'export * from "./{{kebabCase name}}";',
      },
      {
        type: "add",
        path: "../src/controllers/{{kebabCase entity}}/{{kebabCase name}}.ts",
        templateFile: "./templates/controller.hbs",
      },
      {
        type: "add",
        path: "../src/controllers/{{kebabCase entity}}/index.ts",
        templateFile: "./templates/index.hbs",
        skipIfExists: true
      },
      {
        type: "append",
        path: "../src/controllers/{{kebabCase entity}}/index.ts",
        pattern: /(\/\/ PLOP:EXPORT)/,
        template: 'export * from "./{{kebabCase name}}";',
      },
    ],
  });
}
