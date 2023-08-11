class Medico {

	constructor(nombre, apellido, id, pass) {
		this.nombre = nombre;
		this.apellido = apellido;
		this.id=id; //simula el codigo de medico
		this.pass= pass;
	}

	getDatos() {
		return this.nombre + " " + this.apellido;
	}
}