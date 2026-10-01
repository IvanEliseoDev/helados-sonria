import { menuData } from './MenuMock'
import heladosPremiumImg from '../../../assets/helados/heladospremium/Helados premium.png';

export interface Producto {
  id: string
  nombre: string
  categoria: string
  descripcion: string
  presentaciones?: string[]
  imagen?:         string
  disponibilidad?: string
}
export const todosLosProductos: Producto[] = [
  ...menuData.menu.helados,
  ...menuData.menu.sundaes,
  ...menuData.menu.sorbemangoneadas,
  ...menuData.menu.minutas_dulces,
  ...menuData.menu.minutas_saladas,
  ...menuData.menu.to_go,
  ...menuData.menu.sabores_especiales,
];

// Actualizamos la función para que devuelva la imagen que trae el objeto producto
export const obtenerImagenProducto = (id: string) => {
  const producto = obtenerProducto(id);
  return producto?.imagen || heladosPremiumImg; // Imagen por defecto en caso de que no tenga
};

export const obtenerProducto = (id?: string) => {
  return todosLosProductos.find((producto) => producto.id === id);
};

export const obtenerRecomendaciones = (producto: Producto) => {
  return todosLosProductos
    .filter((item) => item.id !== producto.id && item.categoria === producto.categoria)
    .slice(0, 4);
};