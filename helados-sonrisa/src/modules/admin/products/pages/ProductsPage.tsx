import { Package, Construction } from 'lucide-react';

export const AdminProductsPage = () => {
  return (
    <div className="p-6 md:p-8 space-y-6 w-full mx-auto">
      {/* Encabezado */}
      <div>
        <h1 className="font-extrabold text-2xl md:text-3xl text-[#3e1916]">
          Gestión de Productos
        </h1>
        <p className="text-xs md:text-sm text-[#3e1916]/60">
          Catálogo, inventario y control de artículos disponibles.
        </p>
      </div>

      {/* Contenedor tipo Tarjeta de Fallback (En desarrollo) */}
      <div className="bg-linear-to-br from-white via-white to-[#fffcf9] border-2 border-[#35ab9f]/20 rounded-3xl p-12 shadow-xl shadow-[#35ab9f]/5 flex flex-col items-center justify-center text-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-[#35ab9f]/10 flex items-center justify-center text-[#35ab9f] shadow-inner">
            <Package className="w-8 h-8" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-amber-100 text-amber-800 p-1 rounded-full border-2 border-white shadow-sm">
            <Construction className="w-4 h-4" />
          </div>
        </div>

        <div className="space-y-1 max-w-md">
          <h2 className="text-xl font-extrabold text-[#3e1916]">
            Módulo en proceso de desarrollo
          </h2>
          <p className="text-sm text-[#3e1916]/70 leading-relaxed">
            Actualmente estamos trabajando en esta sección. Muy pronto podrás administrar y visualizar todos los productos desde aquí.
          </p>
        </div>

        <div className="pt-2">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-[#35ab9f]/10 text-[#35ab9f]">
            Próximamente disponible
          </span>
        </div>
      </div>
    </div>
  );
};