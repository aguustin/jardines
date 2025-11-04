import mongoose from "mongoose";

const inscripcionSchema = mongoose.Schema({
    nombreAdulto:{type: String},
    dniAdulto:{type: Number},
    fechaNacimientoAdulto:{type: String},
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
        nombreNino:{type:String},
        dniNino:{type:Number},
        nacimientoNino:{type:String},
        nacionalidadNino:{type:String},
        domicilioNino:{type:String},
        poseeObra:{type:Boolean},
        nombreObraSocial:{type:String},
        efectorSalud:{type:String},
        grupoSnguineo:{type:String},
        alergico:{type:String},
        puntajeTotal:{type:Number},
        cantidadDeInscripciones:{type:Number}
    }]
})

export default mongoose.model("inscripcionModel", inscripcionSchema)