import mongoose from "mongoose";

const Schema = mongoose.Schema

const serviciosSchema = new Schema({
    cliente: {
        type: Schema.ObjectId,
        ref: "Clientes"
    },
    servicio: [{
        empresa: {
            type: Schema.ObjectId,
            ref: "Empresas"
        },
        horas: Number
    }],
    total: {
        type: Number
    }
})

const Servicios = mongoose.model('Servicios', serviciosSchema);
export default Servicios;