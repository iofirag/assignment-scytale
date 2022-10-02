export enum StatusEnum {
    Open = 'Open', 
    Draft = 'Draft', 
    Closed = 'Closed'
}

class PR {
    _id: string;
    status: StatusEnum;
    description: string;
    author: string;
    labels: string[];
    createdAt: string;

    constructor(status: StatusEnum, description: string, author: string, labels: string[], _id: string, createdAt: string) {
        this.status = status;
        this.description = description;
        this.author = author;
        this.labels = labels;
        this._id = _id
        this.createdAt = createdAt;
    }
}

export default PR