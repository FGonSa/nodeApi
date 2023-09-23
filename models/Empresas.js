import mongoose from "mongoose";

const Schema = mongoose.Schema

const empresasSchema = new Schema({
    nombre: {
        type: String,
        trim: true
    },
    CIF: {
        unique: true,
        type: String,
        trim: true
    },
    imagen: {
        type: String
    },
})

const Empresa = mongoose.model('Empresas', empresasSchema);
export default Empresa