import Servicios from "../models/Servicios.js";

//Mostrar todos los servicios
export const mostrarServicios = async (req, res, next) => {
    try {
      const servicios = await Servicios.find({}).populate('cliente').populate({
        path: 'servicio.empresa',
        model: 'Empresas'
      });
      res.json(servicios);
      console.log("Mostrado GET con éxito.");
    } catch (error) {
      console.log(error);
      next();
    }
  };
  
  //Mostrar un único servicio
  export const showServicio = async (req, res, next) => {
    const servicio = await Servicios.findById(req.params.idServicio).populate('cliente').populate({
      path: 'servicio.empresa',
      model: 'Empresas'
    });
  
    if (!servicio) {
      res.json({ msg: "No existe servicio con ese ID" });
      console.log("No existe servicio con ese ID");
      next();
    } else {
      res.json(servicio);
      console.log("Servicio encontrado con éxito.");
    }
  };


//Añadir un nuevo Servicio
export const nuevoServicio = async (req, res, next) => {
    const servicio = new Servicios(req.body)
    try {
        await servicio.save()
        console.log("Se agregó un nuevo servicio correctamente.")
        res.json({msg: "Se agregó un nuevo servicio correctamente."})
    } catch (error) {
        console.log(error)
        next()
    }
}
