import Cliente from "../models/Clientes.js";

//Mostrar todos los clientes
export const mostrarClientes = async (req, res, next) => {
  try {
    const clientes = await Cliente.find({});
    res.json(clientes);
    console.log("Mostrado GET con éxito.");
  } catch (error) {
    console.log(error);
    next();
  }
};

//Mostrar un único cliente
export const showCliente = async (req, res, next) => {
  const cliente = await Cliente.findById(req.params.idCliente);

  if (!cliente) {
    res.json({ msg: "No existe cliente con ese ID" });
    console.log("No existe cliente con ese ID");
    next();
  } else {
    res.json(cliente);
    console.log("Cliente encontrado con éxito.");
  }
};

//añadir nuevo cliente
export const nuevoCliente = async (req, res, next) => {
  const cliente = new Cliente(req.body);

  try {
    await cliente.save();
    console.log(req.body);
    console.log("Nuevo cliente creado con éxito.");
    res.json({ msg: "Se agregó nuevo cliente." });
  } catch (error) {
    console.log(error);
    next();
  }
};

//Actualizar cliente
export const actualizarCliente = async (req, res, next) => {
  try {
    const cliente = await Cliente.findByIdAndUpdate(
      { _id: req.params.idCliente },
      req.body,
      {
        new: true,
      }
    );
    res.json(cliente);
    console.log("Cliente actualizado con éxito.");
  } catch (error) {
    console.log(error);
    next();
  }
};
