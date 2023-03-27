#!/usr/bin/env node

const shell = require("shelljs");
const inquirer = require("inquirer");

const targetRepo = "https://github.com/anungbisa4/moose.git";

//Check if git is enable
if (!shell.which("git")) {
  shell.echo("Sorry, this script requires git");
  shell.exit(1);
}

const questions = [
  {
    type: "input",
    name: "projectName",
    message: "Please enter your new project's name.",
    default: "moose-project",
  },
];

inquirer.prompt(questions).then((answers) => {
  let branchName = "main";
  const { projectName, languageType } = answers;
  console.log("--------------------");
  console.log("Your preferences:");
  console.log(`Language type: ${languageType}`);

  console.log("--------------------");
  shell.exec(`mkdir ${projectName}`);
  shell.cd(`${projectName}`);
  shell.exec(`git clone ${targetRepo} .`);

  shell.exec(`git checkout -B ${branchName} remotes/origin/${branchName}`);
  // shell.exec("git checkout --orphan latest_branch");
  // shell.exec("git add -A");
  // shell.exec('git commit -am "init the new project and install Next.js"');
  // shell.exec(`git branch -D ${branchName}`);
  // shell.exec("git branch -m master");
  // shell.exec("git branch -D main");
  shell.exec("git remote remove origin");
  shell.exec("yarn install");
  shell.echo("New project has been created!");
});
