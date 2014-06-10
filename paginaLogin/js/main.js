/* scripts da página */
// $( ".containerReqSistema, .perfilUsuario, .bg-modal" ).css( "display","none" );

// escondendo o modal: requisitos de sistema
$( "#close-modal-reqSistema" ).click( function(ev) {
	$( ".containerReqSistema, .bg-modal" ).css( "display","none" );
	ev.preventDefault;
});

// escondendo o modal: perfis
$( "#close-modal-perfil" ).click( function(ev) {
	$( ".perfilUsuario, .bg-modal" ).css( "display","none" );
	ev.preventDefault;
});
