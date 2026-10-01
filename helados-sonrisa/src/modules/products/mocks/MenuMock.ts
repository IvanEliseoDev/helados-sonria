// Importaciones de imágenes desde la carpeta assets/helados
import heladosPremiumImg from '../../../assets/helados/heladospremium/Helados premium.png';
import superPremiumImg from '../../../assets/helados/heladossuperpremium/Super Premium.png';

// Minutas
import minutaCafe from '../../../assets/helados/minutas/Minuta de cafe.png';
import minutaLimon from '../../../assets/helados/minutas/Minuta de limon.png';
import minutaPlaya from '../../../assets/helados/minutas/Minuta de playa.png';
import minutaTamarindo from '../../../assets/helados/minutas/Minuta de tamarindo.png';
import minutaMichelada from '../../../assets/helados/minutas/Minuta Michelada.png';
import minutaPicaFresa from '../../../assets/helados/minutas/Minuta pica fresa.png';
import minutaTradicional from '../../../assets/helados/minutas/Minuta tradicional.png';
import minutaUnicornio from '../../../assets/helados/minutas/Minuta unicornio.png';
import minutaFresaCrema from '../../../assets/helados/minutas/Minutas de fresa y crema chantilly.png';


//Helados
import heladoDeHorchata from "../../../assets/helados/helados/HeladoHorchata.jpg"
import heladoBlueBerry from "../../../assets/helados/helados/HeladoBlueberry.jpg"
import heladoDeLecheConOreo from "../../../assets/helados/helados/HeladoLecheConOreo.jpg"
import heladoDeCoco from "../../../assets/helados/helados/HeladoDeCoco.jpg"
import heladoDeFresa from "../../../assets/helados/helados/HeladoDeFresa.jpg"
import heladoDeTamarindo from "../../../assets/helados/helados/HeladoDeTamarindo.jpg"
import heladoDeArrayan from "../../../assets/helados/helados/HeladoDeArrayan.jpg"
import heladoDeMango from "../../../assets/helados/helados/HeladoDeMango.jpg"

//Sundae 
import sundaeDeOreo from "../../../assets/helados/sundaes/SundaeDeOreo.jpg"
import sundaeDeCarcajada from "../../../assets/helados/sundaes/SundaeCarcajeada.jpg"
import sundaeDeTamarindo from "../../../assets/helados/sundaes/sundaeDeTamarindo.jpg"

export interface Producto {
    id: string;
    nombre: string;
    categoria: string;
    descripcion: string;
    presentaciones?: string[];
    disponibilidad?: string;
    imagen?: string; // <-- Añadimos la propiedad opcional de imagen
}

export const menuData = {
  "menu": {
    "helados": [
      {
        "id": "HEL-001",
        "nombre": "Helado de Tamarindo",
        "categoria": "Premium",
        "descripcion": "Helado artesanal de sabor a tamarindo...",
        "presentaciones": ["Sencillo", "Doble"],
        "imagen": heladoDeTamarindo
      },
      {
        "id": "HEL-002",
        "nombre": "Helado de Fresa",
        "categoria": "Premium",
        "descripcion": "Helado artesanal de fresa...",
        "presentaciones": ["Sencillo", "Doble"],
        "imagen": heladoDeFresa
      },
      {
        "id": "HEL-003",
        "nombre": "Helado de Coco",
        "categoria": "Premium",
        "descripcion": "Helado artesanal de coco...",
        "presentaciones": ["Sencillo", "Doble"],
        "imagen": heladoDeCoco
      },
      {
        "id": "HEL-004",
        "nombre": "Helado de Mango",
        "categoria": "Premium",
        "descripcion": "Helado artesanal de mango...",
        "presentaciones": ["Sencillo", "Doble"],
        "imagen": heladoDeMango
      },
      {
        "id": "HEL-005",
        "nombre": "Helado de Arrayán",
        "categoria": "Premium",
        "descripcion": "Helado artesanal de arrayán...",
        "presentaciones": ["Sencillo", "Doble"],
        "imagen": heladoDeArrayan
      },
      {
        "id": "HEL-006",
        "nombre": "Helado de Horchata",
        "categoria": "Súper Premium",
        "descripcion": "Helado artesanal inspirado en la tradicional horchata...",
        "presentaciones": ["Sencillo", "Doble"],
        "imagen": heladoDeHorchata
      },
      {
        "id": "HEL-007",
        "nombre": "Helado de Blueberry",
        "categoria": "Súper Premium",
        "descripcion": "Helado artesanal de blueberry...",
        "presentaciones": ["Sencillo", "Doble"],
        "imagen": heladoBlueBerry
      },
      {
        "id": "HEL-008",
        "nombre": "Helado de Leche con Oreo",
        "categoria": "Súper Premium",
        "descripcion": "Helado artesanal de leche con Oreo...",
        "presentaciones": ["Sencillo", "Doble"],
        "imagen": heladoDeLecheConOreo
      }
    ],

    "sundaes": [
      {
        "id": "SUN-001",
        "nombre": "Sundae de Oreo",
        "categoria": "Sundae",
        "descripcion": "Una combinación de helado artesanal con Oreo...",
        "imagen": sundaeDeOreo // O la imagen que corresponda
      },
      {
        "id": "SUN-002",
        "nombre": "Sundae de Cocada",
        "categoria": "Sundae",
        "descripcion": "Sundae de sabor cocada...",
        "imagen": sundaeDeCarcajada
      },
      {
        "id": "SUN-003",
        "nombre": "Sundae de Tamarindo",
        "categoria": "Sundae",
        "descripcion": "Sundae de tamarindo...",
        "imagen": sundaeDeTamarindo
      }
    ],

    "sorbemangoneadas": [
      {
        "id": "SOR-001",
        "nombre": "Sorbemangoneada",
        "categoria": "Sorbemangoneada",
        "descripcion": "Una especialidad de Helados Sonrisa...",
        "imagen": heladosPremiumImg
      }
    ],

    "minutas_dulces": [
      {
        "id": "MIN-D-001",
        "nombre": "Minuta Café",
        "categoria": "Minuta Dulce",
        "descripcion": "Minuta de hielo finamente raspado con sabor a café...",
        "imagen": minutaCafe
      },
      {
        "id": "MIN-D-002",
        "nombre": "Minuta Playa",
        "categoria": "Minuta Dulce",
        "descripcion": "Minuta refrescante de estilo dulce...",
        "imagen": minutaPlaya
      },
      {
        "id": "MIN-D-003",
        "nombre": "Minuta Tradicional",
        "categoria": "Minuta Dulce",
        "descripcion": "Una minuta de estilo tradicional salvadoreño...",
        "imagen": minutaTradicional
      },
      {
        "id": "MIN-D-004",
        "nombre": "Minuta Unicornio",
        "categoria": "Minuta Dulce",
        "descripcion": "Minuta dulce de presentación llamativa...",
        "imagen": minutaUnicornio
      },
      {
        "id": "MIN-D-005",
        "nombre": "Minuta Fresa con Crema",
        "categoria": "Minuta Dulce",
        "descripcion": "Minuta de hielo raspado combinada con fresa y crema...",
        "imagen": minutaFresaCrema
      }
    ],

    "minutas_saladas": [
      {
        "id": "MIN-S-001",
        "nombre": "Minuta Limón",
        "categoria": "Minuta Salada",
        "descripcion": "Minuta refrescante de limón...",
        "imagen": minutaLimon
      },
      {
        "id": "MIN-S-002",
        "nombre": "Minuta Pica Fresa",
        "categoria": "Minuta Salada",
        "descripcion": "Minuta que combina el sabor frutal de la fresa...",
        "imagen": minutaPicaFresa
      },
      {
        "id": "MIN-S-003",
        "nombre": "Minuta Michelada",
        "categoria": "Minuta Salada",
        "descripcion": "Minuta de perfil ácido y especiado...",
        "imagen": minutaMichelada
      },
      {
        "id": "MIN-S-004",
        "nombre": "Minuta Tamarindo",
        "categoria": "Minuta Salada",
        "descripcion": "Minuta refrescante de tamarindo...",
        "imagen": minutaTamarindo
      }
    ],

    "to_go": [
      {
        "id": "TOG-001",
        "nombre": "Helado To-Go",
        "categoria": "To-Go",
        "descripcion": "Nuestros helados artesanales para disfrutar en casa...",
        "presentaciones": ["Pinta", "Litro", "Medio galón"],
        "imagen": superPremiumImg
      }
    ],

    "sabores_especiales": [
      {
        "id": "ESP-001",
        "nombre": "Jocote en Miel",
        "categoria": "Sabor Especial",
        "descripcion": "Sabor especial inspirado en el tradicional jocote en miel...",
        "disponibilidad": "Temporada / eventos",
        "imagen": heladosPremiumImg
      },
      {
        "id": "ESP-002",
        "nombre": "Candy Cane",
        "categoria": "Sabor Especial",
        "descripcion": "Sabor especial de temporada...",
        "disponibilidad": "Temporada navideña",
        "imagen": superPremiumImg
      }
    ]
  }
};