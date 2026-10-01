export interface Event {
  status:     string;
  message:    string;
  statusCode: number;
  data:       Datum[];
}

export interface Datum {
  status:      eventStatus;
  _id:         string;
  name:        string;
  description: string;
  initDate:    string;
  location:    string;
  eventType:   string;
  user?:        string;
  createdAt:   string;
  updatedAt:   string;
  __v:         number;
  eventTime?:  string;
}


export type eventStatus = "Aceptado" | "Cancelado" | "Rechazado" | "Pendiente"