import { Router } from "express";
import { cambiarEstadoJardinController, crearJardinesController, guardarDatosAdultoController, guardarDatosNinosController, obtenerJardinesController, obtenerTodosLosDatosController } from "../controllers/datosController.js";

const router = Router()

router.get('/obtener_datos', obtenerTodosLosDatosController)

router.get('/obtener_jardines', obtenerJardinesController)

router.post('/guardar_datos_adulto', guardarDatosAdultoController)

router.post('/guardar_datos_ninos', guardarDatosNinosController)

router.post('/crear_jardin', crearJardinesController)

router.post('/cambiar_estado_jardin', cambiarEstadoJardinController)



export default router