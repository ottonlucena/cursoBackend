const fs = require("fs");
const express = require("express");
const modulo = require("./contenedor.js");
const app = express();
const PORT = process.env.PORT || 8080;

//Asignamos el objeto de productos JSON a la class Contenedor
let container = new modulo.Contenedor("productos.json");

//app.get (metodo para asignar mediante express la respuesta get al usuario, parametro de ruta y callback)
//En este caso se hace con la function async await epserando el resultado del metodo getAll(nos devuelve un objeto)
app.get("/productos", (req, res) => {
  let productos = async () => {
    try {
      const data = await container.getAll().then((res) => JSON.stringify(res));
      res.send(`<h1>Lista de productos:</h1>\n ${data}`);
    } catch (err) {
      console.log(err);
    }
  };
  productos();
});

app.get("/productoRandom", (req, res) => {
  let productRandom = async () => {
    try {
      const data = await container.getAll().then((res) => res);
      const numberMax = data.length;
      let numberRandom = Math.floor(Math.random() * numberMax + 1);
      res.send(
        `<h1>El producto elegido es el numero (${numberRandom})</h1>\n ${JSON.stringify(
          await container.getById(numberRandom)
        )}`
      );
    } catch (err) {
      console.log(err);
    }
  };
  productRandom();
});

//Esta ruta (*), se asigna a todas las rutas que no tenemos definidas.
app.get("*", (req, res) => {
  res.send(
    `<h1>Ruta no existe.</h1>\n <h2>Rutas existentes: '/productos' & '/productoRandom'</h2>`
  );
});

//El metodo (app.listen), nos indica cuando inicializamos el proyecto, escucha cualquier cambio dentro de el.
const connectedServer = app.listen(PORT, () => {
  console.log(`Servidor activo y escuchando en el puerto ${PORT}`);
});

//Captura y nos permite manejar cualquier error, lo veremos mas adelante
connectedServer.on("error", () => {
  console.log(`Ocurrio un error: ${error.message}`);
});
