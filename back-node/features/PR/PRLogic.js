const opentracing = require('opentracing');

module.exports = class PRLogic {    // Business logic
    constructor(prData, logger, tracer, serviceData) {
        this._prData = prData;
        this._logger = logger;
        this._tracer = tracer;
        this._serviceData = serviceData;
    }

    async getAllPR() {
        try {
            return await this._prData.getAllPR();
        } catch (error) {
            this._logger.log('error', `${this.constructor.name} - ${this.getAllPR.name} - ${error.message}`);
            throw error;
        }
    }

    async createPR(data) {
        try {
            if (!data) {
                throw new Error('empty value');
            }
            return await this._prData.createPR(data);
        } catch (error) {
            this._logger.log('error', `${this.constructor.name} - ${this.createPR.name} - ${error.message}`);
            throw error;
        }
    }
};
