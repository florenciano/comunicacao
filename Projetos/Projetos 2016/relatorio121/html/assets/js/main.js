$(function(){
	
	"use strict";

	console.log(true);

	// // // // // // // // // // // // // // // // // // // // // // //
	// PAGE: Resultados - Persona - Dedicação Exclusiva
	// // // // // // // // // // // // // // // // // // // // // // //
    $.fn.extend({
        toggleText: function(a, b){
            return this.text(this.text() == b ? a : b);
        }
    });

    var showText = "Ocultar a entrevista de ",
        hideText = "Veja a entrevista de ";

	// Ver Entrevista do persona Rick
    var verEntrevistaRick = $("#btn-enterview-rick"),
    	conteudoEntrevistaRick = $("#personas-enterview-rick");

    verEntrevistaRick.on("click", function(){
        conteudoEntrevistaRick.fadeToggle(400, function() {
            verEntrevistaRick.toggleText(showText + "Rick", hideText + "Rick");
        });
    });

    // Ver Entrevista do persona Barbara
    var verEntrevistaBarbara = $("#btn-enterview-barbara"),
    	conteudoEntrevistaBarbara = $("#personas-enterview-barbara");

    verEntrevistaBarbara.on("click", function(){
        conteudoEntrevistaBarbara.fadeToggle(400, function() {
            verEntrevistaBarbara.toggleText(showText + "Barbara", hideText + "Barbara");
        });
    });

    // Ver Entrevista do persona John
    var verEntrevistaJohn = $("#btn-enterview-john"),
    	conteudoEntrevistaJohn = $("#personas-enterview-john");

    verEntrevistaJohn.on("click", function(){
        conteudoEntrevistaJohn.fadeToggle(400, function() {
            verEntrevistaJohn.toggleText(showText + "John", hideText + "John");
        });
    });

});
