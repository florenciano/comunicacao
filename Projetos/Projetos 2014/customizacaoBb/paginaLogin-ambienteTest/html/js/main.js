$(function(){

	/////////////////////////////////////////////////////////////////////
	//	functions
	/////////////////////////////////////////////////////////////////////

	// show/hide: modals
	function hideModal (el1, el2) {	$( el1, el2 ).fadeOut( 400 ) }
	function showModal (el1, el2) {	$( el1, el2 ).fadeIn( 400 ) }

	// acessciility: hide modal with keypress 'ESC'
	function HideModalESC () {
		$( document ).on( "keyup", function (e) {
			if($( ".perfilUsuario" ).css( "display" ) !== "none") {
				if(e.keyCode == 27) {
					hideModal( ".perfilUsuario, .bg-modal" );	
				}
			}	
		});
	}

	// banner: replacement random imagens
	function replacementImgBanner () {
		var numbTotalImg = 7;
		var num = Math.ceil(Math.random() * numbTotalImg);
		$( ".libraryInsperLogin" ).css( "background-image", "url(https://inspertest.blackboard.com/bbcswebdav/institution/DEA/pagLogin/img/campus" + num + ".jpg)" );
	}

	/////////////////////////////////////////////////////////////////////
	//	show modal
	/////////////////////////////////////////////////////////////////////

	// Modal: Perfis do usuário
	var esqSenha = $(".forgot a");
	esqSenha.attr({
		href: "#",
		onclick: ""
	});
	esqSenha.on( "click", function(ev) {
		showModal( ".perfilUsuario, .bg-modal" );
		ev.preventDefault();
	});

	/////////////////////////////////////////////////////////////////////
	//	events
	/////////////////////////////////////////////////////////////////////

	$( "#close-modal-perfil" ).on( "click", function(ev) {
		hideModal( ".perfilUsuario, .bg-modal" );
		ev.preventDefault();
	});

	$( ".bg-modal" ).on( "click", function(ev) {
		hideModal( ".perfilUsuario, .bg-modal" );
		ev.preventDefault();
	});

	HideModalESC();
	replacementImgBanner();

	/////////////////////////////////////////////////////////////////////
	//	custom message of the alert in error login
	/////////////////////////////////////////////////////////////////////
	$( "#loginErrorMessage" ).html( "Dados inválidos. Tente novamente." );
});


