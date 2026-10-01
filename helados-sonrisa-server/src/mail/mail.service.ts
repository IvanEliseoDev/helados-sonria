import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from "nodemailer"
import { EnvConfig } from 'src/config/config';
import { getEmployeeWelcomeTemplate } from './templates/employee-welcome.template';

//* Decorador que marca esta clase como un servicio inyectable en el contenedor de IoC de NestJS
@Injectable()
export class MailService {
    //* Cliente principal de Nodemailer encargado de gestionar la conexión y el envío de correos
    private transporter: nodemailer.Transporter;
    //* Instancia de Logger propia de NestJS para emitir trazas de depuración y errores en la consola
    private readonly logger = new Logger(MailService.name);
    //? Inyección de ConfigService con tipado estricto (EnvConfig) y modo no-nulo (true)
    constructor(private readonly configService: ConfigService<EnvConfig, true>) {
        //* Carga de variables de entorno (Tipadas y Validadas por Zod) 
        //* Obtiene el host SMTP (ej: 'smtp.resend.com'); { infer: true } garantiza el tipo 'string'
        const host = this.configService.get('MAIL_HOST', { infer: true });
        //* Obtiene el puerto SMTP; Zod lo transformó previamente a 'number' (ej: 465 o 587)
        const port = this.configService.get('MAIL_PORT', { infer: true });
        //* Obtiene el usuario autenticado del servicio de correo
        const user = this.configService.get('MAIL_USER', { infer: true });
        //* Obtiene la contraseña o token de API privada del servicio de correo
        const pass = this.configService.get('MAIL_PASS', { infer: true });
        //* Crea la conexión reutilizable con el servidor SMTP utilizando los parámetros cargados
        this.transporter = nodemailer.createTransport({
            host,
            port,
            secure: port === 465, //! Asigna 'true' para el puerto SSL 465, o 'false' para TLS/STARTTLS en puerto 587
            auth: { user, pass }  //! Credenciales de autenticación enviadas al servidor SMTP
        });
    }

    async registerNewEmployeeMail(user: string, name: string, password: string) {
        try {
            const mailFrom = this.configService.get('MAIL_FROM', { infer: true })
            await this.transporter.sendMail({
                from: mailFrom,
                to: user,
                subject: 'Bienvenido al equipo de Helados Sonrisa!',
                html: getEmployeeWelcomeTemplate({ name, user, password })
            })
            this.logger.log(`Correo de bienvenida enviado exitosamente a: ${user}`);
        } catch (error) {
            this.logger.error(`Error al enviar el correo de bienvenida a ${user}:`, error);
        }
    }
}