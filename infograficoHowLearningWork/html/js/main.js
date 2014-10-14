$(function() {

    /*  show/hide description 'read more' with animate
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    var btnReadMore = $( ".btnReadMore" );
    
    function onClickToggleCont(e) {
        $(this).parent().next().slideToggle( "slow" );
        e.preventDefault();
    };

    btnReadMore.each(function() {
        $(this).on( "click", onClickToggleCont );
    });

    /*  close content textual aditional
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    var btnCloseMore = $( ".closeReadMore" );

    function onClickHideCont(e) {
        $(this).parents( ".readMore" ).fadeOut( "slow" );
        e.preventDefault();
    };

     btnCloseMore.each(function() {
        $(this).on( "click", onClickHideCont );
    });

    /*  emule effects for media touch
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    function onTouchEffects(e) {
        $(this).toggleClass( "testTouchOverEffects" ); // insert here new class equal class:hover 
        e.preventDefault();
    }
    
    $( [btnReadMore, btnCloseMore] ).bind( "touchstart touchend", onTouchEffects );

});