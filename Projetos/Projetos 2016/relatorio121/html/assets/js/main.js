$(function(){
	
	"use strict";

	// // // // // // // // // // // // // // // // // // // // // // //
	// PAGE: Resultados - Persona - Dedicação Exclusiva
    //       Resultados - Persona - Tempo Parcial
    // Mostrar e ocultar a seção da entrevista dos personas
	// // // // // // // // // // // // // // // // // // // // // // //

    function showHide (idBtn, idEl, Name) {
        // prototype objeto global
        $.fn.extend({
            toggleText: function(a, b){
                return this.text(this.text() == b ? a : b);
            }
        });

        // textos que vão ser aplicados no botão
        var showText = "Ocultar a entrevista de ",
            hideText = "Veja a entrevista de ";

        // toggle conteúdo da entrevista
        idBtn.on("click", function(){
            idEl.fadeToggle(400, function(){
                idBtn.toggleText(showText + Name, hideText + Name);
                readingPosition();
            });
        });
    }

    /* Professores de Dedicação Exclusiva */
    // Rick 
    var verEntrevistaRick = $("#btn-enterview-rick"), conteudoEntrevistaRick = $("#personas-enterview-rick");
    showHide(verEntrevistaRick, conteudoEntrevistaRick, "Rick");
    // Alberto 
    var verEntrevistaAlberto = $("#btn-enterview-alberto"), conteudoEntrevistaAlberto = $("#personas-enterview-alberto");
    showHide(verEntrevistaAlberto, conteudoEntrevistaAlberto, "Alberto");
    // John 
    var verEntrevistaJohn = $("#btn-enterview-john"), conteudoEntrevistaJohn = $("#personas-enterview-john");
    showHide(verEntrevistaJohn, conteudoEntrevistaJohn, "John");

    /* Professores de Tempo Parcial */
    // Vincent 
    var verEntrevistaVincent = $("#btn-enterview-vincent"), conteudoEntrevistaVincent = $("#personas-enterview-vincent");
    showHide(verEntrevistaVincent, conteudoEntrevistaVincent, "Vincent");
    // Allan 
    var verEntrevistaAllan = $("#btn-enterview-allan"), conteudoEntrevistaAllan = $("#personas-enterview-allan");
    showHide(verEntrevistaAllan, conteudoEntrevistaAllan, "Allan");
     // Ben 
    var verEntrevistaBen = $("#btn-enterview-Ben"), conteudoEntrevistaBen = $("#personas-enterview-Ben");
    showHide(verEntrevistaBen, conteudoEntrevistaBen, "Ben");
     // Tomas 
    var verEntrevistaTomas = $("#btn-enterview-tomas"), conteudoEntrevistaTomas = $("#personas-enterview-tomas");
    showHide(verEntrevistaTomas, conteudoEntrevistaTomas, "Tomas");
     // Joseph 
    var verEntrevistaJoseph = $("#btn-enterview-Joseph"), conteudoEntrevistaJoseph = $("#personas-enterview-Joseph");
    showHide(verEntrevistaJoseph, conteudoEntrevistaJoseph, "Joseph");
     // James 
    var verEntrevistaJames = $("#btn-enterview-James"), conteudoEntrevistaJames = $("#personas-enterview-James");
    showHide(verEntrevistaJames, conteudoEntrevistaJames, "James");


    // // // // // // // // // // // // // // // // // // // // // // //
    // PAGE: ALL
    // Mostra um display no inferior da página de acordo com o avanço do scroll.
    // Marcação necessária 'immediately after body' <div class="progressBar" id="progressBar"></div>
    // // // // // // // // // // // // // // // // // // // // // // //
    
    function readingPosition() {
        var progress = document.getElementById('progressBar');
        if(progress) { // se a página tiver o elem no DOM
            function setValues() {
                var max = document.body.clientHeight - window.innerHeight, // tamanho da tela comparado com o total da pág.
                    value = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0, // quantos pixels já rodou pra baixo
                    average = (value / max) * 100; // valor já rodado em porcentagem
                return average.toString() + "%"; // volta em string e em %
            }
            progress.style.width = setValues();

            document.addEventListener("scroll", function(){
                progress.style.width = setValues();
            });

            window.addEventListener("resize", function(){
                progress.style.width = setValues();
            });
        }
    }
    readingPosition();

});
