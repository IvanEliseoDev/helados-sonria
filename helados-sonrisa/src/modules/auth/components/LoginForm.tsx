import { Mail, EyeOff, Eye, ArrowRight, Lock, Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../../../auth/hooks/useAuthMutate'

export const LoginForm = () => {
    const navigate = useNavigate()
    const { login, isLoggingIn } = useAuth() //*Desestructuramos la funcion login y isLoggingIn

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // Lógica de autenticación
        try {
            const response = await login({
                email: formData.email,
                password: formData.password
            })
            if(response.data.role === "EMPLEADO"){
                navigate("/admin/inicio")
            }
            navigate("/")
        } catch (error) {
            console.error("Fallo al iniciar sesión:", error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Campo Correo Electrónico */}
            <div className="space-y-2">
                <label
                    htmlFor="email"
                    className="text-xs font-bold uppercase tracking-wide text-[#3e1916] block"
                >
                    Correo Electrónico
                </label>
                <div className="relative">
                    <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3e1916]/40 pointer-events-none" />
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="correo@ejemplo.com"
                        required
                        className="w-full bg-[#fffcf9] border border-[#3e1916]/15 rounded-xl pl-11 pr-4 py-3 text-sm font-medium text-[#3e1916] placeholder-[#3e1916]/40 focus:outline-none focus:border-[#35ab9f] focus:ring-2 focus:ring-[#35ab9f]/20 transition-all shadow-sm"
                    />
                </div>
            </div>

            {/* Campo Contraseña */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <label
                        htmlFor="password"
                        className="text-xs font-bold uppercase tracking-wide text-[#3e1916] block"
                    >
                        Contraseña
                    </label>
                    <Link
                        to="/forgot-password"
                        className="text-xs font-bold text-[#35ab9f] hover:text-[#2b8f84] hover:underline transition-colors"
                    >
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>
                <div className="relative">
                    <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3e1916]/40 pointer-events-none" />
                    <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
                        className="w-full bg-[#fffcf9] border border-[#3e1916]/15 rounded-xl pl-11 pr-11 py-3 text-sm font-medium text-[#3e1916] placeholder-[#3e1916]/40 focus:outline-none focus:border-[#35ab9f] focus:ring-2 focus:ring-[#35ab9f]/20 transition-all shadow-sm"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#3e1916]/40 hover:text-[#3e1916] transition-colors cursor-pointer"
                        tabIndex={-1}
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Recuérdame */}
            <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2.5 cursor-pointer group select-none">
                    <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        className="w-4 h-4 rounded border-[#3e1916]/20 text-[#35ab9f] focus:ring-[#35ab9f]/20 accent-[#35ab9f] cursor-pointer"
                    />
                    <span className="text-xs font-semibold text-[#3e1916]/80 group-hover:text-[#3e1916] transition-colors">
                        Recordar mi sesión
                    </span>
                </label>
            </div>

            {/* Botón Submit */}
            <button
                type="submit"
                className="w-full bg-[#e52537] hover:bg-[#c81e2e] text-white font-extrabold text-base py-3.5 rounded-xl shadow-lg shadow-[#e52537]/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2 group mt-2"
            >
                {isLoggingIn ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Iniciando sesión...</span>
                    </>
                ) : (
                    <>
                        <span>Iniciar Sesión</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                )}
            </button>
        </form>
    )
}
