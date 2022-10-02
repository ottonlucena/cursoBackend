const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const Products = require("./model/data");
const { formatMessage } = require("./utils/utils");
const fs = require("fs");

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
const { data } = products;

//Midllewaress
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
  if (!title || !price || !thumbnail) {
    return;
  }
  products.save(data);
  res.redirect("/");
});

app.get("*", (req, res) => {
  res.status(404).send(`<h1>Path not found</h1>`);
});

//Variables
const messages = [];
const users = [];

//Método io() con sus parámetros
io.on("connection", (socket) => {
  console.log(`Nuevo usuario conectado!`);

  io.emit("items", [...items]);

  io.emit("message", [...messages]);

  socket.on("new-user", (email) => {
    const newUser = {
      id: socket.id,
      email: email,
    };
    users.push(newUser);
  });

  socket.on("new-message", async (msg) => {
    const user = users.find((user) => user.id === socket.id);
    const newMessage = formatMessage(socket.id, user.email, msg);
    messages.push(newMessage);
    products.saveMessage(user.email, msg, newMessage.time);
    //Creamos un documento txt donde almacenamos todos los mensajes enviados.
    /* fs.appendFile("conversacion.txt", JSON.stringify(data), (err) => {
      if (err) {
        throw err;
      }
      console.log(`Archive create sucessfull`);
    }); */

    io.emit("chat-message", newMessage);
  });

  const id = socket.id;
  console.log(id);
  socket.on("disconnect", () => {
    io.emit("disc", `${id}`);
    console.log(`disconect ${id}`);
  });
});

//Conexión del Servidor
const connectedServer = httpServer.listen(PORT, () => {
  console.log(`🚀Server active and listening on the port: ${PORT}`);
});

connectedServer.on("error", (error) => {
  console.log(`error:`, error.message);
});
