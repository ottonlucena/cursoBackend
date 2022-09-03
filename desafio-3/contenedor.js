const fs = require("fs");

class Contenedor {
  constructor(contents) {
    this.contents = contents;
  }

  async object() {
    let promise = await fs.promises.readFile(`${this.contents}`, "utf-8");
    let promiseParse = JSON.parse(promise);
    return promiseParse;
  }

  async save(info) {
    let objeto = await this.object();
    let newId = objeto[objeto.length - 1].id + 1;
    info.id = newId;
    objeto.push(info);
    try {
      await fs.promises.writeFile(`${this.contents}`, JSON.stringify(objeto));
      return `ID del producto asignado: ${info.id}`;
    } catch (err) {
      console.log(`El error es: ${err}`);
    }
  }

  async getById(number) {
    const objeto = await this.object();
    try {
      const id = objeto.filter((el) => el.id === number);
      if (id.length) {
        console.log(id);
        return id;
      } else {
        console.log(`El ID '${number}' no existe`);
        return null;
      }
    } catch (err) {
      console.log("error" + err);
    }
  }

  async getAll() {
    const objeto = await this.object();
    try {
      return objeto;
    } catch (err) {
      console.log("Error:" + err);
    }
  }

  async deleteById(number) {
    const objeto = await this.object();
    const newObjeto = objeto.filter((el) => el.id != number);
    try {
      console.log(newObjeto);
    } catch (err) {
      console.log(err);
    }
  }

  async deleteAll() {
    const objeto = await this.object();
    const objetoBorrado = (objeto.length = []);
    try {
      console.log(objetoBorrado);
    } catch (err) {
      console.log(err);
    }
  }
}

const container = new Contenedor("productos.json");

//Informacion del nuevo objeto.
let newInfo = {
  id: 1,
  title: "Patilla",
  price: 25.48,
  thumbnail:
    "https://casadelcampofruteria.com/wp-content/uploads/2020/02/PATILLA.jpg",
};

//Metodo save: Recibe un objeto con la informacion por parametros y devuelve el ID asignado a ese objeto.
/* container.save(newInfo).then((res) => console.log(res)); */

//Metodo getById: Recibe por parametro el ID a buscar y devuelve un objeto.
//container.getById(6);

//Metodo getAll, devuelve el objeto completo.
/* container.getAll().then((res) => console.log(res)); */

//Metodo deleteById, recibe por parametro el ID del objeto a eliminar dentro del array.
/* container.deleteById(2); */

//Metodo deleteAll, elimina todos los objetos.
/* container.deleteAll(); */

module.exports.Contenedor = Contenedor;
