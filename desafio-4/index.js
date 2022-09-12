const express = require("express");
const apiRouters = require("./routers/app.routers");
const PORT = process.env.PORT || 8080;

const app = express();

//Middlewares a nivel de aplicación
app.use(express.json());

app.use("/api", apiRouters);

const connectedServer = app.listen(PORT, () => {
  console.log(`🚀Server active and listening on the port: ${PORT}`);
});

connectedServer.on("error", (error) => {
  console.log(`error:`, error.message);
});
