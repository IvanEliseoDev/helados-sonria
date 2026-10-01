export interface EmployeeWelcomeData {
    name: string;
    year?: number;
    user:  string;
    password: string;
}

export const getEmployeeWelcomeTemplate = ({ name, user, password, year = new Date().getFullYear() }: EmployeeWelcomeData): string => {
    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Bienvenido a Helados Sonrisa</title>
      <style>
        body { margin: 0; padding: 0; background-color: #f9fafb; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #2d1810; }
        .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05); border: 1px solid #f3f4f6; }
        .header { background-color: #ffffff; padding: 28px 20px 15px 20px; text-align: center; border-bottom: 2px solid #fef3c7; }
        .badge { display: inline-block; background-color: #fef9c3; color: #854d0e; font-size: 12px; font-weight: 700; padding: 6px 16px; border-radius: 50px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; }
        .title { color: #2d1810; font-size: 28px; font-weight: 800; margin: 10px 0 0 0; line-height: 1.2; }
        .title-highlight { color: #e62b45; border-bottom: 3px solid #0d9488; display: inline-block; padding-bottom: 2px; }
        .content { padding: 30px; font-size: 16px; line-height: 1.6; color: #4b5563; }
        .card { background-color: #fffbeb; border-left: 4px solid #0d9488; padding: 16px; border-radius: 8px; margin: 20px 0; }
        .btn-container { text-align: center; margin: 30px 0 10px 0; }
        .btn { background-color: #e62b45; color: #ffffff !important; text-decoration: none; padding: 12px 28px; border-radius: 10px; font-weight: 700; display: inline-block; box-shadow: 0 4px 10px rgba(230, 43, 69, 0.3); }
        .footer { background-color: #fcfbf7; padding: 20px; text-align: center; font-size: 13px; color: #9ca3af; border-top: 1px solid #f3f4f6; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <span class="badge">Heladería Artesanal</span>
          <h1 class="title">Bienvenido a <span class="title-highlight">Helados Sonrisa</span></h1>
        </div>
        <div class="content">
          <p>Hola <strong>${name}</strong>,</p>
          <p>¡Nos alegra mucho darle la bienvenida a nuestro equipo! A partir de hoy formas parte de la familia dedicada a llenar de alegría cada cucharada con la mejor fruta fresca y recetas artesanales.</p>
          <div class="card">
            <strong style="color: #0d9488;">Tu cuenta ya se encuentra activa.</strong>
            <p style="margin: 5px 0 0 0; font-size: 14px;">Ya puedes acceder a la plataforma del sistema para revisar tu panel de colaborador y gestionar tus actividades.</p>
            <p style="margin: 5px 0 0 0; font-size: 14px;">Tu usuario: ${user}</p>
            <p style="margin: 5px 0 0 0; font-size: 14px;">Tu clave: ${password}</p>
          </div>
          <p>Si tienes alguna consulta inicial sobre tus credenciales o acceso, ponte en contacto con tu administrador o supervisor de turno.</p>
          <div class="btn-container">
            <a href="https://helados-sonrisas.vercel.app/" class="btn">Acceder al Sistema</a>
          </div>
        </div>
        <div class="footer">
          <p style="margin: 0;">© ${year} Helados Sonrisa — Compartiendo sonrisas todos los días.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};