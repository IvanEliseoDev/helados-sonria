export interface LoginResponse {
    status:     string;
    message:    string;
    statusCode: number;
    data:       Data;
}

export interface Data {
    user: User;
    role: string;
}

export interface User {
    _id:           string;
    firstName:     string;
    lastName:      string;
    email:         string;
    password?:      string;
    loginAttempts: number;
    lockUntil:     null;
    isActive:      boolean;
    createdAt:     Date;
    updatedAt:     Date;
    __v:           number;
}
