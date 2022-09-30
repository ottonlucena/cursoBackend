const socket = io();

const div = document.getElementById("divProduct");

socket.on("items", (data) => {
  console.log(data);
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

/* socket.on("items", (data) => {
  //console.log(data);
  fetch("api/productos")
    .then((res) => res.json())
    .then((products) => {
      //console.log(products);
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
    }); */

fetch("http://localhost:8080/api/productos")
  .then((res) => res.json())
  .then((products) => {
    console.log(products);
  });

/* const chat = document.getElementById("chat"); */

socket.on("chat-message", (message) => {
  console.log(message);
  document.getElementById("chat").innerHTML = "hola";
});
