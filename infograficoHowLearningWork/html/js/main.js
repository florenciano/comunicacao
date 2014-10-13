$(function() {

    // variables
    var btnReadMore = $( ".btnReadMore" );
    var btnCloseMore = $( ".closeReadMore" );

    // touch
    $( "#testEl" ).bind( "touchstart touchend", function(e) {
        $(this).toggleClass( "testTouchOverEffects" );
        e.preventDefault();
    });


    /*  show/hide description 'read more' with animate
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    function onClickToggleCont(e) {
        $(this).parent().next().slideToggle( "slow" );
        e.preventDefault();
    }

    /*  close content textual of 'read more'
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    function onClickHideCont(e) {
        $(this).parents( ".readMore" ).fadeOut( "slow" );
        e.preventDefault();
    }

    // events
    btnReadMore.each(function() {
        $(this).on( "click", onClickToggleCont );
    });

    btnCloseMore.each(function() {
        $(this).on( "click", onClickHideCont );
    });

});