import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight, Loader2, AlertTriangle, IceCream, Sparkles, Heart } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router'
import { useRegisterMutate } from '../hooks/useRegisterMutate'

interface FormInputProps {
    label: string
    name: string
    type?: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder: string
    icon: React.ComponentType<{ className?: string }>
    required?: boolean
}

const FormInput = ({ label, name, type = 'text', value, onChange, placeholder, icon: Icon, required = true }: FormInputProps) => (
    <div className="space-y-1.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-[#3e1916]/80 block">
            {label}
        </label>
        <div className="relative">
            <Icon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3e1916]/40 pointer-events-none" />
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="w-full bg-white border border-[#3e1916]/15 rounded-xl pl-11 pr-4 py-2.5 text-sm font-medium text-[#3e1916] placeholder-[#3e1916]/30 focus:outline-none focus:border-[#35ab9f] focus:ring-2 focus:ring-[#35ab9f]/20 transition-all shadow-sm"
            />
        </div>
    </div>
)

export const RegisterPage = () => {
    // Conectamos el hook de React Query
    const { mutate: registerUser, isPending: isRegistering } = useRegisterMutate()

    const [showPassword, setShowPassword] = useState(false)
    const [errorMsg, setErrorMsg] = useState<string | null>(null)

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        setErrorMsg(null)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setErrorMsg(null)

        const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook|live)\.(com|es)$/i;
        if (!emailRegex.test(formData.email)) {
            setErrorMsg("Por favor, ingresa un correo válido de Gmail o Hotmail.");
            return;
        }

        const salvadorPhoneRegex = /^(\+503)?[67]\d{7}$/;
        if (!salvadorPhoneRegex.test(formData.phone.trim())) {
            setErrorMsg("El número de teléfono debe ser de El Salvador y comenzar con 6 o 7.");
            return;
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;
        if (!passwordRegex.test(formData.password)) {
            setErrorMsg("La contraseña debe contener al menos una letra mayúscula y un número.");
            return;
        }

        // Enviamos los datos a través de la mutación
        registerUser(formData)
    }

    return (
        <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-[#fffcf9]">
            
            {/* ================= COLUMNA IZQUIERDA (Animada y Artesanal) ================= */}
            <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-[#35ab9f] via-[#289086] to-[#1b7a73] p-12 flex-col justify-between relative text-white">
                <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute bottom-16 right-10 w-48 h-48 bg-[#e52537]/20 rounded-full blur-3xl"></div>

                <div className="absolute top-20 right-16 animate-bounce duration-1000 opacity-20">
                    <IceCream className="w-14 h-14" />
                </div>
                <div className="absolute bottom-32 left-12 animate-pulse opacity-25">
                    <Sparkles className="w-10 h-10 text-yellow-200" />
                </div>

                <div className="relative z-10 space-y-3">
                    <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase">
                        <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                        Helados Sonrisa
                    </span>
                    <h1 className="text-3xl font-semibold tracking-tight leading-snug">
                        El dulce sabor de celebrar juntos.
                    </h1>
                </div>

                <div className="relative z-10 my-auto py-10 flex flex-col items-center text-center space-y-5">
                    <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-lg transform transition-transform hover:scale-105 duration-300">
                        <IceCream className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-sm text-white/85 font-normal leading-relaxed max-w-xs">
                        Crea tu cuenta para guardar tus reservaciones favoritas, agendar eventos y disfrutar de momentos inolvidables.
                    </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between text-xs font-medium text-white/70">
                    <span>Hecho con amor artesanal</span>
                    <div className="flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5 text-red-300 fill-red-300" />
                        <span>El Salvador</span>
                    </div>
                </div>
            </div>

            {/* ================= COLUMNA DERECHA (Formulario Limpio) ================= */}
            <div className="lg:col-span-7 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-12 overflow-y-auto">
                <div className="max-w-md w-full mx-auto space-y-6">
                    
                    <div className="space-y-1">
                        <h2 className="text-2xl font-semibold text-[#3e1916] tracking-tight">
                            Crear cuenta nueva
                        </h2>
                        <p className="text-xs sm:text-sm text-[#3e1916]/60 font-normal">
                            Completa tus datos para unirte a nuestra comunidad dulce.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {errorMsg && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 shrink-0" />
                                <span>{errorMsg}</span>
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormInput
                                label="Nombre(s)"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="Ivan Eliseo"
                                icon={User}
                            />
                            <FormInput
                                label="Apellido(s)"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Ascencio Menjivar"
                                icon={User}
                            />
                        </div>

                        <FormInput
                            label="Correo Electrónico"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="correo@gmail.com"
                            icon={Mail}
                        />

                        <FormInput
                            label="Teléfono (El Salvador)"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+50370001111"
                            icon={Phone}
                        />

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold uppercase tracking-wider text-[#3e1916]/80 block">
                                Contraseña
                            </label>
                            <div className="relative">
                                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3e1916]/40 pointer-events-none" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Password123"
                                    required
                                    className="w-full bg-white border border-[#3e1916]/15 rounded-xl pl-11 pr-11 py-2.5 text-sm font-medium text-[#3e1916] placeholder-[#3e1916]/30 focus:outline-none focus:border-[#35ab9f] focus:ring-2 focus:ring-[#35ab9f]/20 transition-all shadow-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#3e1916]/40 hover:text-[#3e1916] transition-colors cursor-pointer"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isRegistering}
                            className="w-full bg-[#e52537] hover:bg-[#c81e2e] text-white font-semibold text-sm py-3 rounded-xl shadow-md shadow-[#e52537]/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2 group mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isRegistering ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Registrando...</span>
                                </>
                            ) : (
                                <>
                                    <span>Crear Cuenta</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>

                        <p className="text-center text-xs text-[#3e1916]/60 pt-2 font-normal">
                            ¿Ya tienes una cuenta?{' '}
                            <Link to="/login" className="font-semibold text-[#35ab9f] hover:underline">
                                Inicia sesión
                            </Link>
                        </p>
                    </form>
                </div>
            </div>

        </div>
    )
}