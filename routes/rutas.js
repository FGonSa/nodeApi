import express from "express";
import  { nuevoCliente, mostrarClientes, showCliente, actualizarCliente, eliminarCliente } from '../controllers/clienteController.js'
import subirArchivo, { actualizarEmpresa, eliminarEmpresa, mostrarEmpresas, nuevaEmpresa, showEmpresa } from "../controllers/empresaController.js";

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

    //Eliminar cliente
    router.delete('/clientes/:idCliente', eliminarCliente)


    /**
    ----------------
    RUTAS EMPRESAS
    ----------------
    */

    //Mostrar todas las empresas
    router.get('/empresas', mostrarEmpresas)

    //Mostrar una empresa en concreto
    router.get('/empresas/:idEmpresa', showEmpresa)

    //Añadir Empresa nueva
    router.post('/empresas', subirArchivo, nuevaEmpresa)

    //Actualizar Empresa
    router.put('/empresas/:idEmpresa', subirArchivo, actualizarEmpresa)

    //Eliminar Empresa
    router.delete('/empresas/:idEmpresa', eliminarEmpresa)

    return router;
}