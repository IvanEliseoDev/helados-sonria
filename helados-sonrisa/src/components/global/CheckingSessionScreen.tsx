import logo from "../../assets/logo-sonrisas.png";

export const CheckingSessionScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-linear-to-br from-white via-[#fffcf9] to-[#35ab9f]/5 p-4">
      <div className="flex flex-col items-center space-y-6 animate-in fade-in zoom-in duration-300">
        {/* Contenedor del Logo */}
        <div className="flex items-center gap-3">
          <div className="w-24 h-24 rounded-3xl flex items-center justify-center bg-white shadow-lg shadow-[#35ab9f]/10 border border-[#3e1916]/5 p-2">
            <img src={logo} alt="Helados Sonrisa Logo" className="h-20 w-auto object-contain" />
          </div>
        </div>

        {/* Textos y Animación de Carga */}
        <div className="text-center space-y-2">
          <h2 className="font-extrabold text-2xl text-[#3e1916] tracking-tight">
            Helados Sonrisa
          </h2>
          <div className="flex items-center justify-center gap-1.5 text-sm font-bold text-[#3e1916]/60">
            <span>Verificando sesión</span>
            <span className="flex gap-1">
              <span className="w-1.5 h-1.5 bg-[#35ab9f] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 bg-[#35ab9f] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-[#35ab9f] rounded-full animate-bounce"></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};