$(function(){
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // PAGES:
        // contratacao, questoes-operacionais e consulta-rapida //
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	// // // // // // // // // // // // // // // // // // // // // // //
	// MENU LATERAL
	// // // // // // // // // // // // // // // // // // // // // // //

	// var global function - title page
	var posTitle = $( ".first" ).offset().top; 
	
	// // pin menu-lateral in scrool
	// // // // // // // // // // // // // // // // // // // // // // //
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
	// tigger events
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


	// // high-ligth itens-menu in scroll
	// // // // // // // // // // // // // // // // // // // // // // //
	function hightligthTitle() {
		var titles_big = [],
			titles_small = [],
			_height = $(window).height(),
			li_small = $( ".container-menu li a" ),
			titles_menu = $( ".menu-lateral h5" ),
			i = 0;

		$( ".content-text h2" ).each( function() {
			titles_big.push($(this).offset().top);
		});
		$( ".content-text h3" ).each( function() {
			titles_small.push($(this).offset().top);
		});

		$( document ).bind( "ready scroll", function() {
			var $this = $(this),
			pos = $this.scrollTop();

			for (i in titles_big) {
				if(titles_big[i] < pos && titles_big[i] > pos - _height){
					titles_menu.removeClass( "active" );
					titles_menu.eq(i).addClass( "active" );
				}
			};
			for (i in titles_small) {
				if(titles_small[i] < pos && titles_small[i] > pos - _height) {
					li_small.removeClass( "active" );
					li_small.eq(i).addClass( "active" );
				}
			};
			// removing ".active" when scroll window beging 
			if(pos < posTitle) { 
				titles_menu.removeClass( "active" );
				li_small.removeClass( "active" );
			};
		});
	}
	setTimeout(hightligthTitle(), 200);

	// // scroll page links-anchor
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
	
	// M. don't like. Caesar the things which are Caesar's.
	
	btn_scrollAnchor(linkMenu_sd);
	btn_scrollAnchor(linkMenu);
	

	// // // // // // // // // // // // // // // // // // // // // // //
	// PAGE ALL
	// // // // // // // // // // // // // // // // // // // // // // //

	// // aply class 'active' on click in list-menu-device
	// // // // // // // // // // // // // // // // // // // // // // //
	linkMenu_sd.on( "click", function(e) {
		linkMenu_sd.removeClass( "active" );
		$(this).addClass( "active" );
	});

});
