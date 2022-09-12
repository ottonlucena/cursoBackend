const { query } = require("express");
const express = require("express");
const { products } = require("../../database/data");

const route = express.Router();

route.get("/", (req, res) => {
  let productResponse = [...products];
  return res.json(productResponse);
});

route.get("/:id", (req, res) => {
  //Desestructuramos el id del objeto req.params (parametros de busqueda)
  const { id } = req.params;
  //Buscamos el producto con el método find (devuelve true - primer objeto en coincidencia)
  const product = products.find((product) => product.id === +id);
  //Hacemos un condicional donde si es distinto al número del producto devuelva un objeto con el status 404
  if (!product) {
    return res.status(404).json({
      status: false,
      error: `Product with id: ${id} not found`,
    });
  }
  //Después de evaluar el condicional en false, retornamos el resultado con el objeto encontrado.
  return res.json({ status: "located", result: product });
});

route.post("/", (req, res) => {
  //Desestructuramos las variables de nuestro objeto products.
  const { title, price, thumbnail } = req.body;
  //Evaluamos mediante condicional si: title tipo número, si price existe y thumbnail existe.
  if (title === Number(title) || !title || !price || !thumbnail) {
    return res.status(404).json({
      status: false,
      error: `product does not comply with the required format`,
    });
  }
  //creamos la constante de nuestro nuevo producto y le asignamos un nuevo ID recorriendo nuestro objeto +1.
  const newProduct = {
    id: products.length + 1,
    title,
    price,
    thumbnail,
  };
  //Agregamos nuestro nuevo producto (newProduct) con el metodo push a nuestro objeto products.
  products.push(newProduct);
  //Le enviamos como respuesta el producto agregado.
  res.json({ status: "successfull", result: newProduct });
  //Verificamos nuestro array de objeto con el nuevo producto.
  //console.log(products);
});

route.put("/:id", (req, res) => {
  //Desestructuramos el id que recibimos por el objeto req.params.
  //Desestructuramos el body que seria el objeto.
  const {
    params: { id },
    body: { title, price, thumbnail },
  } = req;
  if (!title || title === Number(title) || !price || !thumbnail) {
    return res.status(404).json({
      status: false,
      error: `product does not comply with the required format`,
    });
  }
  //Buscamos el indice con el metodo findIndex, este nos retorna el numero del indice del id buscado o -1 si no coincide
  const productIndex = products.findIndex(
    (product) => product.id === Number(id)
  );
  //Evaluamos en caso que no coincida y retornamos un status: 404
  if (productIndex < 0) {
    return res.status(404).json({
      status: false,
      error: `Product with id: ${id} not found`,
    });
  }
  //Seleccionamos el nuevo producto por indice y lo editamos con los nuevos valores enviados por PUT
  const newProduct = {
    ...products[productIndex],
    title,
    price,
    thumbnail,
  };
  //Reemplazamos los valores por el nuevo producto.
  products[productIndex] = newProduct;
  return res.json({ success: true, result: newProduct });
});

route.delete("/:id", (req, res) => {
  const { id } = req.params;
  const deleteProduct = products.find((product) => product.id === +id);
  if (deleteProduct === undefined) {
    return res.status(404).json({
      status: false,
      error: `Product with id: ${id} not found`,
    });
  }
  const newListProduct = products.filter((product) => product != deleteProduct);
  console.log(deleteProduct);
  res.json({
    success: true,
    result: newListProduct,
  });
});

module.exports = route;
