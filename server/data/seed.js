import mongoose from 'mongoose';
import Pregunta from '../models/pregunta.js'; // Ajusta la ruta según tu proyecto

// Datos iniciales de las preguntas

// Temporal
const preguntasIniciales = [
    {
        id: 1,
        text: "Domicilio actual del niño/a",
        options: [
        { id: 1, text: "Es cercano al JMM(hasta 1 km)", score: 2 },
        { id: 2, text: "Es lejano al JMM", score: 0 }
        ],
        selectedOptionId: ""
    },
    {
        id: 2,
        text: "Domicilio laboral",
        options: [
        { id: 1, text: "Es cercano al JMM(hasta 1 km)", score: 2 },
        { id: 2, text: "Es lejano al JMM", score: 0 }
        ],
        selectedOptionId: ""
    },
    {
        id: 3,
        text: "Madre/ padre o adulto responsable trabaja en la Municipalidad de Godoy Cruz",
        options: [
        { id: 1, text: "Sí", score: 2 },
        { id: 2, text: "No", score: 0 }
        ],
        selectedOptionId: ""
    },
    {
        id: 4,
        text: "Ingresos mensuales que registra la familia conviviente",
        options: [
        { id: 1, text: "menos de $400.000", score: 3 },
        { id: 2, text: "entre $400.000 a $800.000", score: 2 },
        { id: 3, text: "más de $800.000", score: 0 }
        ],
        selectedOptionId: ""
    },
    {
        id: 5,
        text: "Recibe ayuda económica como: Asignación Universal por Hijo, Alimentar.",
        options: [
        { id: 1, text: "SI", score: 2 },
        { id: 2, text: "NO", score: 0 }
        ],
        selectedOptionId: ""
    },
    {
        id: 6,
        text: "Hermano/a actualmente asiste al jardín",
        options: [
        { id: 1, text: "Si", score: 3 },
        { id: 2, text: "NO", score: 0 }
        ],
        selectedOptionId: ""
    },
    {
        id: 7,
        text: "Estado nutricional",
        options: [
        { id: 1, text: "Normal", score: 0 },
        { id: 2, text: "Sobrepeso", score: 1 },
        { id: 3, text: "Déficit nutricional", score: 2 }
        ],
        selectedOptionId: ""
    },
    {
        id: 8,
        text: "Niño/a prematuro",
        options: [
        { id: 1, text: "SI", score: 1 },
        { id: 2, text: "NO", score: 0 }
        ],
        selectedOptionId: ""
    },
    {
        id: 9,
        text: "Vacunas",
        options: [
        { id: 1, text: "Completas", score: 0 },
        { id: 2, text: "Incompletas", score: 2 }
        ],
        selectedOptionId: ""
    },
    {
        id: 10,
        text: "Tipo de construcción de la vivienda familiar",
        options: [
        { id: 1, text: "Material", score: 0 },
        { id: 2, text: "Abode", score: 1 },
        { id: 3, text: "Módulo de madera", score: 2 },
        { id: 4, text: "Chapa y/o Nylon", score: 3 }
        ],
        selectedOptionId: ""
    },
    {
        id: 11,
        text: "Condición vivienda",
        options: [
        { id: 1, text: "Propia", score: 0 },
        { id: 2, text: "Alquilada", score: 2 },
        { id: 3, text: "Cedida/ prestada", score: 1 },
        { id: 4, text: "situación de calle", score: 3 }
        ],
        selectedOptionId: ""
    },
    {
        id: 12,
        text: "Agua potable",
        options: [
        { id: 1, text: "Sí", score: 0 },
        { id: 2, text: "No", score: 3 }
        ],
        selectedOptionId: ""
    },
    {
        id: 13,
        text: "Luz",
        options: [
        { id: 1, text: "Sí", score: 0 },
        { id: 2, text: "No", score: 3 }
        ],
        selectedOptionId: ""
    },
    {
        id: 14,
        text: "Gas natural",
        options: [
        { id: 1, text: "Sí", score: 0 },
        { id: 2, text: "No", score: 2 }
        ],
        selectedOptionId: ""
    },
    {
        id: 15,
        text: "Baño dentro de vivienda",
        options: [
        { id: 1, text: "Sí", score: 0 },
        { id: 2, text: "No", score: 2 }
        ],
        selectedOptionId: ""
    },
    {
        id: 16,
        text: "Red cloacal",
        options: [
        { id: 1, text: "Sí", score: 0 },
        { id: 2, text: "No", score: 2 }
        ],
        selectedOptionId: ""
    },
    {
        id: 17,
        text: "Comparte vivienda con otra familia",
        options: [
        { id: 1, text: "Sí", score: 2 },
        { id: 2, text: "No", score: 0 }
        ],
        selectedOptionId: ""
    },
    {
        id: 18,
        text: "Cantidad de personas que viven en la misma vivienda",
        options: [
        { id: 1, text: "0 a 5 integrantes", score: 0 },
        { id: 2, text: "más de 5 integrantes", score: 2 },
        { id: 3, text: "más de 10 integrantes", score: 3 }
        ],
        selectedOptionId: ""
    },
    {
        id: 19,
        text: "El/la niño/a Comparte dormitorio con +3 personas",
        options: [
        { id: 1, text: "Sí", score: 2 },
        { id: 2, text: "No", score: 0 }
        ],
        selectedOptionId: ""
    },
    {
        id: 20,
        text: "El/la niño/a Comparte cama con otra persona",
        options: [
        { id: 1, text: "Sí", score: 2 },
        { id: 2, text: "No", score: 0 }
        ],
        selectedOptionId: ""
    },
    {
        id: 21,
        text: "Consumos problemáticos en la familia directa",
        options: [
        { id: 1, text: "Sí", score: 3 },
        { id: 2, text: "No", score: 0 }
        ],
        selectedOptionId: ""
    },
    {
        id: 22,
        text: "La familia es o ha sido intervenida por ETI, Juzgado, PPMI, género, Niñez",
        options: [
        { id: 1, text: "Sí", score: 3 },
        { id: 2, text: "No", score: 0 }
        ],
        selectedOptionId: ""
    },
    {
        id: 23,
        text: "Madre/padre o adulto como único responsable",
        options: [
        { id: 1, text: "Sí", score: 2 },
        { id: 2, text: "No", score: 0 }
        ],
        selectedOptionId: ""
    },
    {
        id: 24,
        text: "Madre/padre falleció",
        options: [
        { id: 1, text: "Sí", score: 2 },
        { id: 2, text: "No", score: 0 }
        ],
        selectedOptionId: ""
    },
    {
        id: 25,
        text: "Madre adolescente",
        options: [
        { id: 1, text: "Sí (hasta 20 años)", score: 2 },
        { id: 2, text: "No", score: 0 }
        ],
        selectedOptionId: ""
    },
    {
        id: 26,
        text: "Prohibición de acercamiento al niño/a por parte de alguno de los progenitores",
        options: [
        { id: 1, text: "Sí", score: 2 },
        { id: 2, text: "No", score: 0 }
        ],
        selectedOptionId: ""
    },
    {
        id: 27,
        text: "Prohibición de acercamiento entre progenitores",
        options: [
        { id: 1, text: "Sí", score: 1 },
        { id: 2, text: "No", score: 0 }
        ],
        selectedOptionId: ""
    },
    {
        id: 28,
        text: "Niño/a vive en efector provincial",
        options: [
        { id: 1, text: "Sí", score: 3 },
        { id: 2, text: "No", score: 0 }
        ],
        selectedOptionId: ""
    },
    {
        id: 29,
        text: "Familiar privado de libertad",
        options: [
        { id: 1, text: "Madre / Padre / Responsable", score: 3 },
        { id: 2, text: "No corresponde", score: 0 }
        ],
        selectedOptionId: ""
    },
    {
        id: 30,
        text: "Progenitor/responsable con discapacidad",
        options: [
        { id: 1, text: "Sí", score: 2 },
        { id: 2, text: "No", score: 0 }
        ],
        selectedOptionId: ""
    },
    {
        id: 31,
        text: "Único adulto a cargo con discapacidad",
        options: [
        { id: 1, text: "Sí", score: 3 },
        { id: 2, text: "No", score: 0 }
        ],
        selectedOptionId: ""
    },
    {
        id: 32,
        text: "Niño/a con CUD (certificado único de discapacidad)",
        options: [
        { id: 1, text: "Sí", score: 4 },
        { id: 2, text: "No", score: 0 }
        ],
        selectedOptionId: ""
    },
    {
        id: 33,
        text: "Hermano/a con discapacidad",
        options: [
        { id: 1, text: "Sí", score: 2 },
        { id: 2, text: "No", score: 0 }
        ],
        selectedOptionId: ""
    },
    {
        id: 34,
        text: "Progenitor/responsable conviviente con enfermedad severa",
        options: [
        { id: 1, text: "Sí", score: 2 },
        { id: 2, text: "No", score: 0 }
        ],
        selectedOptionId: ""
    }
  ];
    

async function seedPreguntas() {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jardines');
    
    console.log("✅ Conectado a MongoDB");
    console.log("Iniciando la siembra de preguntas...");

    // Limpiar la colección existente (opcional)
    await Pregunta.deleteMany({});
    console.log("🗑️  Colección limpiada");

    // Crear el documento con todas las preguntas
    const preguntasDoc = new Pregunta({
      preguntas: preguntasIniciales
    });

    // Guardar en la base de datos
    await preguntasDoc.save();

    console.log(`✅ Siembra de datos completada. ${preguntasIniciales.length} preguntas agregadas.`);
    
    // Cerrar la conexión
    await mongoose.connection.close();
    process.exit(0);
    
  } catch (error) {
    console.error("❌ Error durante la siembra de datos:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

// Ejecutar el seed
seedPreguntas();