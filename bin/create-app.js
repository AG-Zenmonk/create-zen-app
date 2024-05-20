#!/usr/bin/env node
const readline = require('readline');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

//check for dir name argv
if (process.argv.length < 3) {
    console.log('You have to provide a name to your app.');
    console.log('For example :');
    console.log('    npx my-next-template my-app');
    process.exit(1);
}
const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const git_repo = "https://github.com/AG-Zenmonk/create-zen-app.git";
const yes = new RegExp("yes","i")
//check for available directory
try {
    fs.mkdirSync(projectPath);
} catch (err) {
    if (err.code === 'EEXIST') {
        console.log(`The file ${projectName} already exist in the current directory, please give it another name.`);
    } else {
        console.log(error);
    }
    process.exit(1);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


async function main() {
    try {
        console.log('Downloading files...');
        execSync(`git clone --depth 1 ${git_repo} ${projectPath}`);

        process.chdir(projectPath);

        console.log('Installing dependencies...');
        execSync('cd frontend && npm install');

        console.log('Removing useless files');
        execSync('npx rimraf ./.git');
        fs.rmSync(path.join(projectPath, 'bin'), { recursive: true });

        console.log('The installation is done, this is ready to use !');

    } catch (error) {
        console.log(error);
    }
}

rl.question('Which directory do you want to install Zen-ui-next-tempelete(Yes/No) ? ', (directory) => {

    try {
        if (yes.test(directory)) {
            main()
            console.log('===Zen-ui-next-tempelete installed successfully===');
        }
        else {
            console.log('===Operation Terminated successfully===');
            fs.rmdirSync(projectPath);
        }
    } catch (error) {
        console.log('Error executing command:', error);
    }
    rl.close();
});