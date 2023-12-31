import Empresa from "../models/Empresas.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import shortid from "shortid";
import * as fs from 'fs';

//Variables que hay que importar en ES6 ya que en CommonJS no se importan pero en ES6 SÍ
//Sirven para la configuración de Multer, para subir archivos
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Mostrar todas las empresas
export const mostrarEmpresas = async (req, res, next) => {
  try {
    const empresas = await Empresa.find({});
    res.json(empresas);
    console.log("Mostrado GET con éxito.");
  } catch (error) {
    console.log(error);
    next();
  }
};

//añadir nueva empresa
export const nuevaEmpresa = async (req, res, next) => {
  const empresa = new Empresa(req.body);

  try {
    if (req.file.filename) {
      empresa.imagen = req.file.filename;
    }
    await empresa.save();
    console.log(req.body);
    console.log("Nueva empresa añadida con éxito.");
    res.json({ msg: "Nueva empresa añadida con éxito." });
  } catch (error) {
    console.log(error);
    next();
  }
};

//Mostrar una única empresa
export const showEmpresa = async (req, res, next) => {
  const empresa = await Empresa.findById(req.params.idEmpresa);

  if (!empresa) {
    res.json({ msg: "No existe empresa con ese ID" });
    console.log("No existe empresa con ese ID");
    next();
  } else {
    res.json(empresa);
    console.log("Empresa encontrada con éxito.");
  }
};

//Actualizar Empresa
export const actualizarEmpresa = async (req, res, next) => {
  try {
    let empresaAnterior = await Empresa.findById(req.params.idEmpresa);

    //construir registro de nueva empresa
    const nuevaEmpresaData = {
      nombre: req.body.nombre,
      CIF: empresaAnterior.CIF, // Mantener el mismo CIF
      imagen: req.body.imagen || empresaAnterior.imagen, // Mantener la imagen o usar la nueva si se proporciona
    };

    // Realizar la actualización
    const empresaActualizada = await Empresa.findByIdAndUpdate(
      req.params.idEmpresa,
      nuevaEmpresaData,
      { new: true }
    );

    res.json(empresaActualizada);
    console.log("Empresa actualizada con éxito.");
  } catch (error) {
    console.log(error);
    next();
  }
};

// Eliminar empresa y su imagen
export const eliminarEmpresa = async (req, res, next) => {
  try {
    // Obtén la empresa antes de eliminarla para obtener la ruta de la imagen
    const empresaAEliminar = await Empresa.findOne({ _id: req.params.idEmpresa });

    if (!empresaAEliminar) {
      return res.status(404).json({ msg: "Empresa no encontrada." });
    }

    // Elimina la empresa de la base de datos
    await Empresa.findOneAndDelete({ _id: req.params.idEmpresa });

    // Obtén la ruta de la imagen
    const rutaImagen = `uploads/${empresaAEliminar.imagen}`;

    // Verifica si la imagen existe y, si es así, elimínala
    if (fs.existsSync(rutaImagen)) {
      fs.unlinkSync(rutaImagen);
      console.log(`Imagen eliminada: ${rutaImagen}`);
    }

    res.json({ msg: "Empresa eliminada con éxito." });
    console.log("Empresa eliminada con éxito.")
  } catch (error) {
    console.log(error);
    next();
  }
};

/**
  --------------------------
  --------------------------
  CONFIGURACIÓN MULTER PARA SUBIR IMAGEN
  --------------------------
  --------------------------
  */
const configuracionMulter = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + "../../uploads/");
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split("/")[1];
      cb(null, `${shortid.generate()}.${extension}`);
    },
  }),
  fileFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Formato no válido"));
    }
  },
};

//pasar la configuración y el campo del modelo Schema
const upload = multer(configuracionMulter).single("imagen"); //campo IMAGEN

//sube un archivo
const subirArchivo = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      res.json({ msg: error });
    }
    return next();
  });
};

export default subirArchivo;
