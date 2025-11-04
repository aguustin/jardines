import inscripcion from "../models/inscripcion.js";
import jardin from "../models/jardin.js";

export const obtenerTodosLosDatosController = async (req, res) => {
    const obtenerDatos = await inscripcion.find()
    res.send(obtenerDatos)
}

export const obtenerJardinesController = async (req, res) => {
     const obtenerJardines = await jardin.find()

    res.send(obtenerJardines)
}

export const guardarDatosAdultoController = async (req, res) => {
    const {
         cuit,
         nombreAdulto,
         dniAdulto,
         fechaNacimientoAdulto,
         nacionalidad,
         convivencia,
         motivo,
         telefonoAdulto,
         emailAdulto,
         domicilio,
         estadoCivil,
         tienePareja,
         dniPareja,
         telefonoPareja,
         convivenciaPareja} = req.body;
    console.log(cuit)
    const adultoExiste = await inscripcion.find({cuit: Number(cuit) })

    if(adultoExiste.length > 0){
        return res.status(200).json({existe: 1})
    }

    await inscripcion.create({
        cuit: cuit ?? null,
        nombreAdulto: nombreAdulto ?? null,
        dniAdulto: dniAdulto ?? 0,
        fechaNacimientoAdulto: fechaNacimientoAdulto ?? null,
        nacionalidad: nacionalidad ?? null,
        convivencia: convivencia ?? null,
        motivo: motivo ?? null,
        telefonoAdulto: telefonoAdulto ?? 0,
        emailAdulto: emailAdulto ?? null,
        domicilio: domicilio ?? null,
        estadoCivil: estadoCivil ?? null,
        tienePareja: tienePareja ?? null,
        dniPareja: dniPareja ?? 0,
        telefonoPareja: telefonoPareja ?? 0,
        convivenciaPareja: convivenciaPareja ?? null
    });

    res.status(200).json({existe: 2})
}


export const guardarDatosNinosController = async (req, res) => {
    const {
        jardinId,
        cuit,
        cuil, 
        nombreNino,
        dniNino,
        nacimientoNino,
        nacionalidadNino,
        domicilioNino,
        poseeObraSocial,
        nombreObraSocial,
        efectorSalud,
        grupoSanguineo,
        alergico,
        descripcionAlergia,
        puntajeTotal,
        cantidadDeinscripciones
    } = req.body;

    try {
        const existeAdulto = await inscripcion.findOne({ cuit: Number(cuit) });
        if (!existeAdulto) {
            return res.status(404).json({ msg: "Adulto no encontrado" });
        }
        const existeNino = existeAdulto.ninos.find(n => n.cuil === cuil);

        if (existeNino) {
            await inscripcion.updateOne(
                { cuit: Number(cuit), "ninos.cuil": cuil },
                {
                    $set: {
                        "ninos.$.nombreNino": nombreNino ?? null,
                        "ninos.$.dniNino": dniNino ?? null,
                        "ninos.$.nacimientoNino": nacimientoNino ?? null,
                        "ninos.$.nacionalidadNino": nacionalidadNino ?? null,
                        "ninos.$.domicilioNino": domicilioNino ?? null,
                        "ninos.$.poseeObraSocial": poseeObraSocial ?? null,
                        "ninos.$.nombreObraSocial": nombreObraSocial ?? null,
                        "ninos.$.efectorSalud": efectorSalud ?? null,
                        "ninos.$.grupoSanguineo": grupoSanguineo ?? null,
                        "ninos.$.alergico": alergico ?? null,
                        "ninos.$.descripcionAlergia": descripcionAlergia ?? null,
                        "ninos.$.cantidadDeinscripciones": cantidadDeinscripciones ?? null
                    }
                }
            );
        } else {
            await inscripcion.updateOne(
                { cuit: Number(cuit) },
                {
                    $push: {
                        ninos: {
                            cuil: cuil ?? null,
                            nombreNino: nombreNino ?? null,
                            dniNino: dniNino ?? null,
                            nacimientoNino: nacimientoNino ?? null,
                            nacionalidadNino: nacionalidadNino ?? null,
                            domicilioNino: domicilioNino ?? null,
                            poseeObraSocial: poseeObraSocial ?? null,
                            nombreObraSocial: nombreObraSocial ?? null,
                            efectorSalud: efectorSalud ?? null,
                            grupoSanguineo: grupoSanguineo ?? null,
                            alergico: alergico ?? null,
                            descripcionAlergia: descripcionAlergia ?? null,
                            //puntajeTotal: puntajeTotal ?? null,
                            cantidadDeinscripciones: cantidadDeinscripciones ?? null
                        }
                    }
                }
            );
        }
        const jardinModel = await jardin.findById(jardinId);

        if (!jardinModel) {
            return res.status(404).json({ msg: "Jardín no encontrado" });
        }

        const existeNinoJardin = jardinModel?.ninosJardin?.find(n => n.cuil === Number(cuil));

        if (!existeNinoJardin) {
            await jardin.updateOne(
                { _id: jardinId },
                {
                    $push: {
                        ninosJardin: {
                            cuil: cuil ?? null,
                            nombreNino: nombreNino ?? null,
                            dniNino: dniNino ?? null,
                            puntajeTotal: puntajeTotal ?? null
                        }
                    }
                }
            );
        }
        return res.status(200).json({ msg: "La funcion fue completada con exito" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Error del servidor' });
    }
};



export const crearJardinesController = async (req, res) => {
    const {nombreJardin, domicilio, turnoManana, turnoTarde} = req.body

    await jardin.create({
        nombreJardin: nombreJardin,
        domicilio: domicilio,
        turnoManana: turnoManana,
        turnoTarde: turnoTarde,
        estado: 1
    })

    res.sendStatus(200)
}

export const cambiarEstadoJardinController = async (req, res) => {
    const {jardinId, estado} = req.body
    
    await jardin.updateOne(
        {_id: jardinId},
        {
            $set:{
                estado: estado
            }
        }
    )

    res.sendStatus(200)
}