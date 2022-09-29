const Awilix = require("awilix");
const config = require("config");
const FirebaseService = require("./services/firebaseService");
const HttpService = require('./services/httpService');
const Logger = require('./services/loggerService');
const Tracer = require("./services/tracerService");
const Probe = require("./services/probeService");
const pkgJson = require("./package.json");

const PRService = require("./features/example1/PRService");
const PRLogic = require("./features/example1/PRLogic");
const PRData = require("./features/example1/PRData");

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
    // Vendor classes
    firebaseService: Awilix.asClass(FirebaseService).inject(() => ({ config: config.get('firebase') })).singleton(),
    httpService: Awilix.asClass(HttpService).inject(() => ({ config: config.get('http') })).singleton(),
    logger: Awilix.asClass(Logger).inject(() => ({ config: config.get('log') })).singleton(),
    probe: Awilix.asClass(Probe).inject(() => ({ config: config.get('probe') })).singleton(),
    tracer: Awilix.asClass(Tracer).inject(() => ({ config: config.get('tracer') })).singleton(),
});

module.exports = container;