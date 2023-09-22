import express from "express";
import  { nuevoCliente, mostrarClientes, showCliente, actualizarCliente } from '../controllers/clienteController.js'

const router = express.Router()


export default () => {
    
    //Añadir clientes
    router.post('/clientes', nuevoCliente)

    //Mostrar clientes
    router.get('/clientes', mostrarClientes)

    //Mostrar un cliente específico con su ID
    router.get('/clientes/:idCliente', showCliente)

    //Actualizar cliente
    router.put('/clientes/:idCliente', actualizarCliente)

    return router;
}