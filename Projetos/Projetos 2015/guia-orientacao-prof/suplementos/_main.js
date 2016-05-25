$(function(){
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // PAGES:
        // contratacao, questoes-operacionais e consulta-rapida //
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	// // // // // // // // // // // // // // // // // // // // // // //
	// MENU LATERAL
	// // // // // // // // // // // // // // // // // // // // // // //

	// var global
	var posTitle = $( ".first" ).offset().top; // <h1>

	// // Effects accordion in (.container-menu)
	// // fix bug colision theme [portaldoprofessor] footer page
	// // // // // // // // // // // // // // // // // // // // // // //
	var accordion = function () {

		"use strict";
		var menu, titles, process;

		menu = $( ".container-menu" );
		titles = menu.find( "h5" );

		process = function (current) {
			var ul, anim;

			// current.addClass( "active" ); // "h5"

			ul = current.next( "ul" ); 
			ul.addClass( "unactive" ); // all "ul" class (.unactive)
			ul.fadeOut( 'fast' );
			
			function _animate (el, classRemove, classAdd) {
				el.animate({
					opacity: "toggle",
				    height: "toggle"
				}, 200, function () {
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
						$(this).animate({
						    opacity: "toggle",
						    height: "toggle"
						  }, 200, function() {
					    	$(this).removeClass( "active" ).addClass( "unactive" );
					  });
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
	accordion();
	
	// // fixed menu-lateral in scrool
	// // // // // // // // // // // // // // // // // // // // // // //
	function fixedMenuTop () {
		var menuLateral = $( ".menu-lateral" ),
		itensMenuGlobal = $( ".add-itens-mg" );

		$( document ).bind( "ready scroll", function() {
			if( $(this).scrollTop() >= posTitle ) {
				menuLateral.addClass( "fixed-menu" );
				itensMenuGlobal.fadeIn( 400 );
			} else {
				menuLateral.removeClass( "fixed-menu" );
				itensMenuGlobal.fadeOut( 400 );
			}
		});
	}
	fixedMenuTop();

	// // high-ligth itens-menu in scroll
	// // // // // // // // // // // // // // // // // // // // // // //
	function hightligthTitle() {
		var titles_big = [],
			// titles_small = [],
			_height = $(window).height(),
			li_small = $( ".container-menu li a" ),
			titles_menu = $( ".menu-lateral h5" ),
			i = 0;

		$( ".content-text h2" ).each( function() {
			titles_big.push( $(this).offset().top );
		});
		/*
		$( ".content-text h3" ).each( function() {
			titles_small.push($(this).offset().top);
		});
		*/

		$( document ).bind( "ready scroll", function() {
			var $this = $(this),
				pos = $this.scrollTop(),
				arrayTitles = [],
				count = 0;

			for (i in titles_big) { // pos <h2>
				if (titles_big[i] < pos) { 
					count ++
				}
			};
			
			titles_menu.removeClass( "active" );
			titles_menu.eq(count - 1).addClass( "active" );
			/*
			for (i in titles_small) {
				if(titles_small[i] < pos && titles_small[i] > pos - _height) {
					li_small.removeClass( "active" );
					li_small.eq(i).addClass( "active" );
				}
			};
			*/

			// removing ".active" when scroll window beging 
			if(pos < posTitle) { 
				titles_menu.removeClass( "active" );
			};

		});
	}
	setTimeout(hightligthTitle(), 200);


	// // show/hide menu-lateral-small-device
	// // // // // // // // // // // // // // // // // // // // // // //
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
		if(menu.css("display") == "none") {
			_show();
		} else {
			_hide();
		}
	});
	$( document ).on( "keyup", function (e) {
		if(menu.css( "display" ) !== "none") {
			if(e.keyCode == 27) {
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

	
	// // Add title menu-lateral-small-device from menu-global
	// // // // // // // // // // // // // // // // // // // // // // //
	var t = $( "nav" ).find( "a" ),
		r = $( ".menu-lateral-sd h4" );
	function _replaceTitle(key) {
		$(r).text( t.eq(key).text() );
	}
	if( $("body#contratacao").length ) { _replaceTitle(0) };
	if( $("body#questoes-operacionais").length ) { _replaceTitle(1) };
	if( $("body#consulta-rapida").length ) { _replaceTitle(2) };

	// // scroll page links-anchor
	// // // M. don't like. Caesar the things which are Caesar's.
	// // // // // // // // // // // // // // // // // // // // // // //
	var linkMenu_sd = $( ".menu-lateral-sd .list-unstyled a" ),
		linkMenu = $( ".menu-lateral .container-menu a" );
	
	function scrollAnchor (ancora) {
        var link = $( ".content-text h3[id=" + ancora + "]" );
        $( "html, body" ).animate({
            scrollTop:  link.offset().top + 1
        }, "slow" );
    }
    function btn_scrollAnchor (btn) {
	    btn.on( "click", function (e) {
	        var a = $(this).attr( "href" ).split("#").slice(1);
	        e.preventDefault();
	        scrollAnchor(a);
	        _hide();
	    });
    };
	
	/*
	btn_scrollAnchor(linkMenu_sd);
	btn_scrollAnchor(linkMenu);
	*/

	// // Add (".active") on click in item menu and move down scrollTop()
	// // // // // // // // // // // // // // // // // // // // // // //
	function addActive () {
		var menu, titlesMenu, linksMenu;

		menu = $( ".container-menu" ),
		titlesMenu = menu.find( "h5" ),
		linksMenu = titlesMenu.children( "a" );

		function scrollAnchor (ancora) {
	        var link = $( "h2[id=" + ancora + "]", $( ".content-text" ) );
	        $( "html, body" ).animate({
	            scrollTop:  link.offset().top + 1
	        }, 0 ); // M. don't like scrool page
	    }

		linksMenu.on( "click", function (event) {
			var nameA = $(this).attr( "href" ).split("#").slice(1);
			scrollAnchor( nameA );
		});
	}
	// setTimeout(addActive(), 300);

});
