import axios from "axios";

const HeladosSonrisa_API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // OBLIGATORIO: Permite enviar y recibir la cookie HttpOnly
});

export { HeladosSonrisa_API };