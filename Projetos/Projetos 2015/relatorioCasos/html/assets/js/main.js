
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
				fillColor: "rgba(0,205,205,0.75)",
				strokeColor: "rgba(0,180,180,0.75)",
				highlightFill: "rgba(0,205,205,0.9)",
				highlightStroke: "rgba(0,180,180,0.75)",
				data: ["134","254","552","476","488","402","300","520","633","655","0","0",]
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
	setTimeout(countList_E(), 200);
	setTimeout(countList_D(), 400);

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
		if(vOne.text(count) == NaN || vOne.text(count) == null || vOne.text(count) == undefined) {
			vOne.text(0);
		} else {
			vOne.text(count);
		}
	}
	setTimeout(sumGeral(), 500);

});

