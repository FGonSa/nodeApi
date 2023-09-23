
import Empresa from "../models/Empresas.js";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import shortid from 'shortid';

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
      if(req.file.filename){
        empresa.imagen = req.file.filename
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


  /**
  --------------------------
  CONFIGURACIÓN MULTER PARA SUBIR IMAGEN
  --------------------------
  */
  const configuracionMulter = {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '../../uploads/')
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`)
        }
    }),
    fileFilter(req, file, cb) {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            cb(null, true);
        }else{
            cb(new Error('Formato no válido'))
        }
    }
  }

  //pasar la configuración y el campo del modelo Schema
  const upload = multer(configuracionMulter).single('imagen') //campo IMAGEN

  //sube un archivo
  const subirArchivo = (req, res, next) => {
    upload(req, res, function(error) {
        if(error){
            res.json({msg: error})
        }
        return next()
    })
  }

  export default subirArchivo