import mongoose from "mongoose";

const inscripcionSchema = mongoose.Schema({
    cuit:{type:Number},
    nombreAdulto:{type: String},
    dniAdulto:{type: Number},
    fechaNacimientoAdulto:{type: Date},
    nacionalidad:{type:String},
    convivencia:{type: Boolean},
    motivo:{type:String},
    telefonoAdulto:{type:Number},
    emailAdulto:{type:String},
    domicilio:{type:String},
    estadoCivil:{type: Number},
    tienePareja:{type: String},
    dniPareja:{type: Number},
    telefonoPareja:{type:Number},
    convivenciaPareja:{type:Boolean},
    ninos:[{
        cuil:{type:Number},
        nombreNino:{type:String},
        dniNino:{type:Number},
        imagenDniFrente:{type:String},
        imagenDniDorso:{type:String},
        nacimientoNino:{type: Date},
        nacionalidadNino:{type:String},
        domicilioNino:{type:String},
        poseeObraSocial:{type:Boolean},
        nombreObraSocial:{type:String},
        efectorSalud:{type:String},
        grupoSanguineo:{type:String},
        alergico:{type:String},
        descripcionAlergia:{type:String},
        // puntajeTotal:{type:Number},
        imagenCud:{type:String},
        cantidadDeInscripciones:{type:Number}
    }]
})

export default mongoose.model("inscripcionModel", inscripcionSchema)