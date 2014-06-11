/////////////////////////////////////////////////////////////////////
//	show modal
/////////////////////////////////////////////////////////////////////

// requisitos de sistema
$( "#requisitos" ).click( function(ev) {
	$( ".containerReqSistema, .bg-modal" ).fadeIn( 400 );
	ev.preventDefault();
});

// perfis de usuário
$( ".forgot a" ).click( function(ev) {
	$( ".perfilUsuario, .bg-modal" ).fadeIn( 400 );
	ev.preventDefault();
});

/////////////////////////////////////////////////////////////////////
//	hide modal
/////////////////////////////////////////////////////////////////////

// requisitos de sistema
$( "#close-modal-reqSistema" ).click( function(ev) {
	$( ".containerReqSistema, .bg-modal" ).fadeOut( 400 );
	ev.preventDefault();
});

// perfis de usuário
$( "#close-modal-perfil" ).click( function(ev) {
	$( ".perfilUsuario, .bg-modal" ).fadeOut( 400 );
	ev.preventDefault();
});

// close background of the modal
$( ".bg-modal" ).click( function(ev) {
	$( ".containerReqSistema, .perfilUsuario").fadeOut( 400 );
	$( this ).fadeOut( 400 );
});

/////////////////////////////////////////////////////////////////////
//	erroArea: TEMP
/////////////////////////////////////////////////////////////////////
$( "input[type='submit']" ).click( function(ev) {
	$( "#erroArea" ).css( "visibility", "visible" );
	$( "input[type='text']" ).focus();
	ev.preventDefault();
});