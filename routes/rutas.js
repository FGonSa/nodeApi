import express from "express";
import  { nuevoCliente, mostrarClientes, showCliente, actualizarCliente } from '../controllers/clienteController.js'
import subirArchivo, { mostrarEmpresas, nuevaEmpresa, showEmpresa } from "../controllers/empresaController.js";

const router = express.Router()


export default () => {
    
    /**
    ----------------
    RUTAS CLIENTES
    ----------------
    */
    //Añadir clientes
    router.post('/clientes', nuevoCliente)

    //Mostrar clientes
    router.get('/clientes', mostrarClientes)

    //Mostrar un cliente específico con su ID
    router.get('/clientes/:idCliente', showCliente)

    //Actualizar cliente
    router.put('/clientes/:idCliente', actualizarCliente)


    /**
    ----------------
    RUTAS EMPRESAS
    ----------------
    */

    //Mostrar todas las empresas
    router.get('/empresas', mostrarEmpresas)

    //Mostrar todas las empresas
    router.get('/empresas/:idEmpresa', showEmpresa)

    //Añadir Empresa nueva
    router.post('/empresas', subirArchivo, nuevaEmpresa)

    return router;
}