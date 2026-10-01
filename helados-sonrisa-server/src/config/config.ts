import z from "zod";

export const envSchema = z.object({
    PORT: z.coerce.number().default(3000),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
        FRONTEND_URL: z.string().url().default('http://localhost:5173'),

    MAIL_HOST: z.string({ message: 'MAIL_HOST es requerido' }),
    MAIL_PORT: z.coerce.number().default(465),
    MAIL_USER: z.string({ message: 'MAIL_USER es requerido' }),
    MAIL_PASS: z.string(),
    MAIL_FROM: z.string().email()
})

export type EnvConfig = z.infer<typeof envSchema>

export const validateEnv = (config: Record<string, unknown>) => {
    const result = envSchema.safeParse(config)

    if (!result.success) {
        console.error('Error en las variables de entorno:', result.error.format());
        throw new Error('Configuración de entorno inválida');
    }

    return result.data
}
