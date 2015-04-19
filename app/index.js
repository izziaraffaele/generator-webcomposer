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
            name: 'features',
            message: 'What more would you like?',
            choices: [{
                name: 'Auth system',
                value: 'includeAuth',
                checked: true
            }]
        }];

        this.prompt(prompts, function (answers) {
            var features = answers.features;

            this.projectName = answers.project || 'myApp';

            function hasFeature(feat) { return features.indexOf(feat) !== -1; }

            // manually deal with the response, get back and store the results.
            // we change a bit this way of doing to automatically do this in the self.prompt() method.
            this.includeAuth = hasFeature('includeAuth');

            done();
        }.bind(this));
    },
    templates: function() {
        this.composeWith('silex-skelethon', { projectName:this.projectName},{
            local: require.resolve('generator-silex-skelethon')
        });
        this.composeWith('webcomposer-frontend', { projectName:this.projectName},{
            local: require.resolve('generator-webcomposer-frontend')
        });
    },
    app: function () {
        this.template('_package.json', 'package.json',{'projectName':this.projectName});
        this.copy('gitignore', '.gitignore');
    }
});

module.exports = Generator;
