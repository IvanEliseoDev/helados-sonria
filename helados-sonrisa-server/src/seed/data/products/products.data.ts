import { Types } from 'mongoose';
import { CreateProductDto } from '../../../products/dto/create-product.dto';

export const PRODUCTS_DATA: (CreateProductDto & { _id: string; images?: { image: string; publicId: string }[] })[] = [
  // HELADOS
  {
    _id: new Types.ObjectId().toHexString(),
    name: "Helado de Tamarindo",
    type: "helados",
    category: "Premium",
    description: "Helado artesanal de sabor a tamarindo, preparado para ofrecer una textura suave y cremosa y un sabor frutal refrescante.",
    presentations: ["Sencillo", "Doble"],
    status: "Disponible",
    images: []
  },
  {
    _id: new Types.ObjectId().toHexString(),
    name: "Helado de Fresa",
    type: "helados",
    category: "Premium",
    description: "Helado artesanal de fresa con una textura cremosa y un sabor dulce y frutal que lo convierte en una opción refrescante.",
    presentations: ["Sencillo", "Doble"],
    status: "Disponible",
    images: []
  },
  {
    _id: new Types.ObjectId().toHexString(),
    name: "Helado de Coco",
    type: "helados",
    category: "Premium",
    description: "Helado artesanal de coco, suave y cremoso, con el característico sabor tropical del coco.",
    presentations: ["Sencillo", "Doble"],
    status: "Disponible",
    images: []
  },
  {
    _id: new Types.ObjectId().toHexString(),
    name: "Helado de Mango",
    type: "helados",
    category: "Premium",
    description: "Helado artesanal de mango con una textura cremosa y un sabor frutal tropical, ideal para disfrutar bien frío.",
    presentations: ["Sencillo", "Doble"],
    status: "Disponible",
    images: []
  },
  {
    _id: new Types.ObjectId().toHexString(),
    name: "Helado de Arrayán",
    type: "helados",
    category: "Premium",
    description: "Helado artesanal de arrayán con una textura suave y cremosa, pensado para quienes buscan un sabor frutal tradicional y diferente.",
    presentations: ["Sencillo", "Doble"],
    status: "Disponible",
    images: []
  },
  {
    _id: new Types.ObjectId().toHexString(),
    name: "Helado de Horchata",
    type: "helados",
    category: "Súper Premium",
    description: "Helado artesanal inspirado en la tradicional horchata, con una textura cremosa y un sabor dulce y característico.",
    presentations: ["Sencillo", "Doble"],
    status: "Disponible",
    images: []
  },
  {
    _id: new Types.ObjectId().toHexString(),
    name: "Helado de Blueberry",
    type: "helados",
    category: "Súper Premium",
    description: "Helado artesanal de blueberry con una textura suave y cremosa y un sabor frutal distintivo.",
    presentations: ["Sencillo", "Doble"],
    status: "Disponible",
    images: []
  },
  {
    _id: new Types.ObjectId().toHexString(),
    name: "Helado de Leche con Oreo",
    type: "helados",
    category: "Súper Premium",
    description: "Helado artesanal de leche con Oreo que combina una base cremosa con el característico sabor de las galletas Oreo.",
    presentations: ["Sencillo", "Doble"],
    status: "Disponible",
    images: []
  },

  // SUNDAES
  {
    _id: new Types.ObjectId().toHexString(),
    name: "Sundae de Oreo",
    type: "sundaes",
    category: "Sundae",
    description: "Una combinación de helado artesanal con Oreo, acompañada de toppings y una presentación dulce y llamativa.",
    status: "Disponible",
    images: []
  },
  {
    _id: new Types.ObjectId().toHexString(),
    name: "Sundae de Cocada",
    type: "sundaes",
    category: "Sundae",
    description: "Sundae de sabor cocada preparado con helado artesanal, toppings y una presentación pensada para disfrutar diferentes texturas y sabores.",
    status: "Disponible",
    images: []
  },
  {
    _id: new Types.ObjectId().toHexString(),
    name: "Sundae de Tamarindo",
    type: "sundaes",
    category: "Sundae",
    description: "Sundae de tamarindo que combina el sabor frutal del helado con toppings y una presentación especial.",
    status: "Disponible",
    images: []
  },

  // SORBEMANGONEADAS
  {
    _id: new Types.ObjectId().toHexString(),
    name: "Sorbemangoneada",
    type: "sorbemangoneadas",
    category: "Sorbemangoneada",
    description: "Una especialidad de Helados Sonrisa que combina sorbete artesanal con ingredientes frutales y toppings. Su presentación especial incluye cuatro bolitas de sorbete para una experiencia refrescante y diferente.",
    status: "Disponible",
    images: []
  },

  // MINUTAS DULCES
  {
    _id: new Types.ObjectId().toHexString(),
    name: "Minuta Café",
    type: "minutas_dulces",
    category: "Minuta Dulce",
    description: "Minuta de hielo finamente raspado con sabor a café, acompañada de jarabes y complementos para crear un postre refrescante y dulce.",
    status: "Disponible",
    images: []
  },
  {
    _id: new Types.ObjectId().toHexString(),
    name: "Minuta Playa",
    type: "minutas_dulces",
    category: "Minuta Dulce",
    description: "Minuta refrescante de estilo dulce, preparada con hielo raspado fino, jarabes y complementos que crean una combinación colorida y agradable.",
    status: "Disponible",
    images: []
  },
  {
    _id: new Types.ObjectId().toHexString(),
    name: "Minuta Tradicional",
    type: "minutas_dulces",
    category: "Minuta Dulce",
    description: "Una minuta de estilo tradicional salvadoreño preparada con hielo raspado, jarabes y complementos dulces para disfrutar una combinación clásica y refrescante.",
    status: "Disponible",
    images: []
  },
  {
    _id: new Types.ObjectId().toHexString(),
    name: "Minuta Unicornio",
    type: "minutas_dulces",
    category: "Minuta Dulce",
    description: "Minuta dulce de presentación llamativa, preparada con hielo raspado, jarabes y toppings para una experiencia colorida y divertida.",
    status: "Disponible",
    images: []
  },
  {
    _id: new Types.ObjectId().toHexString(),
    name: "Minuta Fresa con Crema",
    type: "minutas_dulces",
    category: "Minuta Dulce",
    description: "Minuta de hielo raspado combinada con fresa y crema, creando un contraste dulce, suave y refrescante.",
    status: "Disponible",
    images: []
  },

  // MINUTAS SALADAS
  {
    _id: new Types.ObjectId().toHexString(),
    name: "Minuta Limón",
    type: "minutas_saladas",
    category: "Minuta Salada",
    description: "Minuta refrescante de limón preparada con hielo raspado y una combinación de sabores cítricos para quienes prefieren un toque ácido.",
    status: "Disponible",
    images: []
  },
  {
    _id: new Types.ObjectId().toHexString(),
    name: "Minuta Pica Fresa",
    type: "minutas_saladas",
    category: "Minuta Salada",
    description: "Minuta que combina el sabor frutal de la fresa con un toque picante y ácido, creando una experiencia intensa y refrescante.",
    status: "Disponible",
    images: []
  },
  {
    _id: new Types.ObjectId().toHexString(),
    name: "Minuta Michelada",
    type: "minutas_saladas",
    category: "Minuta Salada",
    description: "Minuta de perfil ácido y especiado, preparada con hielo raspado y una combinación de sabores inspirada en la tradicional michelada.",
    status: "Disponible",
    images: []
  },
  {
    _id: new Types.ObjectId().toHexString(),
    name: "Minuta Tamarindo",
    type: "minutas_saladas",
    category: "Minuta Salada",
    description: "Minuta refrescante de tamarindo con un perfil ácido y frutal, preparada sobre hielo raspado y complementada con sus ingredientes característicos.",
    status: "Disponible",
    images: []
  },

  // TO-GO
  {
    _id: new Types.ObjectId().toHexString(),
    name: "Helado To-Go",
    type: "to_go",
    category: "To-Go",
    description: "Nuestros helados artesanales para disfrutar en casa o compartir, disponibles en diferentes tamaños para adaptarse a cada ocasión.",
    presentations: ["Pinta", "Litro", "Medio galón"],
    status: "Disponible",
    images: []
  },

  // SABORES ESPECIALES
  {
    _id: new Types.ObjectId().toHexString(),
    name: "Jocote en Miel",
    type: "sabores_especiales",
    category: "Sabor Especial",
    description: "Sabor especial inspirado en el tradicional jocote en miel salvadoreño, creado como una propuesta artesanal para eventos y temporadas especiales.",
    status: "Disponible",
    images: []
  },
  {
    _id: new Types.ObjectId().toHexString(),
    name: "Candy Cane",
    type: "sabores_especiales",
    category: "Sabor Especial",
    description: "Sabor especial de temporada inspirado en el tradicional bastón de dulce, creado como una propuesta temática para la época navideña.",
    status: "Disponible",
    images: []
  }
];