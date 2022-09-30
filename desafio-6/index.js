const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const Products = require("./model/data");

//Instanciamos nuestro servidor con socket
const { Server: HttpServer } = require("http");
const { Server: SocketServer } = require("socket.io");

const app = express();
const PORT = process.env.PORT || 8080;
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);

//Instanciamos nuestra data
const products = new Products();
const { items } = products;

//Midllewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//Definimos el metodo engine para los motores de HBS
app.engine(
  "hbs",
  engine({
    extname: "hbs", //nombre de la extension a manejar
    defaultLayout: "main.hbs",
    layoutsDir: path.resolve(__dirname, "./views/layouts"), //dirct plantillas layouts
    partialsDir: path.resolve(__dirname, "./views/partials"), //directorio plantillas partials
  })
);

//metodo set para los motores de HBS
app.set("views", __dirname + "/views"); //las vamos a utilizar de esta carpeta
app.set("view engine", "hbs"); //metodo y motor de plantilla

//Api de productos.
app.get("/api/productos", (req, res) => {
  res.json(items);
});

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  const data = req.body;
  const { title, price, thumbnail } = req.body;
  if (title || price || thumbnail) {
    products.save(data);
    res.redirect("/");
  }
});

app.get("*", (req, res) => {
  res.status(404).send(`<h1>Path not found</h1>`);
});

//Variable
const messages = [];
const users = [];

//Socket
io.on("connection", (socket) => {
  console.log(`Nuevo usuario conectado!`);

  io.emit("items", [...items]);

  io.emit("chat-message", [...messages]);
});

//Conexión del Servidor
const connectedServer = httpServer.listen(PORT, () => {
  console.log(`🚀Server active and listening on the port: ${PORT}`);
});

connectedServer.on("error", (error) => {
  console.log(`error:`, error.message);
});
