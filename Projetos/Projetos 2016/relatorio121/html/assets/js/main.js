$(function(){
	
	"use strict";

	console.log(true);

	// // // // // // // // // // // // // // // // // // // // // // //
	// PAGE: Resultados - Persona - Dedicação Exclusiva
	// // // // // // // // // // // // // // // // // // // // // // //

	// Ver Entrevista do persona Rick
    var verEntrevistaRick = $("#btn-enterview-rick"),
    	conteudoEntrevistaRick = $("#personas-enterview-rick");

    verEntrevistaRick.on("click", function(){
        conteudoEntrevistaRick.fadeToggle("slow");
    });

    // Ver Entrevista do persona Barbara
    var verEntrevistaBarbara = $("#btn-enterview-barbara"),
    	conteudoEntrevistaBarbara = $("#personas-enterview-barbara");

    verEntrevistaBarbara.on("click", function(){
        conteudoEntrevistaBarbara.fadeToggle("slow");
    });

    // Ver Entrevista do persona John
    var verEntrevistaJohn = $("#btn-enterview-john"),
    	conteudoEntrevistaJohn = $("#personas-enterview-john");

    verEntrevistaJohn.on("click", function(){
        conteudoEntrevistaJohn.fadeToggle("slow");
    });

});
