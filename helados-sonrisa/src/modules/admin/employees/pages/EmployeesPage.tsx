import { useState } from "react";
import { MoreVertical, Eye, Edit, UserX, UserCheck, Mail, ShieldCheck, Plus, X, Trash2 } from "lucide-react";
import type { Employee } from "../interfaces/employee.interface";
import { useCreateEmployee, useDeleteEmployee, useGetEmployeeById, useGetEmployees, useToggleEmployeeStatus, useUpdateEmployee } from "../hooks/useAdminEmployees";

export type { Employee } from "../interfaces/employee.interface";

interface EmployeesTableProps {
    employees: Employee[];
    onToggleStatus: (id: string) => void;
    onEdit: (employee: Employee) => void;
    onView: (id: string) => void;
    onDelete: (id: string) => void;
}

export const EmployeesTable = ({ employees, onToggleStatus, onEdit, onView, onDelete }: EmployeesTableProps) => {
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    return (
        <div className="relative">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-xs font-extrabold text-[#3e1916]/50 uppercase tracking-wider border-b border-[#3e1916]/5">
                            <th className="py-3 px-4">Nombre Completo</th>
                            <th className="py-3 px-4">Correo Electrónico</th>
                            <th className="py-3 px-4 text-center">Estado</th>
                            <th className="py-3 px-4 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#3e1916]/5 text-sm">
                        {employees.map((employee) => {
                            const isActive = employee.isActive;

                            return (
                                <tr key={employee._id} className="hover:bg-[#fffcf9] transition-colors relative">
                                    <td className="py-4 px-4 font-bold text-[#3e1916] whitespace-nowrap">
                                        {employee.firstName} {employee.lastName}
                                    </td>
                                    <td className="py-4 px-4 whitespace-nowrap">
                                        <div className="flex items-center gap-1.5 text-xs text-[#3e1916]/80 font-medium">
                                            <Mail className="w-3.5 h-3.5 text-[#35ab9f]" />
                                            <span>{employee.email}</span>
                                        </div>
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
                                            onClick={() => setOpenMenuId(openMenuId === employee._id ? null : employee._id)}
                                            className="p-2 hover:bg-[#3e1916]/5 rounded-xl transition-colors cursor-pointer"
                                        >
                                            <MoreVertical className="w-5 h-5 text-[#3e1916]/70" />
                                        </button>

                                        {openMenuId === employee._id && (
                                            <>
                                                <div 
                                                    className="fixed inset-0 z-40" 
                                                    onClick={() => setOpenMenuId(null)}
                                                />
                                                <div className="absolute right-12 top-12 w-44 bg-white border border-[#3e1916]/10 rounded-2xl shadow-xl z-50 py-2 flex flex-col text-left">
                                                    <button
                                                        onClick={() => {
                                                            onView(employee._id);
                                                            setOpenMenuId(null);
                                                        }}
                                                        className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#3e1916] hover:bg-[#35ab9f]/10 hover:text-[#35ab9f] transition-colors cursor-pointer"
                                                    >
                                                        <Eye className="w-4 h-4" /> Ver
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            onEdit(employee);
                                                            setOpenMenuId(null);
                                                        }}
                                                        className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#3e1916] hover:bg-[#35ab9f]/10 hover:text-[#35ab9f] transition-colors cursor-pointer"
                                                    >
                                                        <Edit className="w-4 h-4" /> Editar
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            onToggleStatus(employee._id);
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
                                                            onDelete(employee._id);
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

// Modal de Registro / Edición
interface EmployeeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { firstName: string; lastName: string; email: string; password?: string }) => Promise<void>;
    employeeToEdit?: Employee | null;
}

export const EmployeeModal = ({ isOpen, onClose, onSubmit, employeeToEdit }: EmployeeModalProps) => {
    const [firstName, setFirstName] = useState(employeeToEdit?.firstName ?? '');
    const [lastName, setLastName] = useState(employeeToEdit?.lastName ?? '');
    const [email, setEmail] = useState(employeeToEdit?.email ?? '');
    const [password, setPassword] = useState('');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-[#3e1916]/10 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-extrabold text-[#3e1916]">
                        {employeeToEdit ? 'Editar Empleado' : 'Registrar Nuevo Empleado'}
                    </h2>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-[#3e1916]/5 rounded-xl transition-colors cursor-pointer"
                    >
                        <X className="w-5 h-5 text-[#3e1916]/70" />
                    </button>
                </div>

                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        await onSubmit({ firstName, lastName, email, ...(password ? { password } : {}) });
                        onClose();
                    }} 
                    className="space-y-4"
                >
                    <div>
                        <label className="block text-xs font-bold text-[#3e1916]/70 mb-1">Nombres</label>
                        <input
                            type="text"
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Ej. Ivan Eliseo"
                            className="w-full px-4 py-2.5 rounded-xl border border-[#3e1916]/15 focus:outline-none focus:border-[#35ab9f] text-sm font-medium text-[#3e1916]"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-[#3e1916]/70 mb-1">Apellidos</label>
                        <input
                            type="text"
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Ej. Hernandez Mauricio"
                            className="w-full px-4 py-2.5 rounded-xl border border-[#3e1916]/15 focus:outline-none focus:border-[#35ab9f] text-sm font-medium text-[#3e1916]"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-[#3e1916]/70 mb-1">Correo Electrónico</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Ej. ivaneliseodev@gmail.com"
                            className="w-full px-4 py-2.5 rounded-xl border border-[#3e1916]/15 focus:outline-none focus:border-[#35ab9f] text-sm font-medium text-[#3e1916]"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-[#3e1916]/70 mb-1">
                            Contraseña {employeeToEdit && <span className="text-xs font-normal text-gray-400">(Dejar en blanco para mantener actual)</span>}
                        </label>
                        <input
                            type="password"
                            {...(!employeeToEdit ? { required: true } : {})}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-2.5 rounded-xl border border-[#3e1916]/15 focus:outline-none focus:border-[#35ab9f] text-sm font-medium text-[#3e1916]"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#3e1916] bg-[#3e1916]/5 hover:bg-[#3e1916]/10 transition-colors cursor-pointer"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#35ab9f] hover:bg-[#2e9388] transition-colors cursor-pointer shadow-md shadow-[#35ab9f]/20"
                        >
                            {employeeToEdit ? 'Guardar Cambios' : 'Registrar Empleado'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Página Principal de Empleados
export const EmployeesPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
    const employeesQuery = useGetEmployees();
    const employeeQuery = useGetEmployeeById(selectedEmployeeId);
    const createEmployee = useCreateEmployee();
    const updateEmployee = useUpdateEmployee();
    const toggleStatus = useToggleEmployeeStatus();
    const deleteEmployee = useDeleteEmployee();
    const employees = employeesQuery.data?.data ?? [];

    const handleDelete = (id: string) => {
        if (window.confirm("¿Estás seguro de eliminar este empleado? Esta acción no se puede deshacer.")) {
            deleteEmployee.mutate(id);
        }
    };

    const handleOpenCreateModal = () => {
        setEmployeeToEdit(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (employee: Employee) => {
        setEmployeeToEdit(employee);
        setIsModalOpen(true);
    };

    const handleSaveEmployee = async (data: { firstName: string; lastName: string; email: string; password?: string }) => {
        if (employeeToEdit) {
            await updateEmployee.mutateAsync({ id: employeeToEdit._id, payload: data });
        } else {
            await createEmployee.mutateAsync({ ...data, password: data.password ?? "" });
        }
    };

    return (
        <div className="p-6 md:p-8 space-y-6 w-full mx-auto">
            {/* Encabezado y Botón de Registro */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="font-extrabold text-2xl md:text-3xl text-[#3e1916]">
                        Gestión de Empleados
                    </h1>
                    <p className="text-xs md:text-sm text-[#3e1916]/60">
                        Administra el personal, registra nuevos accesos y controla sus estados.
                    </p>
                </div>
                <button
                    onClick={handleOpenCreateModal}
                    className="flex items-center justify-center gap-2 bg-[#35ab9f] hover:bg-[#2e9388] text-white px-5 py-3 rounded-2xl font-bold text-xs md:text-sm transition-all shadow-md shadow-[#35ab9f]/20 cursor-pointer"
                >
                    <Plus className="w-4 h-4" /> Registrar Empleado
                </button>
            </div>

            {/* Contenedor de la Tabla */}
            <div className="bg-white border border-[#3e1916]/10 rounded-3xl p-6 shadow-sm">
                {employeesQuery.isLoading ? (
                    <p className="py-8 text-center text-sm text-[#3e1916]/60">Cargando empleados...</p>
                ) : employeesQuery.isError ? (
                    <p className="py-8 text-center text-sm text-red-600">No se pudieron cargar los empleados.</p>
                ) : employees.length === 0 ? (
                    <p className="py-8 text-center text-sm text-[#3e1916]/60">No hay empleados registrados.</p>
                ) : (
                    <EmployeesTable
                        employees={employees}
                        onToggleStatus={(id) => toggleStatus.mutate(id)}
                        onEdit={handleOpenEditModal}
                        onView={setSelectedEmployeeId}
                        onDelete={handleDelete}
                    />
                )}
            </div>

            {/* Modal */}
            <EmployeeModal 
                key={`${isModalOpen}-${employeeToEdit?._id ?? 'new'}`}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSaveEmployee}
                employeeToEdit={employeeToEdit}
            />

            {selectedEmployeeId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" role="presentation" onClick={() => setSelectedEmployeeId(null)}>
                    <section className="w-full max-w-md space-y-5 rounded-2xl bg-white p-6 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="employee-detail-title" onClick={(event) => event.stopPropagation()}>
                        <div className="flex items-center justify-between">
                            <h2 id="employee-detail-title" className="text-lg font-extrabold text-[#3e1916]">Detalle del empleado</h2>
                            <button onClick={() => setSelectedEmployeeId(null)} title="Cerrar detalle" className="rounded-lg p-2 text-[#3e1916]/70 hover:bg-[#3e1916]/5"><X className="h-5 w-5" /></button>
                        </div>
                        {employeeQuery.isLoading ? <p className="text-sm text-[#3e1916]/60">Cargando detalle...</p> : employeeQuery.isError || !employeeQuery.data ? <p className="text-sm text-red-600">No se pudo cargar el empleado.</p> : (
                            <dl className="space-y-3 text-sm">
                                <div><dt className="text-xs font-bold uppercase text-[#3e1916]/50">Nombre</dt><dd className="font-semibold text-[#3e1916]">{employeeQuery.data.data.firstName} {employeeQuery.data.data.lastName}</dd></div>
                                <div><dt className="text-xs font-bold uppercase text-[#3e1916]/50">Correo</dt><dd className="text-[#3e1916]">{employeeQuery.data.data.email}</dd></div>
                                <div><dt className="text-xs font-bold uppercase text-[#3e1916]/50">Estado</dt><dd className="text-[#3e1916]">{employeeQuery.data.data.isActive ? "Activo" : "Inactivo"}</dd></div>
                            </dl>
                        )}
                    </section>
                </div>
            )}
        </div>
    );
};