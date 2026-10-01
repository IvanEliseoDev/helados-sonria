import { Outlet, useNavigate } from "react-router"
import logo from "../../../assets/logo-sonrisas.png"

export const Authlayout = () => {
  const navigate = useNavigate()
  return (
    <main className="min-h-screen bg-[#fffcf9] flex flex-col justify-between">
      {/* Header / Logo */}
      <header className="p-2 md:p-4 flex items-center gap-2">
        <img 
          src={logo} 
          alt="Helados Sonrisa Logo" 
          className="cursor-pointer h-14 md:h-16 w-auto object-contain hover:scale-105 transition-transform" 
          onClick={() => navigate("/")}
        />
        <h2 className="font-bricolage font-extrabold text-xl md:text-2xl text-[#3e1916] tracking-tight">
          Helados Sonrisa
        </h2>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 pb-12">
        <Outlet />
      </div>
    </main>
  )
}