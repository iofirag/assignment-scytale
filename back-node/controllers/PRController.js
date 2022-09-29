const container = require('../containerConfig');

const prService = container.resolve('prService');

module.exports.getAllPR = prService.getAllPR.bind(prService);
module.exports.createPR = prService.createPR.bind(prService);