$(function(){
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // PAGES:
        // contratacao, questoes-operacionais e consulta-rapida //
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	// // // // // // // // // // // // // // // // // // // // // // //
	// MENU LATERAL
	// // // // // // // // // // // // // // // // // // // // // // //
	"use strict";

	// var global
	var posTitle = $( "#first" ).offset().top; // <h1> = 152.9843

	// // Effects accordion in (.container-menu)
	// // fix bug colision theme [portaldoprofessor] footer page
	// // // // // // // // // // // // // // // // // // // // // // //
	var accordion = function () {
		var menu, titles, process;

		menu = $( ".container-menu" );
		titles = menu.find( "h5" );

		process = function (current) {
			var ul, anim;

			ul = current.next( "ul" ); 
			ul.addClass( "unactive" ); // all "ul" class (.unactive)
			ul.fadeOut( 1 );
			
			function _animate (el, classRemove, classAdd) {
				el.animate({
					opacity: "toggle",
				    height: "toggle"
				}, 100, function () {
					el.removeClass( classRemove).addClass( classAdd );
				});
			}

			anim = function () {
				if (ul.hasClass( "active" )) {
					_animate( ul, "active", "unactive" );
				} else {
					_animate( ul, "unactive", "active" );
				}
			};

			// trigger event 'click' in item-menu
			current.on( "click", function () {
				if (!ul.hasClass( "active" )) {
					$( ".container-menu h5 + ul.active" ).each(function () {
						_animate( $(this), "active", "unactive" );
					});
					anim();
				} else {
					anim();
				}
			});
		};
		titles.each( function () { 
			process( $(this) );
		});
	}
	// accordion();
 
	// // fixed menu-lateral in scrool
	// // // // // // // // // // // // // // // // // // // // // // //
	function fixedMenuTop () {
		var menuLateral = $( ".menu-lateral" );

		$( document ).bind( "ready scroll", function() {
			// exec in view only large desktop
			if (window.outerWidth > 1200) {
				$(this).scrollTop() >= posTitle ? menuLateral.addClass( "fixed-menu" ) : menuLateral.removeClass( "fixed-menu" );
			}
		});
	}
	fixedMenuTop();

	// // high-ligth itens-menu in scroll
	// // // // // // // // // // // // // // // // // // // // // // //
	function hightligthTitle() {
		var titles_big = [],
			_height = $(window).height(),
			titles_menu = $( ".menu-lateral h5" ),
			i = 0;

		$( ".content-text h2" ).each( function() {
			titles_big.push( $(this).offset().top );
		});

		$( document ).bind( "ready scroll", function() { // durante o carregamento e scroll da página...
			var $this = $(this),
				pos = $this.scrollTop(),
				count = 0;

			for (i in titles_big) { // verifica todos os subtitles <h2> da pag
				if (titles_big[i] < pos + 1) { // quantos estão abaixo da linha da rolagem
					count ++ // add qtde total na var
				}
			};
			
			if (pos >= 230) { // pos 1º <h2>
				titles_menu.removeClass( "active" ); // remove class
				titles_menu.eq(count - 1).addClass( "active" ); // add class apenas no último titulo do menu
			} else if (pos >= 180) { // pos <h1>
				titles_menu.removeClass( "active" );
				titles_menu.eq(0).addClass( "active" ); 
			}

			// removing ".active" when scroll window beging 
			if (pos < posTitle) { 
				titles_menu.removeClass( "active" );
			};


		});
	}
	// setTimeout(hightligthTitle(), 200);

	// // show/hide menu-lateral-small-device
	// // // // // // // // // // // // // // // // // // // // // // //
	function showHide_sd () {
		var btn = $( "#btnMenu" ),
			menu = $( ".menu-lateral-sd" ),
			bg = $( ".bg-menu-lateral-sd" ),
			heightDoc = $( document ).height();

		bg.height(heightDoc);
		
		function _show() {
			bg.css( "display","block" );
			menu.css( "display","block" );
			menu.animate({
				left: "0px"
			}, 400);	
		};
		function _hide() {
			bg.css( "display","none" );
			menu.animate({
				left: "-279px"
			}, 400, function() {
				menu.css( "display","none" );
			});	
		};

		// trigger events in 'click' and 'keyup'
		btn.on( "click", function() {
			if (menu.css("display") == "none") {
				_show();
			} else {
				_hide();
			}
		});
		$( document ).on( "keyup", function (e) {
			if (menu.css( "display" ) !== "none") {
				if (e.keyCode == 27) {
					_hide();
				}
			}	
		});
		bg.on( "click", function() {
			_hide();
		});

		// click all link in (.menu-lateral-sd) hide
		var linkAllMenu_sd = $( "a", menu );
		
		linkAllMenu_sd.each( function () {
			$(this).on( "click", function () {
				_hide();
			} );
		});
	}
	showHide_sd();
	
	// // Add title menu-lateral-small-device from menu-global
	// // // // // // // // // // // // // // // // // // // // // // //
	function addTitle_sd () {
		var t = $( "nav" ).find( "a" ),
			r = $( ".menu-lateral-sd h4" );
		function _replaceTitle(key) {
			$(r).text( t.eq(key).text() );
		}
		if( $( "#contratacao" ).length ) { _replaceTitle(0) };
		if( $( "#questoes-operacionais" ).length ) { _replaceTitle(1) };
		if( $( "#consulta-rapida" ).length ) { _replaceTitle(2) };
	}
	// setTimeout(addTitle_sd(), 400);

});
