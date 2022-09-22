const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const Products = require("./model/data");

const app = express();
const products = new Products();
const { items } = products;

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//Definimos el metodo engine para los motores de HBS
/* app.engine(
  "hbs",
  engine({
    extname: "hbs", //nombre de la extension a manejar
    defaultLayout: "main.hbs",
    layoutsDir: path.resolve(__dirname, "./views/layouts"), //dirct plantillas layouts
    partialsDir: path.resolve(__dirname, "./views/partials"), //directorio plantillas partials
  })
); */

//metodo set para los motores de HBS
/* app.set("views", "./views"); //las vamos a utilizar de esta carpeta
app.set("view engine", "hbs"); //metodo y motor de plantilla */

//metodo set para los motores de PUG
/* app.set("views", "./views");
app.set("view engine", "pug"); */

//metodo ser para motores EJS
app.set("views", "./views");
app.set("view engine", "ejs");

app.post("/productos", (req, res) => {
  const data = req.body;
  const { title, price, thumbnail } = req.body;
  if (title || price || thumbnail) {
    products.save(data);
    res.redirect("/productos");
  }
});

app.get("/productos", (req, res) => {
  if (items.length >= 1) {
    res.render("index", {
      mostrarProductos: true,
      products: items,
    });
  } else {
    res.render("index", {
      mostrarProductos: false,
    });
  }
});

const connectedServer = app.listen(PORT, () => {
  console.log(`🚀Server active and listening on the port: ${PORT}`);
});

connectedServer.on("error", (error) => {
  console.log(`error:`, error.message);
});
