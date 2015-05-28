
$(function(){
   /*
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		Mostra/Oculta a lista dos casos mais baixados no mês
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	*/
    var btnMonth = $( ".btnMonth" );

    function toggleListCases (ev) {
    	var a = $(this);
    	var b = a.next( ".listCases" );
    	b.toggle();
    	
    	// Troca ico "More - Less"
    	if( b.css( "display" ) == "block" ) {
    		a.find( "img" ).attr( "src", "assets/img/ui/icoLess.png" );
    	} else {
    		a.find( "img" ).attr( "src", "assets/img/ui/icoMore.png" );
    	}

    	ev.preventDefault();
    }
	$(btnMonth).on( "click", toggleListCases );

	
	/* 
		~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
			Criando o gráfico | barra
		~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	*/
	// dados do gráfico
	var data = {
		labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
		datasets: [
			{
				fillColor: "rgba(0,205,205,0.75)",
				strokeColor: "rgba(0,180,180,0.75)",
				highlightFill: "rgba(0,205,205,0.9)",
				highlightStroke: "rgba(0,180,180,0.75)",
				data: ["368","442","573","610","547","329","484","511","602","883","743","202",]
			}
		]
	};

	// chamando
	var ctx = $( "#myChart" ).get(0).getContext( "2d" );
	var myNewChart = new Chart(ctx).Bar(data, {
		responsive: true
	});

	// configurações
	Chart.defaults.global = {
		 scaleLineColor: "rgba(245,245,245,1)",
		 scaleLineWidth: 1,
		  scaleFontFamily: "'verdana', sans-serif",
		  tooltipFillColor: "rgba(0,0,0,0.75)",
		  tooltipFontFamily: "'verdana', sans-serif"
	}

	/* 
		~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
			Definindo os núremos da lista 'top 10'
		~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	*/
	function countList_E () {
		var count = 0;
		var $list = $( "#listE-topList li" );
		$.each( $list, function (index, value) {
			count ++;
			$(this).find( ".numbCase-topList" ).text( count );
		});
	}
	function countList_D () {
		var count = 5; // start in '6'
		var $list = $( "#listD-topList li" );
		$.each( $list, function (index, value) {
			count ++;
			$(this).find( ".numbCase-topList" ).text( count );
		});
	}
	countList_E();
	countList_D();

	/* 
		~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
			Somando total dos casos
		~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	*/
	function sumGeral () {
		var values = document.getElementsByClassName('valueCase-topList');
		var value = document.getElementById('value-sum');
		var count = 0;
		for(i=0;i<values.length;i++) {
			count += parseInt(values[i].innerText);
		};
		value.innerText = count;
	}
	sumGeral();

});

