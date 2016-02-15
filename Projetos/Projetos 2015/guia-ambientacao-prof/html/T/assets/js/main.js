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
	var posTitle = $( "#first" ).offset().top; // ~ 152 <h1>

	// // Fixar header quando rola a página. Somente em desktop
	// // Tirar os alvos dos links âncoras debaixo do header
	// // // // // // // // // // // // // // // // // // // // // // //
	function fixedHeader_linksAnchor () {
		
		// // // // // // // // // // // // // // // // // // // // // // //
		// // Fixar header quando rolar a página. Somente em desktop.
		
		var menuLateral = $( ".menu-lateral" ),
			_header = document.querySelectorAll( '.header' ),
			headerHeigth = _header[0].offsetHeight; // ~ 118

			var breakPoint = 992; // Value = $screen-md [grid system bootstrap]
			
			function fixedHeader () {
				console.log('a');
				if (window.outerWidth >= breakPoint) {
					/*
					fixed menu-lateral. Disabled in older reviews
					$(this).scrollTop() >= (posTitle - 20 - headerHeigth) ? menuLateral.addClass( "fixed-menu" ) : menuLateral.removeClass( "fixed-menu" );
					*/
					
					if (document.documentElement.scrollTop > 0 || document.body.scrollTop > 0) { // crossbrowser
						_header[1].className = 'header header-fixed';
					} else {
						_header[1].className = 'header hidden';
					}
				}
			}
		$( document ).on( "scroll", function() { fixedHeader() });
		$( window ).bind( "ready resize", function() { fixedHeader() });

		// // // // // // // // // // // // // // // // // // // // // // //
		// // Tirar os alvos dos links âncoras debaixo do header.
		
		var linksMenuLateral = menuLateral.find('a[href*="#"]');
		
		linksMenuLateral.each( function () {
			$(this).on( 'click', function (event) {
				if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			     	var target = $(this.hash);
			     	target = target.length ? target : $( '[id=' + this.hash.slice(1) +']' );
			     	if (target.length) {
			        	$( 'html, body' ).animate({
			        		scrollTop: target.offset().top - headerHeigth
			        	}, 100);
			        return false;
			      }
			    }
			});
		});

	}
	fixedHeader_linksAnchor();


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

});
