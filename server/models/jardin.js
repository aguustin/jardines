import mongoose from "mongoose";

const jardinSchema = mongoose.Schema({
    nombreJardin:{type: String},
    domicilio:{type: String},
    turnoManana:{type: Boolean},
    turnoTarde:{type: Boolean},
    estado:{type: Number},
    ninosJardin:[{
        cuil:{type:Number},
        nombreNino:{type:String},
        dniNino:{type:Number},
        puntajeTotal:{type:Number}
    }]
})

export default mongoose.model("jardinModel", jardinSchema)

