import { updateEventAction } from "./updateEvent.action";

export const rejectEventAction = (id: string) => updateEventAction({ id, payload: { status: "Rechazado" } });