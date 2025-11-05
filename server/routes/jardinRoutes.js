import { Router } from "express";
import getPreguntas from "../controllers/preguntasController.js";
import { cambiarEstadoJardinController, crearJardinesController, guardarDatosAdultoController, guardarDatosNinosController, obtenerJardinesController, obtenerTodosLosDatosController } from "../controllers/datosController.js";
import multer from "multer";

const router = Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'tmp/'); // carpeta temporal para subir los archivos antes de pasarlos a SFTP
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // mantiene el nombre original
    }
});

const upload = multer({ storage });

router.get('/obtener_datos', obtenerTodosLosDatosController)

router.get('/obtener_jardines', obtenerJardinesController)

router.post('/guardar_datos_adulto', guardarDatosAdultoController)

router.post('/guardar_datos_ninos',
    upload.fields([
        { name: 'imagenUno', maxCount: 1 },
        { name: 'imagenDos', maxCount: 1 },
        { name: 'imagenTres', maxCount: 1 }
    ]), guardarDatosNinosController)

router.post('/crear_jardin', crearJardinesController)

router.post('/cambiar_estado_jardin', cambiarEstadoJardinController)

router.get('/preguntas', getPreguntas);



export default router