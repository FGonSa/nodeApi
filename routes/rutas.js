import express from "express";
import  { nuevoCliente, mostrarClientes, showCliente, actualizarCliente, eliminarCliente } from '../controllers/clienteController.js'
import subirArchivo, { actualizarEmpresa, eliminarEmpresa, mostrarEmpresas, nuevaEmpresa, showEmpresa } from "../controllers/empresaController.js";
import { actualizarServicio, eliminarServicio, mostrarServicios, nuevoServicio, showServicio } from "../controllers/servicioController.js";

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

        /**
    ----------------
    RUTAS SERVICIOS
    ----------------
    */

    //Mostrar todos los servicios
    router.get('/servicios', mostrarServicios)

    //Mostrar servicio en concreto
    router.get('/servicios/:idServicio', showServicio)

    //Añadir nuevo servicio
    router.post('/servicios/', nuevoServicio)

    //Actualizar servicio
    router.put('/servicios/:idServicio', actualizarServicio)

    //Eliminar servicio
    router.delete('/servicios/:idServicio', eliminarServicio)

    return router;
}