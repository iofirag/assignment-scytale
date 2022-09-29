const Awilix = require("awilix");
const config = require("config");
const MongooseService = require("./services/mongooseService");
const Logger = require('./services/loggerService');
const Tracer = require("./services/tracerService");
const Probe = require("./services/probeService");
const pkgJson = require("./package.json");

const PRService = require("./features/PR/PRService");
const PRLogic = require("./features/PR/PRLogic");
const PRData = require("./features/PR/PRData");

const PRModel = require("./models/PRModel");

const container = Awilix.createContainer({
    injectionMode: Awilix.InjectionMode.CLASSIC,
});
container.register({
    // Values
    source: Awilix.asValue(config.get("source")),
    oasConfig: Awilix.asValue(config.get("oas")),
    serverConfig: Awilix.asValue(config.get('server')),
    serviceData: Awilix.asValue({
        name: pkgJson.name,
        component: pkgJson.name,
        version: pkgJson.version
    }),
    // Classes
    prService: Awilix.asClass(PRService).singleton(),
    prLogic: Awilix.asClass(PRLogic).singleton(),
    prData: Awilix.asClass(PRData).singleton(),
    prModel: Awilix.asClass(PRModel).singleton(),
    // Vendor classes
    mongooseService: Awilix.asClass(MongooseService).inject(() => ({ config: config.get('mongoDB') })).singleton(),
    logger: Awilix.asClass(Logger).inject(() => ({ config: config.get('log') })).singleton(),
    probe: Awilix.asClass(Probe).inject(() => ({ config: config.get('probe') })).singleton(),
    tracer: Awilix.asClass(Tracer).inject(() => ({ config: config.get('tracer') })).singleton(),
});

module.exports = container;