$(function(){
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // PAGES:
        // contratacao, questoes-operacionais e consulta-rapida //
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	"use strict";

	// // // // // // // // // // // // // // // // // // // // // // //
	// // 1. Fixar header quando rola a página. Somente em desktop
	// // 2. Tirar os alvos dos links âncoras debaixo do header
	// // // // // // // // // // // // // // // // // // // // // // //
	
	function init() {
		
		// // // // // // // // // // // // // // // // // // // // // // //
		// // 1.
		// // // // // // // // // // // // // // // // // // // // // // //
		var menuLateral = $( ".menu-lateral" ),
			_header = document.querySelectorAll( ".header" ),
			headerHeigth = _header[0].offsetHeight; // ~ 118

		var breakPoint = 992; // Value = $screen-md [grid system bootstrap]
		
		function fixedHeader () {
			if (document.documentElement.scrollTop > 0 || document.body.scrollTop > 0) {
				if (window.innerWidth >= breakPoint) {
					_header[1].className = "header header-fixed";
				} else {
					_header[1].className = "header hidden"; // elimina (.header) qdo breakpoint for < desktop
				}
			} else {
				_header[1].className = "header hidden"; // elimina (.header) qdo em desktop rolar ao início
			}
		}

		$( document ).bind( "ready scroll", function() { fixedHeader() });
		$( window ).on( "resize", function() { fixedHeader() });

		// // // // // // // // // // // // // // // // // // // // // // //
		// // 2.
		// // // // // // // // // // // // // // // // // // // // // // //
		var $linksMenuLateral = findEl( menuLateral ),
			$linksContentText = findEl( $( ".content-text" ) );
		
		function findEl (elem) {
			return elem.find( "a[href*='#']" );
		}

		$linksMenuLateral.each( function () { takeUnderHeader( $(this) ) });
		$linksContentText.each( function () { takeUnderHeader( $(this) ) });

		function takeUnderHeader (elem) {
			elem.on( 'click', function (event) {
				if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			     	var target = $(this.hash);
			     	target = target.length ? target : $( "[id=" + this.hash.slice(1) +"]" );
			     	if (target.length) {
			        	$( "html, body" ).animate({
			        		scrollTop: target.offset().top - headerHeigth
			        	}, 100);
			        return false;
			      }
			    }
			});
		}
	}
	
	init();

	// // // // // // // // // // // // // // // // // // // // // // //
	// // show/hide menu-lateral-small-device
	// // // // // // // // // // // // // // // // // // // // // // //
	
	function showHide_sd () {
		var btn = $( "#btnMenu" ),
			menu = $( ".menu-lateral-sd" ),
			bg = $( ".bg-menu-lateral-sd" ),
			heightDoc = $( document ).height();

		bg.height( heightDoc );
		
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
			if (menu.css( "display" ) == "none") {
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
		var linkAllMenu_sd = menu.find( "a" );
		
		linkAllMenu_sd.each( function () {
			$(this).on( "click", _hide );
		});
	}
	
	showHide_sd();

});
