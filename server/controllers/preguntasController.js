import Pregunta from '../models/pregunta.js';

// GET - Obtener todas las preguntas
const getPreguntas = async (req, res) => {
    try {
        // Llamada directa a la base de datos
        const preguntasDoc = await Pregunta.findOne();
        
        // Si no hay datos
        if (!preguntasDoc) {
            return res.status(404).json({ 
                mensaje: "No se encontraron preguntas." 
            });
        }

        // Responder con las preguntas
        res.status(200).json({
            preguntas: preguntasDoc.preguntas
        });

    } catch (error) {
        res.status(500).json({ 
            mensaje: "Error al obtener preguntas.",
            error: error.message 
        });
    }
};

export default getPreguntas;