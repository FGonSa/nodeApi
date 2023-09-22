import Cliente from "../models/Clientes.js"


//Mostrar todos los clientes

export const mostrarClientes = async (req,res, next) =>{
    try {
        const clientes = await Cliente.find({})
        res.json(clientes)
        console.log('Mostrado GET con éxito.')
    } catch (error) {
        console.log(error)
        next()
    }
}


//añadir nuevo cliente
export const nuevoCliente = async (req,res, next) => {
    const cliente = new Cliente(req.body)

    try {
        await cliente.save()
        console.log(req.body)
        res.json({msg: "Se agregó nuevo cliente."})
    } catch (error) {
        console.log(error)
        next()
    }
}

