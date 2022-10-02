const socket = io();

//Seleccionamos el div donde cargaremos los productos en tiempo real
const div = document.getElementById("divProduct");

//Mediante el metodo on(), renderizamos los productos cargados.
socket.on("items", (data) => {
  //console.log(data);
  const table = `
  <tr>
    <th>Nombre</th>
    <th>Precio</th>
    <th>Imagen</th>
  </tr>`;
  const html = data
    .map((product) => {
      let insert = ` 
      <tr>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td><img src=${product.thumbnail} alt=${product.id}/></td>
      </tr>
        `;
      return insert;
    })
    .join("");
  div.innerHTML = `${table} ${html}`;
});

//Usamos fetch para llamar a nuestra api/productos (productos almacenados en tiempo real)
fetch("http://localhost:8080/api/productos")
  .then((res) => res.json())
  .then((products) => {
    //console.log(products);
  });

//CHAT - MESSAGE ------------------------------------------------------------
const formChat = document.getElementById("form-chat");
const inputEmail = document.getElementById("input-email");
const inputText = document.getElementById("input-text");

formChat.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = inputEmail.value.toUpperCase();
  const message = inputText.value;
  socket.emit("new-user", user);
  socket.emit("new-message", message);
  inputEmail.value = user;
  inputText.value = "";
});

socket.on("chat-message", (data) => {
  const user = data.email;
  const message = data.text;
  socket.on("disc", () => {
    document.getElementById(
      "chat"
    ).innerHTML = `<p style="color: red"><b>User: ${user} disconnect</b></p>`;
  });
  document.getElementById(
    "chat"
  ).innerHTML += `<p style="padding-top: 0.3rem"><b><span style="color: blue">${user}</b></span> 
  <span style="color: brown">[${data.time}]:</span> 
  <span style="color:green"><i>${message}</i></span></p>`;
});

socket.on("message", (data) => {
  const html = data
    .map((user) => {
      let render = `
    <p style="padding-top: 0.5rem"><b><span style="color: blue">${user.email}</b></span> 
    <span style="color: brown">[${user.time}]:</span> 
    <span style="color: green"><i>${user.text}</i></span></p>
    `;
      return render;
    })
    .join("\n");
  document.getElementById("chat").innerHTML = html;
});
