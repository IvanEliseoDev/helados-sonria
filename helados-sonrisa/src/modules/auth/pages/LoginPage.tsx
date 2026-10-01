import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { LoginForm } from '../components/LoginForm'

export const LoginPage = () => {
  
  
  return (
    <div className="w-full max-w-[600px] mx-auto px-4 py-8 flex flex-col justify-center min-h-[calc(100vh-140px)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-b from-white via-white to-[#e52537]/5 border border-[#3e1916]/10 p-8 md:p-10 rounded-3xl shadow-xl shadow-[#3e1916]/5 space-y-6"
      >
        {/* Encabezado del Formulario */}
        <div className="space-y-2 text-center">
          <h1 className="font-bricolage font-extrabold text-3xl md:text-4xl text-[#3e1916] tracking-tight">
            ¡Bienvenido de nuevo!
          </h1>
          <p className="text-sm font-medium text-[#3e1916]/70">
            Ingresa tus credenciales para acceder a tu cuenta
          </p>
        </div>

        {/* Formulario */}
        <LoginForm />

        {/* Footer / Enlace a Registro */}
        <div className="pt-4 text-center border-t border-[#3e1916]/10">
          <p className="text-xs font-medium text-[#3e1916]/80">
            ¿No tienes una cuenta aún?{' '}
            <Link 
              to="/auth/register" 
              className="font-extrabold text-[#35ab9f] hover:text-[#2b8f84] hover:underline transition-colors"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}