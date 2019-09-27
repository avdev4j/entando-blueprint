/* eslint-disable no-console */
/* eslint-disable consistent-return */
const chalk = require('chalk');
const EntityServerGenerator = require('generator-jhipster/generators/entity-server');
const { serverFiles, widgetFiles } = require('./files');

module.exports = class extends EntityServerGenerator {
    constructor(args, opts) {
        super(args, Object.assign({ fromBlueprint: true }, opts)); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint entando')}`);
        }

        this.configOptions = jhContext.configOptions || {};
        if (jhContext.databaseType === 'cassandra') {
            this.pkType = 'UUID';
        }
    }

    get initializing() {
        return super._initializing();
    }

    get prompting() {
        return super._prompting();
    }

    get configuring() {
        return super._configuring();
    }

    get default() {
        return super._default();
    }

    get writing() {
        const jhipsterPhase = super._writing();
        const myCustomSteps = {
            writeEntityServerFiles() {
                this.writeFilesToDisk(serverFiles, this, false, null);
            },
            writeWidgetFiles() {
                this.writeFilesToDisk(widgetFiles, this, false, null);
            }
        };
        return { ...jhipsterPhase, ...myCustomSteps };
    }

    get end() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._end();
    }
};
