var cards_all = document.querySelectorAll('.card_general')
var cards_lista = document.querySelectorAll('.card_lista')
var cards_espera = document.querySelectorAll(".card_espera")
var card_activa = document.querySelector(".card_activa")
var container_card_proceso = document.querySelector("#div_container_card_lista")
var container_card_espera_1 = document.querySelector('#container_card_espera_1')
var container_card_espera_2 = document.querySelector('#container_card_espera_2')
var containers_cards_lista = document.querySelectorAll('.container_card_lista')
var timeInf = 0;
cards_lista.forEach((card) => {
	card.addEventListener("click", () => {
		if(card.classList.contains("card_activa")){return;}
		if(card.classList.contains("card_lista")){
			card.querySelector(".almacen_1").appendChild(document.createElement("li"));
		}
		if (container_card_proceso.children.length > 0) {
			//Si hay un elemento en el area critica
			areaCriticaEnUso(card);
		} else {
			//No hay elementos en el area critica
			areaCriticaLibre(card);
		}
		actualizarVarCards();
	});
});
cards_espera.forEach((card) => {
	card.addEventListener("click", () => {
		if (container_card_proceso.children.length > 0) {
			//Si hay un elemento en el area critica
			areaCriticaEnUso(card);
		} else {
			//No hay elementos en el area critica
			areaCriticaLibre(card);
		}
		actualizarVarCards();
	});
});
function tiempoInf(){
    document.querySelectorAll(".temporizador").forEach(span => {
        span.innerHTML = '<i class="bi bi-infinity"></i>';
    });
};
function tiempoNormal(){
    document.querySelectorAll(".temporizador").forEach(span => {
        span.innerHTML = '5s';
    });
};
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
}
function areaCriticaLibre(card) {
	//Aqui va el codigo para cuando el area critica este libre
	card = arreglandoCardAActiva(card);
	if(timeInf == 0	&& card.classList.contains("card_activa")){
		iniciarTemporizadorActivo(card);
	}
	container_card_proceso.appendChild(card);
}
function arreglandoCardAActiva(card) {
	card.classList.add("card_activa");
	card.querySelector(".td_estado").innerHTML = "Comiendo";
	card.querySelector(".td_proceso").innerHTML = "Corriendo";
	img = card.querySelector("img");
	img.classList.remove("img_filosofo");
	img.classList.add("img_filosofo_activa");
	temporizador = card.querySelector(".temporizador");
	temporizador.classList.add("temporizador_activa");
	if (card.classList.contains("card_espera")) {
		card.classList.remove("card_espera");
		img.classList.remove("img_filosofo_espera");
	}
	if (card.classList.contains("card_lista")){
		card.classList.remove("card_lista");
	}
	return card;
}
function arreglandoCardALista(card) {
	card.querySelector(".td_estado").innerHTML = "Hambre";
	card.querySelector(".td_proceso").innerHTML = "Listo";
	card.querySelector(".almacen_1").innerHTML = "";
	card.querySelector(".almacen_2").innerHTML = "";
	img = card.querySelector("img");
	img.classList.add("img_filosofo");
	temporizador = card.querySelector(".temporizador");
	if(timeInf == 0){
		temporizador.innerHTML = "5s";
	}else{
		temporizador.innerHTML = '<i class="bi bi-infinity"></i>';
	}
	if (card.classList.contains("card_espera")) {
		card.classList.remove("card_espera");
		img.classList.remove("img_filosofo_espera");
		temporizador.classList.remove("temporizador_espera");
	}
	if (card.classList.contains("card_activa")) {
		card.classList.remove("card_activa");
		img.classList.remove("img_filosofo_activa");
		temporizador.classList.remove("temporizador_activa");
	}
	card.classList.add("card_lista");
	return card;
}
function arreglandoCardEspera(card){
	card.classList.add("card_espera");
	img = card.querySelector("img");
	card.querySelector(".td_estado").innerHTML = "Hambriento";
	card.querySelector(".td_proceso").innerHTML = "Esperando...";
	img.classList.add("img_filosofo_espera");
	temporizador= card.querySelector(".temporizador");
	temporizador.classList.add("temporizador_espera");
	if (card.classList.contains("card_activa")) {
		card.classList.remove("card_activa");
		img.classList.remove("img_filosofo_activa");
	}
	if (card.classList.contains("card_lista")) {
		card.classList.remove("card_lista");
		img.classList.remove("img_filosofo");
	}
	return card;
};
function cardRandom(cards) {
	let count = 0;
	const intervalId = setInterval(() => {
		const prevCard = cards[(count - 1 + cards.length) % cards.length];
		const currCard = cards[count % cards.length];
		prevCard.classList.remove("card_random");
		currCard.classList.add("card_random");
		count++;
		if (count >= cards.length * 3) {
			clearInterval(intervalId);
			currCard.classList.remove("card_random");
			cards[Math.floor(Math.random() * cards.length)].click();
			cards_lista.forEach((card) => card.click());
		}
	}, 400);
}
function actualizarVarCards() {
	cards_all = document.querySelectorAll(".card_general");
	cards_lista = document.querySelectorAll(".card_lista");
	cards_espera = document.querySelectorAll(".card_espera");
	card_activa = document.querySelector(".card_activa");
	container_card_proceso = document.querySelector("#div_container_card_lista");
	container_card_espera_1 = document.querySelector("#container_card_espera_1");
	container_card_espera_2 = document.querySelector("#container_card_espera_2");
	containers_cards_lista = document.querySelectorAll(".container_card_lista");
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
			finTemporizadorCardActiva(card);
		}
	}, 1000);
}
function iniciarTemporizadorEspera(card) {
	// Aquí va el código para iniciar el temporizador de la card activa
	let tiempoRestanteActiva = 5;
	const temporizadorActiva = card.querySelector(".temporizador_espera");
	if (timeInf == 0) {
		temporizadorActiva.innerHTML = tiempoRestanteActiva + "s";
	}
	
	const intervalo = setInterval(() => {
		tiempoRestanteActiva--;
		if (timeInf == 0) {
			temporizadorActiva.textContent = tiempoRestanteActiva + "s";
		}
		if(card.classList.contains("card_lista")){clearInterval(intervalo);}
		if (!card_activa && card.classList.contains("card_espera")) {
			//Si no hay card activa
			clearInterval(intervalo);
			card.click();
		}
		if (tiempoRestanteActiva === 0) {
			clearInterval(intervalo);
			// Código a ejecutar al finalizar el temporizador
			finTemporizadorCardEspera(card);
		}
	}, 1000);
}
function finTemporizadorCardActiva(card){
	//Aqui va el codigo para cuando el temporizador termine, para la card activa
	card = arreglandoCardALista(card);
	const cardNumber = card.id.slice(5);
	if(card.classList.contains("card_activa")){
		console.log("Despues de  arreglo de card card_activa");
		card.classList.remove("card_activa");
	}
	containers_cards_lista[cardNumber - 1].appendChild(card);
	actualizarVarCards();
}
function finTemporizadorCardEspera(card){
	//Aqui va el codigo para cuando el temporizador termine, para la card activa
	if (!(container_card_proceso.children.length > 0)) {
		//Si no hay card activa
		card.click();
	}else{
		let siguienteIndice = null;
		for (let i = 0; i < cards_espera.length; i++) {
			if (cards_espera[i].id === card.id) {
				siguienteIndice = i + 1;
				break;
			}
		}
		if (cards_espera[siguienteIndice]) {
			agregarProcesoCard(card,cards_espera[siguienteIndice]);
			finTemporizadorCardActiva(card);
			if (!(container_card_proceso.children.length > 0)) {
				//Si no hay card activa
				card.click();
			}
		}else{
			iniciarTemporizadorEspera(card);
		}
	}
	actualizarVarCards();
}
function agregarProcesoCard(card,cardSiguiente){
	//Aqui va el codigo para agregar el proceso a la card
	nuProcesosCard = parseInt(card.querySelector(".almacen_1").children.length+card.querySelector(".almacen_2").children.length);
	for(let i=0;i<nuProcesosCard;i++){
		cardSiguiente.querySelector(".almacen_1").children.length < 2
			?cardSiguiente.querySelector(".almacen_1").appendChild(document.createElement("li"))
			:cardSiguiente.querySelector(".almacen_2").appendChild(document.createElement("li"));
	}
	
	
}
document.querySelector("#vbtn-radio1").addEventListener("click", () => {
	//Aqui va el codigo para el boton de inicio de procesos
	cardRandom(cards_lista);
});
document.querySelector("#vbtn-radio2").addEventListener("click", () => {
	//Aqui va el codigo para el boton de pausa de procesos
});
document.querySelector("#vbtn-radio3").addEventListener("click", () => {
	//Aqui va el codigo para reiniciar el proceso
	window.location.reload();
});
document.querySelector("#vbtn-radio_p_1").addEventListener("click", () => {
	//Aqui va el codigo de tiempo infinito
	timeInf = 1;
	tiempoInf();
});
document.querySelector("#vbtn-radio_p_2").addEventListener("click", () => {
	//Aqui va el codigo de todos los filososfos al mismo tiempo a comer
});
document.querySelector("#vbtn-radio_p_3").addEventListener("click", () => {
	//Aqui va el codigo de tiempo normal
	timeInf = 0;
	tiempoNormal();
});