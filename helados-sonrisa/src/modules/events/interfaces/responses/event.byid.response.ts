export interface EventFindByIDResponse {
    status:     string;
    message:    string;
    statusCode: number;
    data:       Data;
}

export interface Data {
    _id:         string;
    name:        string;
    description: string;
    eventTime:   string;
    initDate:    Date;
    location:    string;
    eventType:   string;
    status:      string;
    user:        string;
    createdAt:   Date;
    updatedAt:   Date;
    __v:         number;
}
