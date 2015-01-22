/////////////////////////////////////////////////////////////////////
//	show modal
/////////////////////////////////////////////////////////////////////

// requisitos de sistema
// $( "#requisitos" ).click( function(ev) {
// 	$( ".containerReqSistema, .bg-modal" ).fadeIn( 400 );
// 	ev.preventDefault();
// });

// perfis de usuário
var esqSenha = $(".forgot a");
esqSenha.attr({
	href: "#",
	onclick: ""
});
esqSenha.click( function(ev) {
	$( ".perfilUsuario, .bg-modal" ).fadeIn( 400 );
	ev.preventDefault();
});

/////////////////////////////////////////////////////////////////////
//	hide modal
/////////////////////////////////////////////////////////////////////

// requisitos de sistema
// $( "#close-modal-reqSistema" ).click( function(ev) {
// 	$( ".containerReqSistema, .bg-modal" ).fadeOut( 400 );
// 	ev.preventDefault();
// });

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
//	custom message of the alert in error login
/////////////////////////////////////////////////////////////////////
var m = $("#loginErrorMessage");
m.text("Dados inválidos. Tente novamente.");

/////////////////////////////////////////////////////////////////////
//	customing table requisitos-sistemas
/////////////////////////////////////////////////////////////////////
// var t = $( ".reqSis-table tr td" );
// t.each(function () {
// 	if( $(this).text().indexOf("Certified") == -1) {
// 		t.css( "backgroundColor","red" );
// 	}
// })
var t = $("#teste").text();
var g = $( "<span>" ).addClass("good");
if (t.indexOf("Certified") == -1 ) {
	  console.log("faz nada") // nao tem
} else {
	t.prepend(g); // tem
}
