$(function(){
	
	"use strict";

	console.log(true);

	// // // // // // // // // // // // // // // // // // // // // // //
	// PAGE: Resultados - Persona - Dedicação Exclusiva
	// // // // // // // // // // // // // // // // // // // // // // //
    
    // Mostra e oculta a seção da entrevista dos personas
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
            });
        });

    };

    /* Professores de Dedicação Exclusiva */

    // Rick 
    var verEntrevistaRick = $("#btn-enterview-rick"), conteudoEntrevistaRick = $("#personas-enterview-rick");
    showHide(verEntrevistaRick, conteudoEntrevistaRick, "Rick");
    // Barbara 
    var verEntrevistaBarbara = $("#btn-enterview-barbara"), conteudoEntrevistaBarbara = $("#personas-enterview-barbara");
    showHide(verEntrevistaBarbara, conteudoEntrevistaBarbara, "Barbara");
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
     // Michael 
    var verEntrevistaMichael = $("#btn-enterview-michael"), conteudoEntrevistaMichael = $("#personas-enterview-michael");
    showHide(verEntrevistaMichael, conteudoEntrevistaMichael, "Michael");


    // // // // // // // // // // // // // // // // // // // // // // //
    // PAGE: ALL
    // Mostra um display no inferior da página
    // de acordo com o avanço do scroll.
    // <div class="progressBar" id="progressBar"></div>
    // // // // // // // // // // // // // // // // // // // // // // //

    function readingPosition() {
        var $progress = $( "#progressBar" );

        function setValues() {
             // altura do documento - altura da janela
            var getMax = $( document ).innerHeight() - $( window ).innerHeight();

            // posição do scroll da tela
            var getValue = $( window ).scrollTop(); 

            // valores convertidos em uma escala de 100%
            var x, y = (getValue / getMax )* 100;

            return x = y.toString() + "%";
        };

        $progress.css("width", setValues());
        
        // seta no progress a quantidade já rolada da tela
        $( document ).on( "scroll", function() {
            $progress.css("width", setValues()); 
        });

        // ao modificar a largura da janela, reconfigurar os valores e atuáliza-los
        $( window ).on( "resize", function() {
            $progress.css("width", setValues());
        });
        
    }

    readingPosition()


});
