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

	// // fixed menu-lateral in scrool and (.header-fixed)
	// // // // // // // // // // // // // // // // // // // // // // //
	function fixedMenuTop () {
		var menuLateral = $( ".menu-lateral" ),
			_header = document.querySelectorAll('.header'),
			headerHeigth = _header[0].offsetHeight; // 118

		$( document ).bind( "ready scroll", function() {
			// exec only view in large desktop
			if (window.outerWidth > 1024) {
				// fixed menu-lateral
				// $(this).scrollTop() >= (posTitle - 20 - headerHeigth) ? menuLateral.addClass( "fixed-menu" ) : menuLateral.removeClass( "fixed-menu" );

				// fixed header
				if (document.documentElement.scrollTop > 0 || document.body.scrollTop > 0) { // crossbrowser
					_header[1].className = 'header header-fixed'; // headerUp
				} else {
					_header[1].className = 'header hidden'; // headerUp
				}
			}
		});
	}
	fixedMenuTop();

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
