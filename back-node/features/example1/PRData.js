const opentracing = require('opentracing');

module.exports = class PRData {
    constructor(firebaseService, logger, tracer, serviceData) {
        this._firebaseService = firebaseService;
        this._logger = logger;
        this._tracer = tracer;
        this._serviceData = serviceData;
    }

    async getAllPR() {
        const prsRef = await this._firebaseService._client.ref('prs');
        const snapshot = await prsRef.once('value');
        const prsObj = snapshot.val();
        return Object.values(prsObj);
    }

    async createPR(prData) {
        const prId = await this._firebaseService._client.ref('prs').push().key;
        const prDoc = {
            ...prData,
            prNumber: prId,
            creationDate: new Date().toISOString(),
        };
        await this._firebaseService._client.ref(`prs/${prId}`).set(prDoc);
        return prDoc;
    }
};
