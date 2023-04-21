const cards_all = document.querySelectorAll('.card_general');
var cards_lista = document.querySelectorAll('.card_lista')
var cards_espera = document.querySelectorAll(".card_espera");
var card_activa = document.querySelector(".card_activa");
var container_card_proceso = document.querySelector(
	"#div_container_card_lista"
);
var container_card_espera_1 = document.querySelector('#container_card_espera_1')
var container_card_espera_2 = document.querySelector('#container_card_espera_2')
function tiempoNormal(duracion){
	const temporizador = document.getElementById("temporizador");
	const tiempoInicio = Date.now();
	const intervaloTemporizador = setInterval(() => {
		const tiempoActual = Date.now();
		const tiempoRestante = duracion * 1000 - (tiempoActual - tiempoInicio);
		if (tiempoRestante <= 0) {
			clearInterval(intervaloTemporizador);
			temporizador.textContent = "Tiempo expirado";
		} else {
			temporizador.textContent = `${Math.floor(
				tiempoRestante / 1000
			)} segundos`;
		}
	}, 1000);
};
function tiempoInf(){
    document.querySelectorAll(".temporizador").forEach(span => {
        span.innerHTML = '<i class="bi bi-infinity"></i>';
    });
};
document.querySelector('#vbtn-radio1').addEventListener('click',()=>{
	//Aqui va el codigo para el boton de inicio de procesos
});
document.querySelector('#vbtn-radio2').addEventListener('click',()=>{
	//Aqui va el codigo para el boton de pausa de procesos
});
document.querySelector('#vbtn-radio3').addEventListener('click',()=>{
	//Aqui va el codigo para reiniciar el proceso
});
document.querySelector('#vbtn-radio_p_1').addEventListener('click',()=>{
	//Aqui va el codigo de tiempo infinito
});
document.querySelector('#vbtn-radio_p_2').addEventListener('click',()=>{
	//Aqui va el codigo de todos los filososfos al mismo tiempo a comer
});
document.querySelector('#vbtn-radio_p_3').addEventListener('click',()=>{
	//Aqui va el codigo de tiempo normal
});
cards_lista.forEach((card) => {
	card.addEventListener("click", () => {
		cards_lista.forEach((card) => card.classList.remove("card_activa"));
		card.classList.add("card_activa");
		if (container_card_proceso.children.length > 0) {
			//Si hay un elemento en el area critica
			areaCriticaEnUso(card);
		} else {
			//No hay elementos en el area critica
			areaCriticaLibre(card);
		}
	});
});
function areaCriticaEnUso(card) {
	//Aqui va el codigo para cuando el area critica este en uso
	card = arreglandoCardEspera(card);
	iniciarTemporizadorEspera(card);
	if (container_card_espera_1.children.length < 3) {
		//Card se agrega al lista de espera
		container_card_espera_1.appendChild(card);
	} else {
		//Card se agrega al lista de espera
		container_card_espera_2.appendChild(card);
	}
	console.log(container_card_espera_1.children.length);
}
function areaCriticaLibre(card) {
	//Aqui va el codigo para cuando el area critica este libre
	card = arreglandoCardActiva(card);
	iniciarTemporizadorActivo(card);
	container_card_proceso.appendChild(card);
}
function arreglandoCardActiva(card) {
	card.classList.add("card_activa");
	img = card.querySelector("img");
	temporizador = card.querySelector(".temporizador");
	temporizador.classList.add("temporizador_activa");
	if (card.classList.contains("card_espera")) {
		card.classList.remove("card_espera");
		img.classList.remove("img_filosofo_espera");
		img.classList.add("img_filosofo_activa");
	}
	if (card.classList.contains("card_lista")) {
		card.classList.remove("card_lista");
		img.classList.remove("img_filosofo");
		img.classList.add("img_filosofo_activa");
	}
	return card;
}
function iniciarTemporizadorActivo(card) {
	// Aquí va el código para iniciar el temporizador de la card activa
	let tiempoRestanteActiva = 5;
	const temporizadorActiva = card.querySelector(".temporizador_activa");
	temporizadorActiva.innerHTML = tiempoRestanteActiva + "s";
	const intervalo = setInterval(() => {
		tiempoRestanteActiva--;
		temporizadorActiva.textContent = tiempoRestanteActiva + "s";

		if (tiempoRestanteActiva === 0) {
			clearInterval(intervalo);
			// Código a ejecutar al finalizar el temporizador
		}
	}, 1000);
}
function arreglandoCardEspera(card){
	card.classList.add("card_espera");
	img = card.querySelector("img");
	temporizador= card.querySelector(".temporizador");
	temporizador.classList.add("temporizador_espera");
	if (card.classList.contains("card_activa")) {
		card.classList.remove("card_activa");
		img.classList.remove("img_filosofo_activa");
		img.classList.add("img_filosofo_espera");
	}
	if (card.classList.contains("card_lista")) {
		card.classList.remove("card_lista");
		img.classList.remove("img_filosofo");
		img.classList.add("img_filosofo_espera");
	}
	return card;
};
function iniciarTemporizadorEspera(card) {
	// Aquí va el código para iniciar el temporizador de la card activa
	let tiempoRestanteActiva = 5;
	const temporizadorActiva = card.querySelector(".temporizador_espera");
	temporizadorActiva.innerHTML = tiempoRestanteActiva + "s";
	const intervalo = setInterval(() => {
		tiempoRestanteActiva--;
		temporizadorActiva.textContent = tiempoRestanteActiva + "s";

		if (tiempoRestanteActiva === 0) {
			clearInterval(intervalo);
			// Código a ejecutar al finalizar el temporizador
		}
	}, 1000);
}