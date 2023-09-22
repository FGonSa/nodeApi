import express from "express";
import rutas from "./routes/rutas.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";

// busca el archivo .env en la raíz del proyecto y carga todas las variables de entorno definidas en el archivo
dotenv.config();

//crear servidor
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//rutas
app.use("/", rutas());

 /*
==============
MONGOOSE SETUP
==============
*/

//Conexión con el Puerto que hay en ENV o en su defecto 6001
const PORT = process.env.PORT || 6001;

//Conexión MONGO DB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* INSERTAR MOCK DATA de la carpeta DATA 
      Esto sólo se hace la primera vez que usamos la APP.
      Después es necesario comentar estas líneas de código.
      Insertamos datos de prueba en MongoDB.
    */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));
