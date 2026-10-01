import type { eventStatus } from "../event.interface";

export interface EventsMe {
    status:     string;
    message:    string;
    statusCode: number;
    data:       Datum[];
}

export interface Datum {
    _id:         string;
    name:        string;
    description: string;
    eventTime:   string,
    initDate:    Date;
    location:    string;
    eventType:   string;
    status:      eventStatus
    user:        User;
    createdAt:   Date;
    updatedAt:   Date;
    __v:         number;
}

export interface User {
    _id:       string;
    firstName: string;
    lastName:  string;
    email:     string;
    phone:     string
}
