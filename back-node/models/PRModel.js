module.exports = class PRModel {
    constructor(mongooseService) {
        this.modelName = 'prs';
        this._mongooseService = mongooseService;
    }

    async init() {
        this._schema = {
            status: { type: String, enum: ['Draft', 'Open', 'Closed'] },
            description: { type: String },
            author: { type: String },
            labels: [{ type: String }],
            createdAt: { type: Date, default: Date.now },
        };
        this._mongooseService.registerModel(this.modelName, this._schema);
    }
};
