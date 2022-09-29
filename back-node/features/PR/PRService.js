const opentracing = require("opentracing");

module.exports = class PRService {  // API get data from request
    constructor(prLogic, logger, tracer, serviceData) {
        this._handler = prLogic;
        this._logger = logger;
        this._tracer = tracer;
        this._serviceData = serviceData;
    }

    async getAllPR(req, res) {
        let result;
        try {
            const prList = await this._handler.getAllPR();
            result = prList;
            this._logger.log('info', `${this.constructor.name} - ${this.createPR.name} - success`);
            res.statusCode = 200;
        } catch (error) {
            res.statusCode = 400;
            this._logger.log('error', `${this.constructor.name} - ${this.getAllPR.name} - ${error.message}`);
            throw error;
        } finally {
            res.setHeader('Content-Type', 'application/json');
            res.end(result ? JSON.stringify(result) : '');
        }
    }

    async createPR(req, res) {
        let result;
        try {
            const data = req.body;
            if (!data) {
                throw new Error('empty value');
            }
            const prItem = await this._handler.createPR(data);
            result = prItem;
            res.statusCode = 200;
            this._logger.log('info', `${this.constructor.name} - ${this.createPR.name} - success`);
        } catch (error) {
            res.statusCode = 400;
            this._logger.log('error', `${this.constructor.name} - ${this.createPR.name} - ${error.message}`);
            throw error;
        } finally {
            res.setHeader('Content-Type', 'application/json');
            res.end(result ? JSON.stringify(result) : '');
        }
    }
};