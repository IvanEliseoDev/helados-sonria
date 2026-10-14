export interface AdminDashboardResponse {
    status:     string;
    message:    string;
    statusCode: number;
    data:       Data;
}

export interface Data {
    kpiCards:          KpiCards;
    eventsPendingView: EventsPendingView[];
}

export interface EventsPendingView {
    _id:         string;
    name:        string;
    description: string;
    eventTime:   string;
    initDate:    string;
    location:    string;
    eventType:   string;
    status:      string;
    user:        string;
    createdAt:   Date;
    updatedAt:   Date;
    __v:         number;
}

export interface KpiCards {
    totalCustomers:     number;
    totalEventsPending: number;
    cancelEvents:       number;
}
