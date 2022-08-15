class Datos {
  constructor(name, lastname, books, pets) {
    this.nombre = String(name);
    this.apellido = String(lastname);
    this.libros = [books];
    this.mascotas = [...pets];
  }

  getFullName() {
    return `Su nombre es: ${this.nombre} ${this.apellido}.`.toUpperCase();
  }

  addMascota(pets) {
    this.mascotas.push(pets);
  }

  countMascotas() {
    return `Tu cantidad de mascostas es: ${this.mascotas.length}`;
  }

  addBooks(nombre, autor) {
    this.libros.push({ nombre, autor });
  }

  getBookNames() {
    return `Los nombres de libros son: ${this.libros.map((el) => el.nombre)} `;
  }
}

/* DEFINIMOS EL OPERADOR NEW CON SUS DATOS. */
const usuario = new Datos(
  "otton",
  "lucena",
  { nombre: "Eloquent JavaScript", autor: "Marijn Haverbeke" },
  ["pato", "gato"]
);

/* AREGAMOS MASCOTAS. */
usuario.addMascota("perro");

/* AGREGAMOS NOMBRE DE LIBRO Y NOMBRE DE AUTOR. */
usuario.addBooks(" JavaScript: The Good Parts ", " Douglas Crockford");

/* LLAMADA DE LOS METODOS POR CONSOLA */
console.log(usuario.countMascotas());
console.log(usuario.getBookNames());
console.log(usuario.getFullName());
console.log(usuario);
