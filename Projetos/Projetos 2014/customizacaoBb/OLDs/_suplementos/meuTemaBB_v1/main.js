(function() {
	/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		Mostrar e ocular a lista por assunto
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	var elements = document.querySelectorAll(".arrowLeft, .arrowDown");
	for(i = 0; i < elements.length; i++) {
		elements[i].addEventListener("click", function(e) {
			e.preventDefault();
			var showHideDiv = this.parentNode.nextElementSibling;
			
			if(this.className == "arrowLeft") {
				this.className = "arrowDown";
				showHideDiv.style.display="block";
			} else {
				this.className = "arrowLeft";
				showHideDiv.style.display="none";
			}
			
		});	
	}	

	/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		contagem de itens por lista
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	var displayTotal = document.querySelectorAll(".total");

	function calculo(listaAtual,numbItem) {
		listaAtual.innerText = "(" + numbItem + ")";
	}

	for(e = 0; e < displayTotal.length; e++) {
		calculo(displayTotal[e], displayTotal[e].parentNode.parentNode.nextElementSibling
			.getElementsByTagName("li").length);
	}

	/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		Expandir/Recolher todas as listas mudando as setas
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	var status = document.getElementById("expandRecol");
	var todasListas = document.querySelectorAll(".topicos");
	// definindo a legenda do status
	var recolhe = "Recolher tudo";
	var expande = "Expandir tudo";

	function separaLista(display) {
		for(i = 0; i < todasListas.length; i++) {
			var cadaLista = todasListas[i];
			cadaLista.style.display=display;
		}
		return cadaLista;
	}
	
	function mudarSetas() {
		for(i = 0; i < elements.length; i++) {
			if(status.textContent == recolhe) {
				elements[i].className="arrowDown";
			} else {
				elements[i].className="arrowLeft";
			}
		}
	}

	status.addEventListener("click", function(e) {
		e.preventDefault();
		if(status.textContent == expande) {
			status.textContent = recolhe;
			separaLista("block"); //passa como parâmetro o status da visualização desejada
			mudarSetas();
		} else {
			status.textContent = expande;
			separaLista("none");
			mudarSetas();
		}
	});

})();

