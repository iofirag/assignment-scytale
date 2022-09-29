const express = require('express');
const fs = require('fs');
const yaml = require('js-yaml');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const oasTools = require('@oas-tools/core');
const container = require('./containerConfig');

const app = express();

(async () => {
    const serviceData = container.resolve('serviceData');
    const serverConfig = container.resolve('serverConfig');
    const mongooseService = container.resolve('mongooseService');
    const prModel = container.resolve('prModel');
    const logger = container.resolve('logger');
    const probe = container.resolve('probe');
    const source = container.resolve('source');
    const oasConfig = container.resolve('oasConfig');
    const oasFile = yaml.load(fs.readFileSync('api/oas.yaml', 'utf8'));
    const serverPort = serverConfig ? serverConfig.port : 3000;

    logger.log('info', serviceData);
    logger.log('info', source);

    try {
        await mongooseService.init();
        await prModel.init();

        app.use(cors());
        app.use(cookieParser());
        app.use(morgan('combined'));
        app.use(express.json({ limit: '50mb' }));
        app.use(express.urlencoded({ extended: true }));
        app.get('/api-docs', (req, res) => res.json(oasFile));

        await oasTools.initialize(app, oasConfig);
        // Start the server
        await probe.start(app, serverPort);
        probe.readyFlag = true;
        logger.log(
            'info',
            `your server is listening on http://localhost:${serverPort} 
        Swagger-ui API is available on http://localhost:${serverPort}/docs 
        Swagger-ui API-DOC is available on http://localhost:${serverPort}/api-docs`
        );
    } catch (error) {
        probe.readyFlag = false;
        probe.liveFlag = false;
        logger.log('error', `cannot start server ${error}`);
        probe.addError(error);
    }
})();
