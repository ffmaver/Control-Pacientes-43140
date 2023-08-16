const hoy = new Date();
const url = './pacientes.json';

//-------Clave de localstorage---------
const clave_pacientes = "listaPacientes";
let pacientes_json = JSON.parse(localStorage.getItem(clave_pacientes)) || []
//----------Asincronia y Fetch---------------
if (pacientes_json.length === 0 ) {
	document.addEventListener('DOMContentLoaded', () => {
	fetch( url )
	.then( respuesta => respuesta.json())
	.then( resultado => {
	const pacientes_json = resultado.pacientes; //me copio TODOS los que haya en el json
	localStorage.setItem(clave_pacientes, JSON.stringify(pacientes_json));
})  
})
}

//--------Funciones basicas----------
function mostrarElemento(elementoId) {
	const elemento = document.getElementById(elementoId);
	elemento.style.display = "block";
}
function ocultarElemento(elementoId) {
	const elemento = document.getElementById(elementoId);
	elemento.style.display = "none";
}
//--------Botones generales---------
document.getElementById("mostrar_btns").addEventListener("click", () => {
	ocultarElemento("mensaje_div");
	ocultarElemento("mostrar_btns");
	mostrarElemento("botones_iniciales");
	ocultarElemento("volver_btn");
});
document.getElementById("volver_menu_btn").addEventListener("click", () => {
	ocultarElemento("mensaje_div");
	mostrarElemento("botones_iniciales");
	ocultarElemento("formulario");
	ocultarElemento("volver_menu_btn");
	ocultarElemento("volver_btn");
});
document.getElementById("ingresar_btn").addEventListener("click", () => {
	mostrarElemento("login_formulario");
	ocultarElemento("registro_inicial");
	mostrarElemento("volver_btn");
});
document.getElementById("registrarme_btn").addEventListener("click", () => {
	mostrarElemento("registro_formulario");
	ocultarElemento("registro_inicial");
	mostrarElemento("volver_btn");
});

//-------Clave de localstorage---------
const clave_medico = "listaMedicos";
mostrarElemento("registro_inicial");

//--------Ingresar--------
const loginForm = document.querySelector("#login_form")
loginForm.addEventListener('submit', (e) => {
	e.preventDefault()
	let id = document.getElementById("id_login").value;
	let pass = document.getElementById("password_login").value;
	const users = JSON.parse(localStorage.getItem(clave_medico)) || []
	const valid_user = users.find(user => user.id === id && user.pass === pass)
	if (!valid_user) {
		ocultarElemento("login_formulario");
		mostrarElemento("registro_inicial");
		ocultarElemento("volver_btn");
		return Swal.fire('Usuario o contraseña incorrectos');
	}
	else {
		Swal.fire('Bienvenido')
		//mostrarMensaje(`Bienvenido ${valid_user.nombre}`);
		ocultarElemento("login_formulario");
		mostrarElemento("mostrar_btns");
	}
	//localStorage.setItem(clave_medico, JSON.stringify(valid_user));

})
document.getElementById("volver_btn").addEventListener("click", () => {
	ocultarElemento("mensaje_div");
	mostrarElemento("registro_inicial");
	ocultarElemento("volver_btn");
	ocultarElemento("formulario");
	ocultarElemento("login_formulario");
	ocultarElemento("registro_formulario");
	ocultarElemento("mostrar_btns");


});


//--------Registrarse-----
const signup_form_medico = document.querySelector("#registro_form");
signup_form_medico.addEventListener('submit', (e) => {
	e.preventDefault();
	let nombre = document.getElementById("nombre_registro").value.trim().toUpperCase();
	let apellido = document.getElementById("apellido_registro").value.trim().toUpperCase();
	let id = document.getElementById("username_registro").value.trim();
	let pass = document.getElementById("password_registro").value.trim();
	let mensaje = checkear_datos(nombre, apellido, pass);
	const medico = JSON.parse(localStorage.getItem(clave_medico)) || [];
	const es_usuario_registrado = medico.find(medico => medico.id === id);
	if (es_usuario_registrado) { // si ya existe
		ocultarElemento("registro_formulario");
		mostrarElemento("registro_inicial");
		ocultarElemento("volver_btn");
		return Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Ya existe un usuario con ese ID',
		});
	} else { //sino chequeo que este ok la info
		if (mensaje != "") { //si el mensaje contiene algo lo muestro
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: mensaje,
			});
			mostrarElemento("volver_btn");
			ocultarElemento("registro_formulario");
		} else {
			mostrarElemento("mostrar_btns");
			ocultarElemento("registro_formulario");
			medico.push({ nombre: nombre, apellido: apellido, id: id, pass: pass }); //le pusheo el obejto
			localStorage.setItem(clave_medico, JSON.stringify(medico));
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: 'Se registro con exito!',
				showConfirmButton: false,
				timer: 1500
			})
		}
	}

})
function checkear_datos(nombre, apellido, pass) {
	let msj = "";
	if (/\d/.test(nombre)) {
		msj += "Debe ingresar un nombre valido.\n ";
	}
	if (/\d/.test(apellido)) {
		msj += "Debe ingresar un apellido valido.\n";
	}
	if (pass.length < 8) {
		msj += "La contraseña debe tener mas de 8 caracteres.\n";
	}
	return msj;
}

//-----------Menu----------

document.addEventListener("DOMContentLoaded", () => {
	lista_pacientes = JSON.parse(localStorage.getItem(clave_pacientes)) || [];

})
//----------Registro de paciente----------
const agregar_paciente = document.getElementById("agregar_btn");
agregar_paciente.addEventListener("click", () => {
	ocultarElemento("botones_iniciales");
	mostrarElemento("formulario"); //muestro el form
	mostrarElemento("volver_menu_btn");
});
const signup_form_paciente = document.querySelector("#ingreso_paciente_form");
signup_form_paciente.addEventListener('submit', (e) => {
	e.preventDefault();
	let nombre = document.getElementById("nombre").value.trim().toUpperCase();
	let apellido = document.getElementById("apellido").value.trim().toUpperCase();
	let dni = document.getElementById("dni").value.trim();
	let fecha_nac = document.getElementById("anio").value.trim();
	let telefono = document.getElementById("telefono").value.trim();
	let sexo = document.getElementById("sexo").value;
	let tos = document.getElementById("tos").value;
	let mocos = document.getElementById("mocos").value;
	let fiebre = document.getElementById("fiebre").value;
	let garganta = document.getElementById("garganta").value;
	let cabeza = document.getElementById("cabeza").value;
	let gusto = document.getElementById("gusto").value;
	let olfato = document.getElementById("olfato").value;
	let estrecho = document.getElementById("estrecho").value;
	let resultado = document.getElementById("resultado").value;
	let mensaje = checkear_datos_paciente(nombre, apellido, fecha_nac);
	const paciente = JSON.parse(localStorage.getItem(clave_pacientes)) || [];
	const es_paciente_registrado = paciente.find(paciente => paciente.dni === dni);
	if (es_paciente_registrado) { //si es un paciente ya registrado
		ocultarElemento("formulario");
		mostrarElemento("volver_menu_btn");
		return Swal.fire({
			icon: 'error',
			title: 'Este paciente ya esta ingresado.',
			text: 'Intente nuevamente.',
		});
	} else {
		if (mensaje != "") { //si el mensaje contiene algo lo muestro
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: mensaje,
			});
			mostrarElemento("volver_menu_btn");
			ocultarElemento("formulario");
		} else {
			mostrarElemento("volver_btn");
			ocultarElemento("formulario");
			paciente.push({ //pusheo a mi nuevo paciente
				nombre: nombre, apellido: apellido, dni: dni, fecha_nac: hoy.getFullYear() - fecha_nac, telefono: telefono, sexo: sexo, tos: tos, mocos: mocos,
				fiebre: fiebre, garganta: garganta, cabeza: cabeza, gusto: gusto, olfato: olfato, estrecho: estrecho, resultado: resultado
			}); //lo pusheo con su edad
			localStorage.setItem(clave_pacientes, JSON.stringify(paciente));
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: 'Paciente registrado!',
				showConfirmButton: false,
				timer: 1500
			});
		}
	}

})
//----------Funciones para el registro-------
function checkear_datos_paciente(nombre, apellido, fecha_nac) {
	let msj = "";
	if (/\d/.test(nombre)) {
		msj += "Debe ingresar un nombre valido.\n ";
	}
	if (/\d/.test(apellido)) {
		msj += "Debe ingresar un apellido valido.\n";
	}
	if (isNaN(fecha_nac) || fecha_nac > hoy.getFullYear || fecha_nac.length != 4)
		msj += "\nDebe ingresar un año de nacimiento valido (menor que el año actual y con 4 digitos)";
	return msj;
}

//-------Mostrar pacientes-------
document.getElementById("mostrar_btn").addEventListener("click", () => {
	ocultarElemento("botones_iniciales");
	mostrarElemento("botones_pacientes");
	mostrarElemento("atras_btn");
});
document.getElementById("atras_btn").addEventListener("click", () => {
	ocultarElemento("pacientes");
	ocultarElemento("atras_btn");
	ocultarElemento("botones_pacientes");
	mostrarElemento("botones_iniciales");
});
document.getElementById("a_z_btn").addEventListener("click", () => {
	ocultarElemento("botones_pacientes");
	imprimir_pacientes_az();
});
function imprimir_pacientes_az() {
	const pacientesArray = JSON.parse(localStorage.getItem(clave_pacientes)) || [];
	const pacientesDiv = document.getElementById("pacientes");
	pacientesDiv.innerHTML = "";
	pacientesDiv.innerHTML = '<h2> LOS PACIENTES ORDENADOS ALFABETICAMENTE POR NOMBRE:</h2><br><br>';
	if (pacientesArray.length === 0) {
		pacientesDiv.textContent = "No hay pacientes registrados.";
		return;
	}
	//ordenar pacientes por nombre antes de mostrarlos
	pacientesArray.sort((a, b) => (a.nombre + " " + a.apellido).localeCompare(b.nombre + " " + b.apellido));
	for (const paciente of pacientesArray) {
		const pacienteDiv = document.createElement("div");
		pacienteDiv.classList.add("paciente-item");
		pacienteDiv.innerHTML = `
            <h3>${paciente.nombre} ${paciente.apellido}</h3>
            <p>DNI: ${paciente.dni}</p>
            <p>Edad: ${paciente.fecha_nac}</p>
            <p>Sexo: ${paciente.sexo}</p>
            <h4>Resultado del test: ${paciente.resultado}</h4>
            <p>-------------------------------------------</p>
            <br>
        `;
		pacientesDiv.appendChild(pacienteDiv);
	}
	mostrarElemento("pacientes");
	mostrarElemento("atras_btn");
}
document.getElementById("z_a_btn").addEventListener("click", () => {
	ocultarElemento("botones_pacientes");
	imprimir_pacientes_za();
});
function imprimir_pacientes_za() {
	const pacientesArray = JSON.parse(localStorage.getItem(clave_pacientes)) || [];
	const pacientesDiv = document.getElementById("pacientes");
	pacientesDiv.innerHTML = "";
	pacientesDiv.innerHTML = '<h2> LOS PACIENTES ORDENADOS ALFABETICAMENTE DE LA "Z" A LA "A":</h2><br><br>';
	if (pacientesArray.length === 0) {
		pacientesDiv.textContent = "No hay pacientes registrados.";
		return;
	}
	//ordenar pacientes de la Z a la A
	pacientesArray.sort((a, b) => (b.nombre + " " + b.apellido).localeCompare(a.nombre + " " + a.apellido));
	for (const paciente of pacientesArray) {
		const pacienteDiv = document.createElement("div");
		pacienteDiv.classList.add("paciente-item");
		pacienteDiv.innerHTML = `
            <h3>${paciente.nombre} ${paciente.apellido}</h3>
            <p>DNI: ${paciente.dni}</p>
            <p>Edad: ${paciente.fecha_nac}</p>
            <p>Sexo: ${paciente.sexo}</p>
            <h4>Resultado del test: ${paciente.resultado}</h4>
            <p>-------------------------------------------</p>
            <br>
        `;
		pacientesDiv.appendChild(pacienteDiv);
	}
	mostrarElemento("pacientes");
	mostrarElemento("atras_btn");

}
document.getElementById("positivos").addEventListener("click", () => {
	ocultarElemento("botones_pacientes");
	imprimir_pacientes_positivos();
});
function imprimir_pacientes_positivos() {
	const pacientesArray = JSON.parse(localStorage.getItem(clave_pacientes)) || [];
	const pacientesDiv = document.getElementById("pacientes");
	pacientesDiv.innerHTML = "";
	pacientesDiv.innerHTML = '<h2> PACIENTES CON RESULTADO POSITIVO EN ORDEN DE LLEGADA:</h2><br><br>';

	if (pacientesArray.length === 0) {
		pacientesDiv.textContent = "No hay pacientes registrados.";
		return;
	}

	const pacientesPositivos = pacientesArray.filter(paciente => paciente.resultado === "POSITIVO");

	for (const paciente of pacientesPositivos) {
		const pacienteDiv = document.createElement("div");
		pacienteDiv.classList.add("paciente-item");
		pacienteDiv.innerHTML = `
					<h3>${paciente.nombre} ${paciente.apellido}</h3>
					<p>DNI: ${paciente.dni}</p>
					<p>Edad: ${paciente.fecha_nac}</p>
					<p>Sexo: ${paciente.sexo}</p>
					<h4>Resultado del test: ${paciente.resultado}</h4>
					<p>-------------------------------------------</p>
					<br>
			`;
		pacientesDiv.appendChild(pacienteDiv);
	}
	mostrarElemento("pacientes");
	mostrarElemento("atras_btn");
}
document.getElementById("negativos").addEventListener("click", () => {
	ocultarElemento("botones_pacientes");
	imprimir_pacientes_negativos();
});
function imprimir_pacientes_negativos() {
	const pacientesArray = JSON.parse(localStorage.getItem(clave_pacientes)) || [];
	const pacientesDiv = document.getElementById("pacientes");
	pacientesDiv.innerHTML = "";
	pacientesDiv.innerHTML = '<h2> PACIENTES CON RESULTADO POSITIVO EN ORDEN DE LLEGADA:</h2><br><br>';

	if (pacientesArray.length === 0) {
		pacientesDiv.textContent = "No hay pacientes registrados.";
		return;
	}

	const pacientesPositivos = pacientesArray.filter(paciente => paciente.resultado === "NEGATIVO");

	for (const paciente of pacientesPositivos) {
		const pacienteDiv = document.createElement("div");
		pacienteDiv.classList.add("paciente-item");
		pacienteDiv.innerHTML = `
					<h3>${paciente.nombre} ${paciente.apellido}</h3>
					<p>DNI: ${paciente.dni}</p>
					<p>Edad: ${paciente.fecha_nac}</p>
					<p>Sexo: ${paciente.sexo}</p>
					<h4>Resultado del test: ${paciente.resultado}</h4>
					<p>-------------------------------------------</p>
					<br>
			`;
		pacientesDiv.appendChild(pacienteDiv);
	}
	mostrarElemento("pacientes");
	mostrarElemento("atras_btn");
}

//-----------Estadisticas------------
document.getElementById("estadistica_btn").addEventListener("click", () => {
	ocultarElemento("botones_iniciales");
	mostrarElemento("atras_btn");
	estadisticas_pacientes();
});
function estadisticas_pacientes() {
	const pacientesArray = JSON.parse(localStorage.getItem(clave_pacientes)) || [];
	const pacientesDiv = document.getElementById("pacientes");
	pacientesDiv.innerHTML = "";

	if (pacientesArray.length === 0) {
		pacientesDiv.textContent = "No hay pacientes registrados.";
		return;
	}
	let resultados_positivos = 0,
		resultados_negativos = 0,
		femenino = 0,
		masculino = 0,
		no_bin = 0;

	for (const paciente of pacientesArray) {
		if (paciente.resultado === "POSITIVO")
			resultados_positivos++;
		else if (paciente.resultado === "NEGATIVO")
			resultados_negativos++;
		if (paciente.sexo === "F")
			femenino++;
		if (paciente.sexo === "M")
			masculino++;
		if (paciente.sexo === "X")
			no_bin++;
	}
	const porcentaje_positivos = (resultados_positivos / pacientesArray.length) * 100;
	const porcentaje_negativos = (resultados_negativos / pacientesArray.length) * 100;
	const porcentaje_mujeres = (femenino / pacientesArray.length) * 100;
	const porcentaje_hombres = (masculino / pacientesArray.length) * 100;
	const porcentaje_nobin = (no_bin / pacientesArray.length) * 100;

	pacientesDiv.innerHTML += `
	<h1>ESTADISTICAS</h1><br><br>
	<h3>Porcentaje de resultados positivos: ${porcentaje_positivos.toFixed(2)}%</h3><br>
	<h3>Porcentaje de resultados negativos: ${porcentaje_negativos.toFixed(2)}%</h3><br>
	<p>----------------------------------------------------------</p>
	<h3>Porcentaje de mujeres: ${porcentaje_mujeres.toFixed(2)}%</h3><br>
	<h3>Porcentaje de hombres: ${porcentaje_hombres.toFixed(2)}%</h3><br>
	<h3>Porcentaje de personas no binarias: ${porcentaje_nobin.toFixed(2)}%</h3><br>
	`;
	mostrarElemento("pacientes");
	mostrarElemento("atras_btn");
}
//---------Salir---------
document.getElementById("salir").addEventListener("click", () => {
	mostrarElemento("registro_inicial");
	ocultarElemento("botones_iniciales");
});