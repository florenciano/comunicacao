
$(function(){
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
				fillColor: "rgba(235,175,20,0.75)",
				strokeColor: "rgba(205,145,5,0.75)",
				highlightFill: "rgba(235,175,20,0.9)",
				highlightStroke: "rgba(205,145,5,0.75)",
				data: ["368","442","573","610","547","329","484","511","602","883","743","202",]
			}
		]
	};

	// chamando o gráfico
	var ctx = $( "#myChart" ).get(0).getContext( "2d" );
	var myNewChart = new Chart(ctx).Bar(data, {
		responsive: true
	});

	// configurações do gráfico
	Chart.defaults.global = {
		 scaleLineColor: "rgba(245,245,245,1)",
		 scaleLineWidth: 1,
		  scaleFontFamily: "'verdana', sans-serif",
		  tooltipFillColor: "rgba(0,0,0,0.75)",
		  tooltipFontFamily: "'verdana', sans-serif",
		  animationSteps: 100
	}

   /*
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		Mostra/Oculta a lista dos casos mais baixados no mês
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	*/
    var btnMonth = $( ".btnMonth" );

    function toggleListCases (ev) {
    	var a = $(this);
    	a.toggleClass( "activeMonth" );
    	ev.preventDefault();

    	var b = a.next( ".listCases" );
    	b.slideToggle( 400 );
    	if(a.hasClass( "activeMonth" )) {
    		$(this).find( "img" ).css({
    			"-webkit-transform": "rotate(180deg)",
				"-ms-transform": "rotate(180deg)",
    			"-0-transform": "rotate(180deg)",
    			transform: "rotate(180deg)"
    		});
    	}
    	if(!a.hasClass( "activeMonth" )) {
    		$(this).find( "img" ).css({
    			"-webkit-transform": "rotate(0deg)",
    			"-ms-transform": "rotate(0deg)",
    			"-0-transform": "rotate(0deg)",
    			transform: "rotate(0deg)"
    		});
    	}
    	
    }
	$(btnMonth).on( "click", toggleListCases );

	/* 
		~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
			Ocultando ícone do mês qdo não tiver caso listado
		~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	*/
	function ocultaMes() {
		var listCases = $( ".list-in-listCases" );
		listCases.each( function(key, value) {
			var a = $(this).children( "li" );
			if(a.length == 0 || a.length == undefined || a.length == null) {
				$(this).parents( "li.c3" ).hide();
			}
		});
	}
	ocultaMes();

	/* 
		~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
			Criando a numeração da lista 'top 10'
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
			Somando o total dos casos dos 'top 10'
		~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	*/
	function sumGeral() {
		var vTotal = $( ".valueCase-topList" ), vOne = $( "#value-sum" ), count = 0;
		vTotal.each( function(key, value) {
			count += parseInt($(this).text());
		});
		vOne.text(count);
	}
	sumGeral();

});

