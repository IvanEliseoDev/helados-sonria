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
  HEL: 'https://images.unsplash.com/photo-1567206563064-6f60f4078b5d?w=900&auto=format&fit=crop&q=80',
  SUN: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=900&auto=format&fit=crop&q=80',
  SOR: 'https://images.unsplash.com/photo-1553177595-4de2bb0842b9?w=900&auto=format&fit=crop&q=80',
  MIN: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=900&auto=format&fit=crop&q=80',
  TOG: 'https://images.unsplash.com/photo-1576506295286-5cda482453a2?w=900&auto=format&fit=crop&q=80',
  ESP: 'https://images.unsplash.com/photo-1534706936160-d5ee67737249?w=900&auto=format&fit=crop&q=80',
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
