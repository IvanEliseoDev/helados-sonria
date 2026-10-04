import { Eye, EyeOff, Loader2, AlertTriangle } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { useRegisterMutate } from '../hooks/useRegisterMutate'

interface FormInputProps {
    label: string
    name: string
    type?: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder: string
    required?: boolean
    helperText?: string
}

const FormInput = ({ label, name, type = 'text', value, onChange, placeholder, required = true, helperText }: FormInputProps) => (
    <div className="space-y-1.5">
        <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-[#3e1916]">
                {label}
            </label>
            {helperText && <span className="text-[11px] text-[#3e1916]/50">{helperText}</span>}
        </div>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className="w-full bg-white border border-[#3e1916]/15 rounded-xl px-4 py-2.5 text-sm font-medium text-[#3e1916] placeholder-[#3e1916]/30 focus:outline-none focus:border-[#35ab9f] focus:ring-2 focus:ring-[#35ab9f]/20 transition-all shadow-sm"
        />
    </div>
)

export const RegisterPage = () => {
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

        registerUser(formData)
    }

    return (
        <div className="w-full max-w-[600px] mx-auto px-4 py-8 flex flex-col justify-center min-h-[calc(100vh-140px)]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-gradient-to-b from-white via-white to-[#35ab9f]/5 border border-[#3e1916]/10 p-8 md:p-10 rounded-3xl shadow-xl shadow-[#3e1916]/5 space-y-6"
            >
                {/* Encabezado del Formulario */}
                <div className="space-y-2 text-center">
                    <h1 className="font-bricolage font-extrabold text-3xl md:text-4xl text-[#3e1916] tracking-tight">
                        Crea una cuenta nueva
                    </h1>
                    <p className="text-sm font-medium text-[#3e1916]/70">
                        Completa tus datos para unirte a nuestra comunidad
                    </p>
                </div>

                {/* Formulario */}
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
                        />
                        <FormInput
                            label="Apellido(s)"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Ascencio Menjivar"
                        />
                    </div>

                    <FormInput
                        label="Correo Electrónico"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="correo@gmail.com"
                        helperText="Gmail o Hotmail"
                    />

                    <FormInput
                        label="Teléfono (El Salvador)"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="70001111"
                        helperText="Inicia con 6 o 7"
                    />

                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-semibold text-[#3e1916]">
                                Contraseña
                            </label>
                            <span className="text-[11px] text-[#3e1916]/50">Mín. 1 mayúscula y 1 número</span>
                        </div>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                required
                                className="w-full bg-white border border-[#3e1916]/15 rounded-xl pl-4 pr-11 py-2.5 text-sm font-medium text-[#3e1916] placeholder-[#3e1916]/30 focus:outline-none focus:border-[#35ab9f] focus:ring-2 focus:ring-[#35ab9f]/20 transition-all shadow-sm"
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
                        className="w-full bg-[#e52537] hover:bg-[#c81e2e] text-white font-semibold text-sm py-3 rounded-xl shadow-md shadow-[#e52537]/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isRegistering ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Registrando...</span>
                            </>
                        ) : (
                            <span>Crear Cuenta</span>
                        )}
                    </button>
                </form>

                {/* Footer / Enlace a Login */}
                <div className="pt-4 text-center border-t border-[#3e1916]/10">
                    <p className="text-xs font-medium text-[#3e1916]/80">
                        ¿Ya tienes una cuenta?{' '}
                        <Link 
                            to="/auth/login" 
                            className="font-semibold text-[#35ab9f] hover:text-[#2b8f84] hover:underline transition-colors"
                        >
                            Inicia sesión
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}