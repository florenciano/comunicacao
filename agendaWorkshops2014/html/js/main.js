"use strict";
// declare as variáveis
var trim, placeholder;

//trim
trim = function (str) {
    return str.replace(/^\s+|\s+$/g,"");
}

placeholder = {
    'confirm': function (a) {
        var v = $(a).attr("placeholder");

        if ( trim($(a).val()) == "" || trim($(a).val()) == undefined ) {
            $(a).val(v);
        } else if ( trim($(a).val()) == trim(v) ) {
            $(a).val("");
        }
    },
    'hold': function (a) {
        $(a).on({
            'focus': function (){
                placeholder.confirm($(this));
            },
            'blur': function (){
                placeholder.confirm($(this));
            }
        });
    }
}

// Doc ready
$(function(){
    // Nice scroll
    // $("body").mCustomScrollbar();

    // Only IE
    if (navigator.userAgent.match("MSIE")) {
        // Placeholder
        placeholder.hold("input, textarea");

        // PIE (border-radius, gradient, box-shadow)
        if (window.PIE) {
            var elements = 'input, textarea, .round';
            
            $(elements).each(function() {
                PIE.attach(this);
            });
        }
    }
});

/* ==========================================================================
   Page: local
========================================================================== */
$(function(){

    function scrollAnchor (ancora) {
        // identifica o el html alvo da âncora
        var link = $( "h2[id=" + ancora + "]" );
        // cria uma animação ao deslocar pra o alvo
        $( "html, body" ).animate({
            scrollTop:  link.offset().top
        }, "slow" );
    }

    // pega todos links ancoras
    $( "a[href=#curse1], a[href=#curse2], a[href=#curse3], a[href=#curse4], a[href=#curse5], a[href=#curse6]" )
    .click(function(event) {
        event.preventDefault();
        // tira o caractere '#'
        var a = $(this).attr("href").split("#").slice(1);
        // chama a funçao
        scrollAnchor( a );
    });

    // animar a âncora de menu
    $( "a[href=#menu]" ).click(function(event) {
        event.preventDefault();
        var b = $(this).attr("href").split("#").slice(1);;
        var alvoAncora = $( "nav[id=" + b + "]" );
        $( "html, body" ).animate({
            scrollTop:  alvoAncora.offset().top
        }, "swing" );
    })

});
