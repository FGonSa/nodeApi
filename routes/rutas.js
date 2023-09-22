import express from "express";
import  { nuevoCliente, mostrarClientes } from '../controllers/clienteController.js'

const router = express.Router()


export default () => {
    
    //Añadir clientes
    router.post('/clientes', nuevoCliente)

    //Mostrar clientes
    router.get('/clientes', mostrarClientes)
    return router;
}