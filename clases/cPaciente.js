class Paciente {
	constructor(nombre, apellido, dni, nacimiento, sexo, tos, mocos, fiebre, garganta, cabeza, gusto, olfato, estrecho, resultado) {
		this.nombre = nombre;
		this.apellido = apellido;
		this.dni = dni;
		this.nacimiento = nacimiento;
		this.sexo = sexo;
		this.tos = tos;
		this.mocos = mocos;
		this.fiebre = fiebre;
		this.garganta = garganta;
		this.cabeza = cabeza;
		this.gusto = gusto;
		this.olfato = olfato;
		this.estrecho = estrecho;
		this.resultado = resultado;
	}
	get_resultado() {
		return this.resultado;
	}
	get_sexo() {
		return this.sexo;
	}
	get_edad() {
		const hoy = new Date();
		return (hoy.getFullYear() - this.nacimiento);
	}
	get_datos() {
		return ("<br> <br> Nombre y apellido: " + this.nombre + " " + this.apellido + ". <br> DNI: " + this.dni + ". <br> Edad: "+ this.get_edad()+ ". <br> Sexo: " + this.sexo);
	}
}