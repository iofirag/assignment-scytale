const opentracing = require('opentracing');

module.exports = class PRData {
    constructor(logger, tracer, serviceData, prModel, mongooseService /*, firebaseService */) {
        this._prModel = prModel;
        this._mongooseService = mongooseService;
        // this._firebaseService = firebaseService;
        this._logger = logger;
        this._tracer = tracer;
        this._serviceData = serviceData;
    }

    async getAllPR() {
        // Using MongoDB
        return this._mongooseService.getAllDocs(this._prModel.modelName);
    }

    async createPR(prData) {
        // Using MongoDB
        return this._mongooseService.insert(this._prModel.modelName, prData);
    }
};
