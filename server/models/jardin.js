import mongoose from "mongoose";

const jardinSchema = mongoose.Schema({
    nombreJardin:{type: String},
    domicilio:{type: String},
    turno:{type: Number}
})

export default mongoose.model("jardinModel", jardinSchema)

