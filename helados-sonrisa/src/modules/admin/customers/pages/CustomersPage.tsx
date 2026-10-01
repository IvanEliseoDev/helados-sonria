import { useState } from "react";
import { MoreVertical, Eye, UserCheck, UserX, Mail, Phone, ShieldCheck, Trash2, X } from "lucide-react";
import type { Customer } from "../interfaces/customer.interface";
import { useDeleteCustomer, useGetCustomerById, useGetCustomers, useToggleCustomerStatus } from "../hooks/useAdminCustomers";

export type { Customer } from "../interfaces/customer.interface";

interface CustomersTableProps {
    customers: Customer[];
    onToggleStatus: (id: string) => void;
    onView: (id: string) => void;
    onDelete: (id: string) => void;
}

export const CustomersTable = ({ customers, onToggleStatus, onView, onDelete }: CustomersTableProps) => {
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    return (
        <div className="relative">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-xs font-extrabold text-[#3e1916]/50 uppercase tracking-wider border-b border-[#3e1916]/5">
                            <th className="py-3 px-4">Cliente</th>
                            <th className="py-3 px-4">Contacto</th>
                            <th className="py-3 px-4">Rol / Tipo</th>
                            <th className="py-3 px-4 text-center">Estado</th>
                            <th className="py-3 px-4 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#3e1916]/5 text-sm">
                        {customers.map((customer) => {
                            const isActive = customer.isActive;

                            return (
                                <tr key={customer._id} className="hover:bg-[#fffcf9] transition-colors relative">
                                    <td className="py-4 px-4 font-bold text-[#3e1916] whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <span>{customer.firstName} {customer.lastName}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 whitespace-nowrap">
                                        <div className="flex items-center gap-1.5 font-medium text-[#3e1916]">
                                            <Phone className="w-3.5 h-3.5 text-[#35ab9f]" />
                                            <span>{customer.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs text-[#3e1916]/60 mt-0.5">
                                            <Mail className="w-3.5 h-3.5 text-[#3e1916]/40" />
                                            <span>{customer.email}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 font-semibold text-[#35ab9f] whitespace-nowrap">
                                        Cliente
                                    </td>
                                    <td className="py-4 px-4 text-center whitespace-nowrap">
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                                                isActive
                                                    ? 'bg-emerald-100 text-emerald-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                        >
                                            <ShieldCheck className="w-3.5 h-3.5" />
                                            {isActive ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-center whitespace-nowrap relative">
                                        <button
                                            onClick={() => setOpenMenuId(openMenuId === customer._id ? null : customer._id)}
                                            className="p-2 hover:bg-[#3e1916]/5 rounded-xl transition-colors cursor-pointer"
                                        >
                                            <MoreVertical className="w-5 h-5 text-[#3e1916]/70" />
                                        </button>

                                        {openMenuId === customer._id && (
                                            <>
                                                <div 
                                                    className="fixed inset-0 z-40" 
                                                    onClick={() => setOpenMenuId(null)}
                                                />
                                                <div className="absolute right-12 top-12 w-44 bg-white border border-[#3e1916]/10 rounded-2xl shadow-xl z-50 py-2 flex flex-col text-left">
                                                    <button
                                                        onClick={() => {
                                                            onView(customer._id);
                                                            setOpenMenuId(null);
                                                        }}
                                                        className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#3e1916] hover:bg-[#35ab9f]/10 hover:text-[#35ab9f] transition-colors cursor-pointer"
                                                    >
                                                        <Eye className="w-4 h-4" /> Ver
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            onToggleStatus(customer._id);
                                                            setOpenMenuId(null);
                                                        }}
                                                        className={`flex items-center gap-2 px-4 py-2 text-xs font-bold transition-colors cursor-pointer ${
                                                            isActive 
                                                                ? 'text-red-600 hover:bg-red-50' 
                                                                : 'text-emerald-600 hover:bg-emerald-50'
                                                        }`}
                                                    >
                                                        {isActive ? (
                                                            <>
                                                                <UserX className="w-4 h-4" /> Desactivar
                                                            </>
                                                        ) : (
                                                            <>
                                                                <UserCheck className="w-4 h-4" /> Activar
                                                            </>
                                                        )}
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            onDelete(customer._id);
                                                            setOpenMenuId(null);
                                                        }}
                                                        className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                                    >
                                                        <Trash2 className="w-4 h-4" /> Eliminar
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Página Principal de Clientes
export const CustomersPage = () => {
    const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
    const customersQuery = useGetCustomers();
    const customerQuery = useGetCustomerById(selectedCustomerId);
    const toggleStatus = useToggleCustomerStatus();
    const deleteCustomer = useDeleteCustomer();
    const customers = customersQuery.data?.data ?? [];

    const handleDelete = (id: string) => {
        if (window.confirm("¿Estás seguro de eliminar este cliente? Esta acción no se puede deshacer.")) {
            deleteCustomer.mutate(id);
        }
    };

    return (
        <div className="p-6 md:p-8 space-y-6 w-full mx-auto">
            {/* Encabezado */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="font-extrabold text-2xl md:text-3xl text-[#3e1916]">
                        Gestión de Clientes
                    </h1>
                    <p className="text-xs md:text-sm text-[#3e1916]/60">
                        Visualiza, consulta y administra el estado de tus clientes registrados.
                    </p>
                </div>
            </div>

            {/* Contenedor de la Tabla */}
            <div className="bg-white border border-[#3e1916]/10 rounded-3xl p-6 shadow-sm">
                {customersQuery.isLoading ? (
                    <p className="py-8 text-center text-sm text-[#3e1916]/60">Cargando clientes...</p>
                ) : customersQuery.isError ? (
                    <p className="py-8 text-center text-sm text-red-600">No se pudieron cargar los clientes.</p>
                ) : customers.length === 0 ? (
                    <p className="py-8 text-center text-sm text-[#3e1916]/60">No hay clientes registrados.</p>
                ) : (
                    <CustomersTable
                        customers={customers}
                        onToggleStatus={(id) => toggleStatus.mutate(id)}
                        onView={setSelectedCustomerId}
                        onDelete={handleDelete}
                    />
                )}
            </div>

            {selectedCustomerId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" role="presentation" onClick={() => setSelectedCustomerId(null)}>
                    <section className="w-full max-w-md space-y-5 rounded-2xl bg-white p-6 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="customer-detail-title" onClick={(event) => event.stopPropagation()}>
                        <div className="flex items-center justify-between">
                            <h2 id="customer-detail-title" className="text-lg font-extrabold text-[#3e1916]">Detalle del cliente</h2>
                            <button onClick={() => setSelectedCustomerId(null)} title="Cerrar detalle" className="rounded-lg p-2 text-[#3e1916]/70 hover:bg-[#3e1916]/5"><X className="h-5 w-5" /></button>
                        </div>
                        {customerQuery.isLoading ? <p className="text-sm text-[#3e1916]/60">Cargando detalle...</p> : customerQuery.isError || !customerQuery.data ? <p className="text-sm text-red-600">No se pudo cargar el cliente.</p> : (
                            <dl className="space-y-3 text-sm">
                                <div><dt className="text-xs font-bold uppercase text-[#3e1916]/50">Nombre</dt><dd className="font-semibold text-[#3e1916]">{customerQuery.data.data.firstName} {customerQuery.data.data.lastName}</dd></div>
                                <div><dt className="text-xs font-bold uppercase text-[#3e1916]/50">Correo</dt><dd className="text-[#3e1916]">{customerQuery.data.data.email}</dd></div>
                                <div><dt className="text-xs font-bold uppercase text-[#3e1916]/50">Teléfono</dt><dd className="text-[#3e1916]">{customerQuery.data.data.phone || "No registrado"}</dd></div>
                                <div><dt className="text-xs font-bold uppercase text-[#3e1916]/50">Estado</dt><dd className="text-[#3e1916]">{customerQuery.data.data.isActive ? "Activo" : "Inactivo"}</dd></div>
                            </dl>
                        )}
                    </section>
                </div>
            )}
        </div>
    );
};