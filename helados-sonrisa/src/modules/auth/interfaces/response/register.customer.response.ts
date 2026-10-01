export interface RegisterCustomerResponse {
    status:     string;
    message:    string;
    statusCode: number;
    data:       Data;
}

export interface Data {
    firstName:     string;
    lastName:      string;
    email:         string;
    phone:         string;
    loginAttempts: number;
    lockUntil:     null;
    isActive:      boolean;
    _id:           string;
    createdAt:     Date;
    updatedAt:     Date;
    __v:           number;
}
