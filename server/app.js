// Importar Express
import express from 'express';
import morgan from 'morgan';
import cors from "cors"
import { dbConnection } from './conexion.js';
import { port } from './config.js';
import jardinRoute from "./routes/jardinRoutes.js"

dbConnection()
const app = express();
// Configurar el puerto
const PORT = process.env.PORT || 4000;

// Middleware para parsear JSON (opcional)
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(morgan('tiny'))

// Ruta de ejemplo
app.use(jardinRoute)
// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
