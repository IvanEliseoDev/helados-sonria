export interface EventCreateResponse {
    status:     string;
    message:    string;
    statusCode: number;
    data:       Datum[];
}

export interface Datum {
    status:      string;
    _id:         string;
    name:        string;
    description: string;
    initDate:    Date;
    location:    string;
    eventType:   string;
    user:        string;
    createdAt:   Date;
    updatedAt:   Date;
    __v:         number;
    eventTime?:  string;
}
