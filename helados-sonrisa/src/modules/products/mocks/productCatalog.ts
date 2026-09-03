import { menuData } from './MenuMock'

export interface Producto {
  id: string
  nombre: string
  categoria: string
  descripcion: string
  presentaciones?: string[]
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
]

const imagenesPorTipo: Record<string, string> = {
  HEL: '',
  SUN: '',
  SOR: '',
  MIN: '',
  TOG: '',
  ESP: '',
}

export const obtenerImagenProducto = (id: string) => {
  return imagenesPorTipo[id.split('-')[0]] ?? imagenesPorTipo.HEL
}

export const obtenerProducto = (id?: string) => {
  return todosLosProductos.find((producto) => producto.id === id)
}

export const obtenerRecomendaciones = (producto: Producto) => {
  return todosLosProductos
    .filter((item) => item.id !== producto.id && item.categoria === producto.categoria)
    .slice(0, 4)
}
