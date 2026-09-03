import { CreateCustomerDto } from "src/customers/dto/create-customer.dto";

export const DATA_CUSTOMERS: (CreateCustomerDto & { _id?: string })[] = [
    {
        id: "",
        firstName: "Carlos",
        lastName: "Mendoza",
        email: "carlos.mendoza@example.com",
        phone: "+50370001111",
        password: "Password123",
    },
    {
        id: "",
        firstName: "María",
        lastName: "Gómez",
        email: "maria.gomez@example.com",
        phone: "+50370002222",
        password: "Password123!",
    },
    {
        id: "",
        firstName: "Alejandro",
        lastName: "Rivas",
        email: "alejandro.rivas@example.com",
        phone: "+50370003333",
        password: "Password123!",
    },
];