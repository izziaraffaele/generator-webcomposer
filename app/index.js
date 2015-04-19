'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var Generator = yeoman.generators.Base.extend({
    init: function () {
        this.pkg = yeoman.file.readJSON(path.join(__dirname, '../package.json'));
        this.on('end', function () {
            if (!this.options['skip-install']) {
                this.installDependencies();
                this.spawnCommand('composer', ['install']);
                this.spawnCommand('chmod', ['-R','777','storage']);
            }
        });
    },
    askFor: function () {
        var done = this.async();

        // have Yeoman greet the user
        console.log(this.yeoman);

        // replace it with a short and sweet description of your generator
        console.log(chalk.magenta('You\'re using A Yeoman Generator for a Silex based web app!!'));

        var prompts = [{
            name: 'project',
            message: 'What is this project\'s name?'
        },
        {
            type: 'checkbox',
            name: 'modules',
            message: 'What more would you like?',
            choices: [{
                name: 'Auth system',
                value: 'Auth',
                checked: true
            }]
        }];

        this.prompt(prompts, function (answers) {
            this.modules = answers.modules;
            this.projectName = answers.project || 'myApp';
            done();
        }.bind(this));
    },
    templates: function() {
        this.composeWith('silex-skelethon', {options:{projectName:this.projectName}},{
            local: require.resolve('generator-silex-skelethon')
        });
        this.composeWith('webcomposer-frontend', {options:{projectName:this.projectName}},{
            local: require.resolve('generator-webcomposer-frontend')
        });
        this.composeWith('webcomposer-modules', {options:{projectName:this.projectName,modules:this.modules}},{
            local: require.resolve('generator-webcomposer-modules')
        });
    },
    app: function () {
        this.template('_package.json', 'package.json',{'projectName':this.projectName});
        this.copy('gitignore', '.gitignore');
    }
});

module.exports = Generator;
