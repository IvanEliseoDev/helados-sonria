import { CreateCustomerDto } from "src/customers/dto/create-customer.dto";

export const DATA_CUSTOMERS: (CreateCustomerDto & { _id?: string })[] = [
    {
        _id: '65f1a2b3c4d5e6f7a8b91111',
        firstName: "Carlos",
        lastName: "Mendoza",
        email: "carlos.mendoza@example.com",
        phone: "+50370001111",
        password: "Password123",
    },
    {
        _id: '65f1a2b3c4d5e6f7a8b92222',
        firstName: "María",
        lastName: "Gómez",
        email: "maria.gomez@example.com",
        phone: "+50370002222",
        password: "Password123!",
    },
    {
        _id: '65f1a2b3c4d5e6f7a8b93333',
        firstName: "Alejandro",
        lastName: "Rivas",
        email: "alejandro.rivas@example.com",
        phone: "+50370003333",
        password: "Password123!",
    },
];