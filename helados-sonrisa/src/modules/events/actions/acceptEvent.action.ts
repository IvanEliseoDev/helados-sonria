import { updateEventAction } from "./updateEvent.action";

export const acceptEventAction = (id: string) => updateEventAction({ id, payload: { status: "Aceptado" } });