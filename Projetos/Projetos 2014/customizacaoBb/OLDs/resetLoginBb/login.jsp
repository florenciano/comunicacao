<%@ include file="/webapis/ui/doctype.jspf" %>

<%@ taglib uri="/bbNG" prefix="bbNG" %>
<%@ taglib uri="/bbUI" prefix="bbUI" %>
<%@ taglib uri="/loginUI" prefix="loginUI" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<c:set var="productName" value="${ loginUI:getProductName() }" />

<bbNG:genericPage authentication="N" wrapper="false" onLoad="if (document.forms.login.user_id != undefined) document.forms.login.user_id.focus()" bodyClass="login-page">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<style type="text/css">
@charset "utf-8";
body {
	margin:0px;
	background:#e9e8e0 url(https://insper.blackboard.com/login/bg_sombra.jpg) repeat-x;
}
#tudo {
	position:absolute;
	left:50%;
	top:40%;
	margin-left:-490px;
	margin-top:-239px;
}
#container{
	margin:20px auto;
	width:980px;
	height:478px;
}
#conteudo {
	background:url(https://insper.blackboard.com/login/bg.jpg) no-repeat center;
	width:856px;
	height:478px;
	float: left;
}
#div_Sesq {
	background:url(https://insper.blackboard.com/login/bg_sombra_esq.png) no-repeat center;
	width:60px;
	height:478px;
	float: left;	
}
#div_Sdir {
	background:url(https://insper.blackboard.com/login/bg_sombra_dir.png) no-repeat center;
	width:60px;
	height:478px;
	float: left;
}
#copyArea {
	margin:auto;
	height:20px;
	font:9px Arial, Helvetica, sans-serif;
	text-align:center;
	color:#666666;
}


/****************************************************
Blackboard estilos
*****************************************************/

#loginBoxInsper {
    background: transparent !important;
	float:right !important;
	margin-top:177px !important;
	width:327px !important;
}
#loginBoxInsper h2 {
    margin: 10px !important;
	visibility:hidden !important;
}
#loginBoxInsper p {
    color: #444444 !important;
    font-size: 0.85em !important;
    margin: 10px !important;
	visibility:hidden !important;
}

#loginBoxInsper ul {
    margin: 6px 12px !important;
}
#loginBoxInsper li {
    clear: both !important;
    padding: 3px 0 !important;
}
#loginBoxInsper li label {
    float: left !important;
	/*color:#6e6e6c;*/
	color:#6e6e6e;
	text-transform: uppercase !important;
	font-size:90% !important;
    font-weight: bold !important;
    padding: 5px 10px 0 0 !important;
    text-align: right !important;
    width: 100px !important;
}

#loginBoxInsper input[type="text"] {
	width:180px !important;
	height:25px !important;
	padding: 0 5px !important;
	-webkit-border-radius: 5px !important;
	-moz-border-radius: 5px !important;
	border-radius: 5px !important;
	border:1.5px solid #b4aea4 !important;
	background:#F6F6F6 !important;
	box-shadow: 2px 2px 5px #c1c5c8 !important;
	color:#A10207 !important;
	font-weight:bold !important;
	vertical-align: middle !important;
}
#loginBoxInsper input[type="password"] {
	width:180px !important;
	height:25px !important;
	padding: 0 5px !important;
	-webkit-border-radius: 5px !important;
	-moz-border-radius: 5px !important;
	border-radius: 5px !important;
	border:1.5px solid #b4aea4 !important;
	background:#F6F6F6 !important;
	box-shadow: 2px 2px 5px #c1c5c8 !important;
	color:#A10207 !important;
	font-weight:bold !important;
}

#primaryButton, input.submit[type="submit"], .rumble .mainButton > a, .rumble_top .mainButton > a, .button-1, .button-1-img {
	background:#e6e8ea !important;
    background: -moz-linear-gradient(100% 100% 90deg, #d9d8d4, #fefefe) repeat scroll 0 0 #fefefe !important;
	background-image: -moz-linear-gradient(100% 100% 90deg, #d9d8d4, #fefefe) !important;
    background-image: -webkit-gradient(linear, 0% 0%, 0% 90%, from(#fefefe), to(#d9d8d4)) !important;
    -ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#fefefe, endColorstr=#d9d8d4" !important;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#fefefe, endColorstr=#d9d8d4) !important;
}
input[type="submit"].submit:hover,
.rumble .mainButton > a:hover,
.rumble .mainButton > a:focus,
.rumble_top .mainButton > a:hover,
.rumble_top .mainButton > a:focus,
.button-1:hover,
.button-1:focus,
.button-1-img:hover,
.button-1-img:focus {
    background: -moz-linear-gradient(100% 100% 90deg, #c3c2bd, #dcdada) repeat scroll 0 0 #dcdada !important;
	background-image: -moz-linear-gradient(100% 100% 90deg, #c3c2bd, #dcdada) !important;
    background-image: -webkit-gradient(linear, 0% 0%, 0% 90%, from(#dcdada), to(#c3c2bd)) !important;
    -ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#dcdada, endColorstr=#c3c2bd" !important;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#dcdada, endColorstr=#c3c2bd) !important;

}

#primaryButton, input.submit[type="submit"], .rumble .mainButton > a, .rumble_top .mainButton > a, .button-1, .button-1-img {
	background-color:transparent !important;
}

input[type="submit"] {
	background-color:transparent !important;
}

li input[type="submit"] {
	background-color:transparent !important;
}

#loginBoxInsper li input[type="submit"] {
	background-color:transparent !important;
}

#loginBoxInsper li input[type="submit"],
#loginBoxInsper li input[type="submit"]:link,
#loginBoxInsper li input[type="submit"]:active,
#loginBoxInsper li input[type="submit"]:visited {
	color:#6e6e6c !important;
	text-transform: uppercase !important;
	font-size:90% !important;
	width:192px !important;
	height:25px !important;
	float: right !important;
	padding:0 !important;
	-webkit-border-radius: 5px !important;
	-moz-border-radius: 5px !important;
	border-radius: 5px !important;
	border:1.5px solid #b4aea4 !important;
	background:#e6e8ea url(https://insper.blackboard.com/login/bg_bt.png) 0 0 repeat-x !important;

	box-shadow: 2px 2px 5px #c1c5c8 !important;
	margin: 0px 1px !important;
	text-shadow: none !important;
	
	-webkit-transition:	all .2s linear !important;
	-moz-transition: all .2s linear !important;
	-o-transition: all .2s linear !important;
	transition: all .2s linear !important;
}
#loginBoxInsper li input[type="submit"]:hover {
	color:#F6F6F6 !important;
	background:#e6e8ea url(https://insper.blackboard.com/login/bg_bt.png) 0 -25px repeat-x !important;
	
	-webkit-transition:	all .2s linear !important;
	-moz-transition: all .2s linear !important;
	-o-transition: all .2s linear !important;
	transition: all .2s linear !important;
}

#loginBoxInsper .forgot a:link, .forgot a:active, .forgot a:visited {
	color:#6e6e6c !important;
	font-size:90% !important;
	font-weight:bold !important;
	text-align:center !important;
	text-decoration:none !important;
	text-transform: uppercase !important;
	padding:5px 0 0 !important;
	
	width:190px !important;
	height:20px !important;
	float: right !important;
	-webkit-border-radius: 5px !important;
	-moz-border-radius: 5px !important;
	border-radius: 5px !important;
	border:1.5px solid #b4aea4 !important;
	background:#e6e8ea url(https://insper.blackboard.com/login/bg_bt.png) 0 0 repeat-x !important;
	box-shadow: 2px 2px 5px #c1c5c8 !important;
	margin: 0px 1px !important;
	
	-webkit-transition:	all .2s linear !important;
	-moz-transition: all .2s linear !important;
	-o-transition: all .2s linear !important;
	transition: all .2s linear !important;
}
#loginBoxInsper .forgot a:hover{
	color:#F6F6F6 !important;
	background:url(https://insper.blackboard.com/login/bg_bt.png) 0 -25px repeat-x !important;
	
	-webkit-transition:	all .2s linear !important;
	-moz-transition: all .2s linear !important;
	-o-transition: all .2s linear !important;
	transition: all .2s linear !important;
}

#loginErrorMessage {
	width:auto !important;
	height:64px !important;
	background:url(https://insper.blackboard.com/login/bg_erro.png) no-repeat !important;
    color: #FFFFFF !important;
    font: bold 11px Arial,Helvetica,sans-serif !important;
    text-align: center !important;
	border:0px !important;
	padding:18px !important;
}
/**********************************************
desespero
***********************************************/

.clearfix, .clearfixParent > div, .clearfixParent > li {
    display: block;
}

/**********************************************/


#erroArea {
	float:right;
	margin: 324px -320px;
	height:64px;
	width:317px;
	text-align:center;
}
#requisitos_Container {
	width:857px;
	height:30px;
	text-align:right;
	position:absolute;
}
#requisitos_bt {
	background:url(https://insper.blackboard.com/login/requisitos_ico.png) no-repeat 0 -30px;
	width:60px;
	height:30px;
	margin: 10px 0 0 840px;
	position:absolute;
	text-indent:-9000em;
}
#requisitos_bt:hover {
	background:url(https://insper.blackboard.com/login/requisitos_ico.png) no-repeat 0 0px;
}

#requisitos_pop {
	background:url(https://insper.blackboard.com/login/requisitos.png) no-repeat;
	position:absolute;
	width:513px;
	height:259px;
	margin:10px 0px 0 389px;
	box-shadow: 2px 2px 5px #c1c5c8;
	visibility:hidden;
}
#bt_fechar {
	background:url(https://insper.blackboard.com/login/bt_fechar.png) no-repeat 0 0;
	width:19px;
	height:18px;
	margin:5px 0 0 489px;
	position:absolute;
	text-indent:-9000em;
	
	-webkit-transition:	all .2s linear;
	-moz-transition: all .2s linear;
	-o-transition: all .2s linear;
	transition: all .2s linear;
}

#requisitos_box {
	width:160px;
	height:72px;
	float:left;
	font:bold 11px Tahoma, Geneva, sans-serif;
	color:#6E6E6C;
	text-align:right;
	text-transform: uppercase;
}
#requisitos_box p{
	margin:2px auto;
}
.requisitos_topTit {
	margin:5px;
}
.requisitos_top {
	margin:18px 5px 5px 5px;
}
#reqTitulo {
	width: 150px;
	margin:20px 10px 20px 0px;
}

</style>
<script type="text/javascript">

function FechaPop(divid) { 
	document.getElementById(divid).style.visibility = 'hidden'; 
} 
function AbrePop(divid) { 
	document.getElementById(divid).style.visibility = 'visible'; 
} 

</script>
</head>

<body>
<!-- <script src="http://www.zugdesign.com.br/JOBS/insper/js/wz_tooltip.js" type="text/javascript"></script> -->
<script language="javascript">
var config = new Object();


//===================  GLOBAL TOOPTIP CONFIGURATION  =========================//
var  tt_Debug	= true		// false or true - recommended: false once you release your page to the public
var  tt_Enabled	= true		// Allows to (temporarily) suppress tooltips, e.g. by providing the user with a button that sets this global variable to false
var  TagsToTip	= true		// false or true - if true, HTML elements to be converted to tooltips via TagToTip() are automatically hidden;
							// if false, you should hide those HTML elements yourself

// For each of the following config variables there exists a command, which is
// just the variablename in uppercase, to be passed to Tip() or TagToTip() to
// configure tooltips individually. Individual commands override global
// configuration. Order of commands is arbitrary.
// Example: onmouseover="Tip('Tooltip text', LEFT, true, BGCOLOR, '#FF9900', FADEIN, 400)"
config. Above			= false 	// false or true - tooltip above mousepointer
config. BgColor 		= '#c0a7a2' // Background colour (HTML colour value, in quotes)
config. BgImg			= ''		// Path to background image, none if empty string ''
config. BorderColor		= '#ffbf40'
config. BorderStyle		= 'solid'	// Any permitted CSS value, but I recommend 'solid', 'dotted' or 'dashed'
config. BorderWidth		= 0
config. CenterMouse		= true 	// false or true - center the tip horizontally below (or above) the mousepointer
config. ClickClose		= false 	// false or true - close tooltip if the user clicks somewhere
config. ClickSticky		= false		// false or true - make tooltip sticky if user left-clicks on the hovered element while the tooltip is active
config. CloseBtn		= false 	// false or true - closebutton in titlebar
config. CloseBtnColors	= ['#990000', '#FFFFFF', '#DD3333', '#FFFFFF']	  // [Background, text, hovered background, hovered text] - use empty strings '' to inherit title colours
config. CloseBtnText	= '&nbsp;X&nbsp;'	// Close button text (may also be an image tag)
config. CopyContent		= true		// When converting a HTML element to a tooltip, copy only the element's content, rather than converting the element by its own
config. Delay			= 400		// Time span in ms until tooltip shows up
config. Duration		= 0 		// Time span in ms after which the tooltip disappears; 0 for infinite duration, < 0 for delay in ms _after_ the onmouseout until the tooltip disappears
config. FadeIn			= 400 		// Fade-in duration in ms, e.g. 400; 0 for no animation
config. FadeOut			= 400
config. FadeInterval	= 30		// Duration of each fade step in ms (recommended: 30) - shorter is smoother but causes more CPU-load
config. Fix				= null		// Fixated position - x- an y-oordinates in brackets, e.g. [210, 480], or null for no fixation
config. FollowMouse		= true		// false or true - tooltip follows the mouse
config. FontColor		= '#fff'
config. FontFace		= 'Arial, Helvetica, sans-serif'
config. FontSize		= '9pt' 	// E.g. '9pt' or '12px' - unit is mandatory
config. FontWeight		= 'normal'	// 'normal' or 'bold';
config. Height			= 0 		// Tooltip height; 0 for automatic adaption to tooltip content, < 0 (e.g. -100) for a maximum for automatic adaption
config. JumpHorz		= false		// false or true - jump horizontally to other side of mouse if tooltip would extend past clientarea boundary
config. JumpVert		= true		// false or true - jump vertically		"
config. Left			= false 	// false or true - tooltip on the left of the mouse
config. OffsetX			= 0		// Horizontal offset of left-top corner from mousepointer
config. OffsetY			= 20 		// Vertical offset
config. Opacity			= 90		// Integer between 0 and 100 - opacity of tooltip in percent
config. Padding			= 10 		// Spacing between border and content
config. Shadow			= true 	// false or true
config. ShadowColor		= '#C0C0C0'
config. ShadowWidth		= 2
config. Sticky			= false 	// false or true - fixate tip, ie. don't follow the mouse and don't hide on mouseout
config. TextAlign		= 'justify'	// 'left', 'right' or 'justify'
config. Title			= ''		// Default title text applied to all tips (no default title: empty string '')
config. TitleAlign		= 'left'	// 'left' or 'right' - text alignment inside the title bar
config. TitleBgColor	= ''		// If empty string '', BorderColor will be used
config. TitleFontColor	= '#FFFFFF'	// Color of title text - if '', BgColor (of tooltip body) will be used
config. TitleFontFace	= ''		// If '' use FontFace (boldified)
config. TitleFontSize	= ''		// If '' use FontSize
config. Width			= 0 		// Tooltip width; 0 for automatic adaption to tooltip content; < -1 (e.g. -240) for a maximum width for that automatic adaption;
									// -1: tooltip width confined to the width required for the titlebar
//=======  END OF TOOLTIP CONFIG, DO NOT CHANGE ANYTHING BELOW  ==============//




//=====================  PUBLIC  =============================================//
function Tip()
{
	tt_Tip(arguments, null);
}
function TagToTip()
{
	var t2t = tt_GetElt(arguments[0]);
	if(t2t)
		tt_Tip(arguments, t2t);
}
function UnTip()
{
	tt_OpReHref();
	if(tt_aV[DURATION] < 0)
		tt_tDurt.Timer("tt_HideInit()", -tt_aV[DURATION], true);
	else if(!(tt_aV[STICKY] && (tt_iState & 0x2)))
		tt_HideInit();
}

//==================  PUBLIC PLUGIN API	 =====================================//
// Extension eventhandlers currently supported:
// OnLoadConfig, OnCreateContentString, OnSubDivsCreated, OnShow, OnMoveBefore,
// OnMoveAfter, OnHideInit, OnHide, OnKill

var tt_aElt = new Array(10), // Container DIV, outer title & body DIVs, inner title & body TDs, closebutton SPAN, shadow DIVs, and IFRAME to cover windowed elements in IE
tt_aV = new Array(),	// Caches and enumerates config data for currently active tooltip
tt_sContent,			// Inner tooltip text or HTML
tt_scrlX = 0, tt_scrlY = 0,
tt_musX, tt_musY,
tt_over,
tt_x, tt_y, tt_w, tt_h; // Position, width and height of currently displayed tooltip

function tt_Extension()
{
	tt_ExtCmdEnum();
	tt_aExt[tt_aExt.length] = this;
	return this;
}
function tt_SetTipPos(x, y)
{
	var css = tt_aElt[0].style;

	tt_x = x;
	tt_y = y;
	css.left = x + "px";
	css.top = y + "px";
	if(tt_ie56)
	{
		var ifrm = tt_aElt[tt_aElt.length - 1];
		if(ifrm)
		{
			ifrm.style.left = css.left;
			ifrm.style.top = css.top;
		}
	}
}
function tt_HideInit()
{
	if(tt_iState)
	{
		tt_ExtCallFncs(0, "HideInit");
		tt_iState &= ~0x4;
		if(tt_flagOpa && tt_aV[FADEOUT])
		{
			tt_tFade.EndTimer();
			if(tt_opa)
			{
				var n = Math.round(tt_aV[FADEOUT] / (tt_aV[FADEINTERVAL] * (tt_aV[OPACITY] / tt_opa)));
				tt_Fade(tt_opa, tt_opa, 0, n);
				return;
			}
		}
		tt_tHide.Timer("tt_Hide();", 1, false);
	}
}
function tt_Hide()
{
	if(tt_db && tt_iState)
	{
		tt_OpReHref();
		if(tt_iState & 0x2)
		{
			tt_aElt[0].style.visibility = "hidden";
			tt_ExtCallFncs(0, "Hide");
		}
		tt_tShow.EndTimer();
		tt_tHide.EndTimer();
		tt_tDurt.EndTimer();
		tt_tFade.EndTimer();
		if(!tt_op && !tt_ie)
		{
			tt_tWaitMov.EndTimer();
			tt_bWait = false;
		}
		if(tt_aV[CLICKCLOSE] || tt_aV[CLICKSTICKY])
			tt_RemEvtFnc(document, "mouseup", tt_OnLClick);
		tt_ExtCallFncs(0, "Kill");
		// In case of a TagToTip tooltip, hide converted DOM node and
		// re-insert it into document
		if(tt_t2t && !tt_aV[COPYCONTENT])
		{
			tt_t2t.style.display = "none";
			tt_MovDomNode(tt_t2t, tt_aElt[6], tt_t2tDad);
		}
		tt_iState = 0;
		tt_over = null;
		tt_ResetMainDiv();
		if(tt_aElt[tt_aElt.length - 1])
			tt_aElt[tt_aElt.length - 1].style.display = "none";
	}
}
function tt_GetElt(id)
{
	return(document.getElementById ? document.getElementById(id)
			: document.all ? document.all[id]
			: null);
}
function tt_GetDivW(el)
{
	return(el ? (el.offsetWidth || el.style.pixelWidth || 0) : 0);
}
function tt_GetDivH(el)
{
	return(el ? (el.offsetHeight || el.style.pixelHeight || 0) : 0);
}
function tt_GetScrollX()
{
	return(window.pageXOffset || (tt_db ? (tt_db.scrollLeft || 0) : 0));
}
function tt_GetScrollY()
{
	return(window.pageYOffset || (tt_db ? (tt_db.scrollTop || 0) : 0));
}
function tt_GetClientW()
{
	return(document.body && (typeof(document.body.clientWidth) != tt_u) ? document.body.clientWidth
			: (typeof(window.innerWidth) != tt_u) ? window.innerWidth
			: tt_db ? (tt_db.clientWidth || 0)
			: 0);
}
function tt_GetClientH()
{
	// Exactly this order seems to yield correct values in all major browsers
	return(document.body && (typeof(document.body.clientHeight) != tt_u) ? document.body.clientHeight
			: (typeof(window.innerHeight) != tt_u) ? window.innerHeight
			: tt_db ? (tt_db.clientHeight || 0)
			: 0);
}
function tt_GetEvtX(e)
{
	return (e ? ((typeof(e.pageX) != tt_u) ? e.pageX : (e.clientX + tt_scrlX)) : 0);
}
function tt_GetEvtY(e)
{
	return (e ? ((typeof(e.pageY) != tt_u) ? e.pageY : (e.clientY + tt_scrlY)) : 0);
}
function tt_AddEvtFnc(el, sEvt, PFnc)
{
	if(el)
	{
		if(el.addEventListener)
			el.addEventListener(sEvt, PFnc, false);
		else
			el.attachEvent("on" + sEvt, PFnc);
	}
}
function tt_RemEvtFnc(el, sEvt, PFnc)
{
	if(el)
	{
		if(el.removeEventListener)
			el.removeEventListener(sEvt, PFnc, false);
		else
			el.detachEvent("on" + sEvt, PFnc);
	}
}

//======================  PRIVATE  ===========================================//
var tt_aExt = new Array(),	// Array of extension objects

tt_db, tt_op, tt_ie, tt_ie56, tt_bBoxOld,	// Browser flags
tt_body,
tt_ovr_,				// HTML element the mouse is currently over
tt_flagOpa, 			// Opacity support: 1=IE, 2=Khtml, 3=KHTML, 4=Moz, 5=W3C
tt_maxPosX, tt_maxPosY,
tt_iState = 0,			// Tooltip active |= 1, shown |= 2, move with mouse |= 4
tt_opa, 				// Currently applied opacity
tt_bJmpVert, tt_bJmpHorz,// Tip temporarily on other side of mouse
tt_t2t, tt_t2tDad,		// Tag converted to tip, and its parent element in the document
tt_elDeHref,			// The tag from which we've removed the href attribute
// Timer
tt_tShow = new Number(0), tt_tHide = new Number(0), tt_tDurt = new Number(0),
tt_tFade = new Number(0), tt_tWaitMov = new Number(0),
tt_bWait = false,
tt_u = "undefined";


function tt_Init()
{
	tt_MkCmdEnum();
	// Send old browsers instantly to hell
	if(!tt_Browser() || !tt_MkMainDiv())
		return;
	tt_IsW3cBox();
	tt_OpaSupport();
	tt_AddEvtFnc(window, "scroll", tt_OnScrl);
	// IE doesn't fire onscroll event when switching to fullscreen;
	// fix suggested by Yoav Karpeles 14.2.2008
	tt_AddEvtFnc(window, "resize", tt_OnScrl);
	tt_AddEvtFnc(document, "mousemove", tt_Move);
	// In Debug mode we search for TagToTip() calls in order to notify
	// the user if they've forgotten to set the TagsToTip config flag
	if(TagsToTip || tt_Debug)
		tt_SetOnloadFnc();
	// Ensure the tip be hidden when the page unloads
	tt_AddEvtFnc(window, "unload", tt_Hide);
}
// Creates command names by translating config variable names to upper case
function tt_MkCmdEnum()
{
	var n = 0;
	for(var i in config)
		eval("window." + i.toString().toUpperCase() + " = " + n++);
	tt_aV.length = n;
}
function tt_Browser()
{
	var n, nv, n6, w3c;

	n = navigator.userAgent.toLowerCase(),
	nv = navigator.appVersion;
	tt_op = (document.defaultView && typeof(eval("w" + "indow" + "." + "o" + "p" + "er" + "a")) != tt_u);
	tt_ie = n.indexOf("msie") != -1 && document.all && !tt_op;
	if(tt_ie)
	{
		var ieOld = (!document.compatMode || document.compatMode == "BackCompat");
		tt_db = !ieOld ? document.documentElement : (document.body || null);
		if(tt_db)
			tt_ie56 = parseFloat(nv.substring(nv.indexOf("MSIE") + 5)) >= 5.5
					&& typeof document.body.style.maxHeight == tt_u;
	}
	else
	{
		tt_db = document.documentElement || document.body ||
				(document.getElementsByTagName ? document.getElementsByTagName("body")[0]
				: null);
		if(!tt_op)
		{
			n6 = document.defaultView && typeof document.defaultView.getComputedStyle != tt_u;
			w3c = !n6 && document.getElementById;
		}
	}
	tt_body = (document.getElementsByTagName ? document.getElementsByTagName("body")[0]
				: (document.body || null));
	if(tt_ie || n6 || tt_op || w3c)
	{
		if(tt_body && tt_db)
		{
			if(document.attachEvent || document.addEventListener)
				return true;
		}
		else
			tt_Err("wz_tooltip.js must be included INSIDE the body section,"
					+ " immediately after the opening <body> tag.", false);
	}
	tt_db = null;
	return false;
}
function tt_MkMainDiv()
{
	// Create the tooltip DIV
	if(tt_body.insertAdjacentHTML)
		tt_body.insertAdjacentHTML("afterBegin", tt_MkMainDivHtm());
	else if(typeof tt_body.innerHTML != tt_u && document.createElement && tt_body.appendChild)
		tt_body.appendChild(tt_MkMainDivDom());
	if(window.tt_GetMainDivRefs /* FireFox Alzheimer */ && tt_GetMainDivRefs())
		return true;
	tt_db = null;
	return false;
}
function tt_MkMainDivHtm()
{
	return('<div id="WzTtDiV"></div>' +
			(tt_ie56 ? ('<iframe id="WzTtIfRm" src="javascript:false" scrolling="no" frameborder="0" style="filter:Alpha(opacity=0);position:absolute;top:0px;left:0px;display:none;"></iframe>')
			: ''));
}
function tt_MkMainDivDom()
{
	var el = document.createElement("div");
	if(el)
		el.id = "WzTtDiV";
	return el;
}
function tt_GetMainDivRefs()
{
	tt_aElt[0] = tt_GetElt("WzTtDiV");
	if(tt_ie56 && tt_aElt[0])
	{
		tt_aElt[tt_aElt.length - 1] = tt_GetElt("WzTtIfRm");
		if(!tt_aElt[tt_aElt.length - 1])
			tt_aElt[0] = null;
	}
	if(tt_aElt[0])
	{
		var css = tt_aElt[0].style;

		css.visibility = "hidden";
		css.position = "absolute";
		css.overflow = "hidden";
		return true;
	}
	return false;
}
function tt_ResetMainDiv()
{
	var w = (window.screen && screen.width) ? screen.width : 10000;

	tt_SetTipPos(-w, 0);
	tt_aElt[0].innerHTML = "";
	tt_aElt[0].style.width = (w - 1) + "px";
	tt_h = 0;
}
function tt_IsW3cBox()
{
	var css = tt_aElt[0].style;

	css.padding = "10px";
	css.width = "40px";
	tt_bBoxOld = (tt_GetDivW(tt_aElt[0]) == 40);
	css.padding = "0px";
	tt_ResetMainDiv();
}
function tt_OpaSupport()
{
	var css = tt_body.style;

	tt_flagOpa = (typeof(css.filter) != tt_u) ? 1
				: (typeof(css.KhtmlOpacity) != tt_u) ? 2
				: (typeof(css.KHTMLOpacity) != tt_u) ? 3
				: (typeof(css.MozOpacity) != tt_u) ? 4
				: (typeof(css.opacity) != tt_u) ? 5
				: 0;
}
// Ported from http://dean.edwards.name/weblog/2006/06/again/
// (Dean Edwards et al.)
function tt_SetOnloadFnc()
{
	tt_AddEvtFnc(document, "DOMContentLoaded", tt_HideSrcTags);
	tt_AddEvtFnc(window, "load", tt_HideSrcTags);
	if(tt_body.attachEvent)
		tt_body.attachEvent("onreadystatechange",
			function() {
				if(tt_body.readyState == "complete")
					tt_HideSrcTags();
			} );
	if(/WebKit|KHTML/i.test(navigator.userAgent))
	{
		var t = setInterval(function() {
					if(/loaded|complete/.test(document.readyState))
					{
						clearInterval(t);
						tt_HideSrcTags();
					}
				}, 10);
	}
}
function tt_HideSrcTags()
{
	if(!window.tt_HideSrcTags || window.tt_HideSrcTags.done)
		return;
	window.tt_HideSrcTags.done = true;
	if(!tt_HideSrcTagsRecurs(tt_body))
		tt_Err("There are HTML elements to be converted to tooltips.\nIf you"
				+ " want these HTML elements to be automatically hidden, you"
				+ " must edit wz_tooltip.js, and set TagsToTip in the global"
				+ " tooltip configuration to true.", true);
}
function tt_HideSrcTagsRecurs(dad)
{
	var ovr, asT2t;
	// Walk the DOM tree for tags that have an onmouseover or onclick attribute
	// containing a TagToTip('...') call.
	// (.childNodes first since .children is bugous in Safari)
	var a = dad.childNodes || dad.children || null;

	for(var i = a ? a.length : 0; i;)
	{--i;
		if(!tt_HideSrcTagsRecurs(a[i]))
			return false;
		ovr = a[i].getAttribute ? (a[i].getAttribute("onmouseover") || a[i].getAttribute("onclick"))
				: (typeof a[i].onmouseover == "function") ? (a[i].onmouseover || a[i].onclick)
				: null;
		if(ovr)
		{
			asT2t = ovr.toString().match(/TagToTip\s*\(\s*'[^'.]+'\s*[\),]/);
			if(asT2t && asT2t.length)
			{
				if(!tt_HideSrcTag(asT2t[0]))
					return false;
			}
		}
	}
	return true;
}
function tt_HideSrcTag(sT2t)
{
	var id, el;

	// The ID passed to the found TagToTip() call identifies an HTML element
	// to be converted to a tooltip, so hide that element
	id = sT2t.replace(/.+'([^'.]+)'.+/, "$1");
	el = tt_GetElt(id);
	if(el)
	{
		if(tt_Debug && !TagsToTip)
			return false;
		else
			el.style.display = "none";
	}
	else
		tt_Err("Invalid ID\n'" + id + "'\npassed to TagToTip()."
				+ " There exists no HTML element with that ID.", true);
	return true;
}
function tt_Tip(arg, t2t)
{
	if(!tt_db)
		return;
	if(tt_iState)
		tt_Hide();
	if(!tt_Enabled)
		return;
	tt_t2t = t2t;
	if(!tt_ReadCmds(arg))
		return;
	tt_iState = 0x1 | 0x4;
	tt_AdaptConfig1();
	tt_MkTipContent(arg);
	tt_MkTipSubDivs();
	tt_FormatTip();
	tt_bJmpVert = false;
	tt_bJmpHorz = false;
	tt_maxPosX = tt_GetClientW() + tt_scrlX - tt_w - 1;
	tt_maxPosY = tt_GetClientH() + tt_scrlY - tt_h - 1;
	tt_AdaptConfig2();
	// Ensure the tip be shown and positioned before the first onmousemove
	tt_OverInit();
	tt_ShowInit();
	tt_Move();
}
function tt_ReadCmds(a)
{
	var i;

	// First load the global config values, to initialize also values
	// for which no command is passed
	i = 0;
	for(var j in config)
		tt_aV[i++] = config[j];
	// Then replace each cached config value for which a command is
	// passed (ensure the # of command args plus value args be even)
	if(a.length & 1)
	{
		for(i = a.length - 1; i > 0; i -= 2)
			tt_aV[a[i - 1]] = a[i];
		return true;
	}
	tt_Err("Incorrect call of Tip() or TagToTip().\n"
			+ "Each command must be followed by a value.", true);
	return false;
}
function tt_AdaptConfig1()
{
	tt_ExtCallFncs(0, "LoadConfig");
	// Inherit unspecified title formattings from body
	if(!tt_aV[TITLEBGCOLOR].length)
		tt_aV[TITLEBGCOLOR] = tt_aV[BORDERCOLOR];
	if(!tt_aV[TITLEFONTCOLOR].length)
		tt_aV[TITLEFONTCOLOR] = tt_aV[BGCOLOR];
	if(!tt_aV[TITLEFONTFACE].length)
		tt_aV[TITLEFONTFACE] = tt_aV[FONTFACE];
	if(!tt_aV[TITLEFONTSIZE].length)
		tt_aV[TITLEFONTSIZE] = tt_aV[FONTSIZE];
	if(tt_aV[CLOSEBTN])
	{
		// Use title colours for non-specified closebutton colours
		if(!tt_aV[CLOSEBTNCOLORS])
			tt_aV[CLOSEBTNCOLORS] = new Array("", "", "", "");
		for(var i = 4; i;)
		{--i;
			if(!tt_aV[CLOSEBTNCOLORS][i].length)
				tt_aV[CLOSEBTNCOLORS][i] = (i & 1) ? tt_aV[TITLEFONTCOLOR] : tt_aV[TITLEBGCOLOR];
		}
		// Enforce titlebar be shown
		if(!tt_aV[TITLE].length)
			tt_aV[TITLE] = " ";
	}
	// Circumvents broken display of images and fade-in flicker in Geckos < 1.8
	if(tt_aV[OPACITY] == 100 && typeof tt_aElt[0].style.MozOpacity != tt_u && !Array.every)
		tt_aV[OPACITY] = 99;
	// Smartly shorten the delay for fade-in tooltips
	if(tt_aV[FADEIN] && tt_flagOpa && tt_aV[DELAY] > 100)
		tt_aV[DELAY] = Math.max(tt_aV[DELAY] - tt_aV[FADEIN], 100);
}
function tt_AdaptConfig2()
{
	if(tt_aV[CENTERMOUSE])
	{
		tt_aV[OFFSETX] -= ((tt_w - (tt_aV[SHADOW] ? tt_aV[SHADOWWIDTH] : 0)) >> 1);
		tt_aV[JUMPHORZ] = false;
	}
}
// Expose content globally so extensions can modify it
function tt_MkTipContent(a)
{
	if(tt_t2t)
	{
		if(tt_aV[COPYCONTENT])
			tt_sContent = tt_t2t.innerHTML;
		else
			tt_sContent = "";
	}
	else
		tt_sContent = a[0];
	tt_ExtCallFncs(0, "CreateContentString");
}
function tt_MkTipSubDivs()
{
	var sCss = 'position:relative;margin:0px;padding:0px;border-width:0px;left:0px;top:0px;line-height:normal;width:auto;',
	sTbTrTd = ' cellspacing="0" cellpadding="0" border="0" style="' + sCss + '"><tbody style="' + sCss + '"><tr><td ';

	tt_aElt[0].innerHTML =
		(''
		+ (tt_aV[TITLE].length ?
			('<div id="WzTiTl" style="position:relative;z-index:1;">'
			+ '<table id="WzTiTlTb"' + sTbTrTd + 'id="WzTiTlI" style="' + sCss + '">'
			+ tt_aV[TITLE]
			+ '</td>'
			+ (tt_aV[CLOSEBTN] ?
				('<td align="right" style="' + sCss
				+ 'text-align:right;">'
				+ '<span id="WzClOsE" style="padding-left:2px;padding-right:2px;'
				+ 'cursor:' + (tt_ie ? 'hand' : 'pointer')
				+ ';" onmouseover="tt_OnCloseBtnOver(1)" onmouseout="tt_OnCloseBtnOver(0)" onclick="tt_HideInit()">'
				+ tt_aV[CLOSEBTNTEXT]
				+ '</span></td>')
				: '')
			+ '</tr></tbody></table></div>')
			: '')
		+ '<div id="WzBoDy" style="position:relative;z-index:0;">'
		+ '<table' + sTbTrTd + 'id="WzBoDyI" style="' + sCss + '">'
		+ tt_sContent
		+ '</td></tr></tbody></table></div>'
		+ (tt_aV[SHADOW]
			? ('<div id="WzTtShDwR" style="position:absolute;overflow:hidden;"></div>'
				+ '<div id="WzTtShDwB" style="position:relative;overflow:hidden;"></div>')
			: '')
		);
	tt_GetSubDivRefs();
	// Convert DOM node to tip
	if(tt_t2t && !tt_aV[COPYCONTENT])
	{
		// Store the tag's parent element so we can restore that DOM branch
		// once the tooltip is hidden
		tt_t2tDad = tt_t2t.parentNode || tt_t2t.parentElement || tt_t2t.offsetParent || null;
		if(tt_t2tDad)
		{
			tt_MovDomNode(tt_t2t, tt_t2tDad, tt_aElt[6]);
			tt_t2t.style.display = "block";
		}
	}
	tt_ExtCallFncs(0, "SubDivsCreated");
}
function tt_GetSubDivRefs()
{
	var aId = new Array("WzTiTl", "WzTiTlTb", "WzTiTlI", "WzClOsE", "WzBoDy", "WzBoDyI", "WzTtShDwB", "WzTtShDwR");

	for(var i = aId.length; i; --i)
		tt_aElt[i] = tt_GetElt(aId[i - 1]);
}
function tt_FormatTip()
{
	var css, w, h, iOffY, iOffSh,
	iAdd = (tt_aV[PADDING] + tt_aV[BORDERWIDTH]) << 1;
	
	//--------- Title DIV ----------
	if(tt_aV[TITLE].length)
	{
		css = tt_aElt[1].style;
		css.background = tt_aV[TITLEBGCOLOR];
		css.paddingTop = (tt_aV[CLOSEBTN] ? 2 : 0) + "px";
		css.paddingBottom = "1px";
		css.paddingLeft = css.paddingRight = tt_aV[PADDING] + "px";
		css = tt_aElt[3].style;
		css.color = tt_aV[TITLEFONTCOLOR];
		if (tt_aV[WIDTH] == -1)
			css.whiteSpace = "nowrap";
		css.fontFamily = tt_aV[TITLEFONTFACE];
		css.fontSize = tt_aV[TITLEFONTSIZE];
		css.fontWeight = "bold";
		css.textAlign = tt_aV[TITLEALIGN];
		// Close button DIV
		if(tt_aElt[4])
		{
			css.paddingRight = (tt_aV[PADDING] << 1) + "px";
			css = tt_aElt[4].style;
			css.background = tt_aV[CLOSEBTNCOLORS][0];
			css.color = tt_aV[CLOSEBTNCOLORS][1];
			css.fontFamily = tt_aV[TITLEFONTFACE];
			css.fontSize = tt_aV[TITLEFONTSIZE];
			css.fontWeight = "bold";
		}
		if(tt_aV[WIDTH] > 0)
			tt_w = tt_aV[WIDTH];
		else
		{
			tt_w = tt_GetDivW(tt_aElt[3]) + tt_GetDivW(tt_aElt[4]);
			// Some spacing between title DIV and closebutton
			if(tt_aElt[4])
				tt_w += tt_aV[PADDING];
			// Restrict auto width to max width
			if(tt_aV[WIDTH] < -1 && tt_w > -tt_aV[WIDTH])
				tt_w = -tt_aV[WIDTH];
		}
		// Ensure the top border of the body DIV be covered by the title DIV
		iOffY = -tt_aV[BORDERWIDTH];
	}
	else
	{
		tt_w = 0;
		iOffY = 0;
	}

	//-------- Body DIV ------------
	css = tt_aElt[5].style;
	css.top = iOffY + "px";
	if(tt_aV[BORDERWIDTH])
	{
		css.borderColor = tt_aV[BORDERCOLOR];
		css.borderStyle = tt_aV[BORDERSTYLE];
		css.borderWidth = tt_aV[BORDERWIDTH] + "px";
	}
	if(tt_aV[BGCOLOR].length)
		css.background = tt_aV[BGCOLOR];
	if(tt_aV[BGIMG].length)
		css.backgroundImage = "url(" + tt_aV[BGIMG] + ")";
	css.padding = tt_aV[PADDING] + "px";
	css.textAlign = tt_aV[TEXTALIGN];
	if(tt_aV[HEIGHT])
	{
		css.overflow = "auto";
		if(tt_aV[HEIGHT] > 0)
			css.height = (tt_aV[HEIGHT] + iAdd) + "px";
		else
			tt_h = iAdd - tt_aV[HEIGHT];
	}
	// TD inside body DIV
	css = tt_aElt[6].style;
	css.color = tt_aV[FONTCOLOR];
	css.fontFamily = tt_aV[FONTFACE];
	css.fontSize = tt_aV[FONTSIZE];
	css.fontWeight = tt_aV[FONTWEIGHT];
	css.background = "";
	css.textAlign = tt_aV[TEXTALIGN];
	if(tt_aV[WIDTH] > 0)
		w = tt_aV[WIDTH];
	// Width like title (if existent)
	else if(tt_aV[WIDTH] == -1 && tt_w)
		w = tt_w;
	else
	{
		// Measure width of the body's inner TD, as some browsers would expand
		// the container and outer body DIV to 100%
		w = tt_GetDivW(tt_aElt[6]);
		// Restrict auto width to max width
		if(tt_aV[WIDTH] < -1 && w > -tt_aV[WIDTH])
			w = -tt_aV[WIDTH];
	}
	if(w > tt_w)
		tt_w = w;
	tt_w += iAdd;

	//--------- Shadow DIVs ------------
	if(tt_aV[SHADOW])
	{
		tt_w += tt_aV[SHADOWWIDTH];
		iOffSh = Math.floor((tt_aV[SHADOWWIDTH] * 4) / 3);
		// Bottom shadow
		css = tt_aElt[7].style;
		css.top = iOffY + "px";
		css.left = iOffSh + "px";
		css.width = (tt_w - iOffSh - tt_aV[SHADOWWIDTH]) + "px";
		css.height = tt_aV[SHADOWWIDTH] + "px";
		css.background = tt_aV[SHADOWCOLOR];
		// Right shadow
		css = tt_aElt[8].style;
		css.top = iOffSh + "px";
		css.left = (tt_w - tt_aV[SHADOWWIDTH]) + "px";
		css.width = tt_aV[SHADOWWIDTH] + "px";
		css.background = tt_aV[SHADOWCOLOR];
	}
	else
		iOffSh = 0;

	//-------- Container DIV -------
	tt_SetTipOpa(tt_aV[FADEIN] ? 0 : tt_aV[OPACITY]);
	tt_FixSize(iOffY, iOffSh);
}
// Fixate the size so it can't dynamically change while the tooltip is moving.
function tt_FixSize(iOffY, iOffSh)
{
	var wIn, wOut, h, add, i;

	tt_aElt[0].style.width = tt_w + "px";
	tt_aElt[0].style.pixelWidth = tt_w;
	wOut = tt_w - ((tt_aV[SHADOW]) ? tt_aV[SHADOWWIDTH] : 0);
	// Body
	wIn = wOut;
	if(!tt_bBoxOld)
		wIn -= (tt_aV[PADDING] + tt_aV[BORDERWIDTH]) << 1;
	tt_aElt[5].style.width = wIn + "px";
	// Title
	if(tt_aElt[1])
	{
		wIn = wOut - (tt_aV[PADDING] << 1);
		if(!tt_bBoxOld)
			wOut = wIn;
		tt_aElt[1].style.width = wOut + "px";
		tt_aElt[2].style.width = wIn + "px";
	}
	// Max height specified
	if(tt_h)
	{
		h = tt_GetDivH(tt_aElt[5]);
		if(h > tt_h)
		{
			if(!tt_bBoxOld)
				tt_h -= (tt_aV[PADDING] + tt_aV[BORDERWIDTH]) << 1;
			tt_aElt[5].style.height = tt_h + "px";
		}
	}
	tt_h = tt_GetDivH(tt_aElt[0]) + iOffY;
	// Right shadow
	if(tt_aElt[8])
		tt_aElt[8].style.height = (tt_h - iOffSh) + "px";
	i = tt_aElt.length - 1;
	if(tt_aElt[i])
	{
		tt_aElt[i].style.width = tt_w + "px";
		tt_aElt[i].style.height = tt_h + "px";
	}
}
function tt_DeAlt(el)
{
	var aKid;

	if(el)
	{
		if(el.alt)
			el.alt = "";
		if(el.title)
			el.title = "";
		aKid = el.childNodes || el.children || null;
		if(aKid)
		{
			for(var i = aKid.length; i;)
				tt_DeAlt(aKid[--i]);
		}
	}
}
// This hack removes the native tooltips over links in Opera
function tt_OpDeHref(el)
{
	if(!tt_op)
		return;
	if(tt_elDeHref)
		tt_OpReHref();
	while(el)
	{
		if(el.hasAttribute("href"))
		{
			el.t_href = el.getAttribute("href");
			el.t_stats = window.status;
			el.removeAttribute("href");
			el.style.cursor = "hand";
			tt_AddEvtFnc(el, "mousedown", tt_OpReHref);
			window.status = el.t_href;
			tt_elDeHref = el;
			break;
		}
		el = el.parentElement;
	}
}
function tt_OpReHref()
{
	if(tt_elDeHref)
	{
		tt_elDeHref.setAttribute("href", tt_elDeHref.t_href);
		tt_RemEvtFnc(tt_elDeHref, "mousedown", tt_OpReHref);
		window.status = tt_elDeHref.t_stats;
		tt_elDeHref = null;
	}
}
function tt_OverInit()
{
	if(window.event)
		tt_over = window.event.target || window.event.srcElement;
	else
		tt_over = tt_ovr_;
	tt_DeAlt(tt_over);
	tt_OpDeHref(tt_over);
}
function tt_ShowInit()
{
	tt_tShow.Timer("tt_Show()", tt_aV[DELAY], true);
	if(tt_aV[CLICKCLOSE] || tt_aV[CLICKSTICKY])
		tt_AddEvtFnc(document, "mouseup", tt_OnLClick);
}
function tt_Show()
{
	var css = tt_aElt[0].style;

	// Override the z-index of the topmost wz_dragdrop.js D&D item
	css.zIndex = Math.max((window.dd && dd.z) ? (dd.z + 2) : 0, 1010);
	if(tt_aV[STICKY] || !tt_aV[FOLLOWMOUSE])
		tt_iState &= ~0x4;
	if(tt_aV[DURATION] > 0)
		tt_tDurt.Timer("tt_HideInit()", tt_aV[DURATION], true);
	tt_ExtCallFncs(0, "Show")
	css.visibility = "visible";
	tt_iState |= 0x2;
	if(tt_aV[FADEIN])
		tt_Fade(0, 0, tt_aV[OPACITY], Math.round(tt_aV[FADEIN] / tt_aV[FADEINTERVAL]));
	tt_ShowIfrm();
}
function tt_ShowIfrm()
{
	if(tt_ie56)
	{
		var ifrm = tt_aElt[tt_aElt.length - 1];
		if(ifrm)
		{
			var css = ifrm.style;
			css.zIndex = tt_aElt[0].style.zIndex - 1;
			css.display = "block";
		}
	}
}
function tt_Move(e)
{
	if(e)
		tt_ovr_ = e.target || e.srcElement;
	e = e || window.event;
	if(e)
	{
		tt_musX = tt_GetEvtX(e);
		tt_musY = tt_GetEvtY(e);
	}
	if(tt_iState & 0x04)
	{
		// Prevent jam of mousemove events
		if(!tt_op && !tt_ie)
		{
			if(tt_bWait)
				return;
			tt_bWait = true;
			tt_tWaitMov.Timer("tt_bWait = false;", 1, true);
		}
		if(tt_aV[FIX])
		{
			var iY = tt_aV[FIX][1];
			// For a fixed tip to be positioned above the mouse, use the
			// bottom edge as anchor
			// (recommended by Christophe Rebeschini, 31.1.2008)
			if(tt_aV[ABOVE])
				iY -= tt_h;
			tt_iState &= ~0x4;
			tt_SetTipPos(tt_aV[FIX][0], tt_aV[FIX][1]);
		}
		else if(!tt_ExtCallFncs(e, "MoveBefore"))
			tt_SetTipPos(tt_Pos(0), tt_Pos(1));
		tt_ExtCallFncs([tt_musX, tt_musY], "MoveAfter")
	}
}
function tt_Pos(iDim)
{
	var iX, bJmpMode, cmdAlt, cmdOff, cx, iMax, iScrl, iMus, bJmp;

	// Map values according to dimension to calculate
	if(iDim)
	{
		bJmpMode = tt_aV[JUMPVERT];
		cmdAlt = ABOVE;
		cmdOff = OFFSETY;
		cx = tt_h;
		iMax = tt_maxPosY;
		iScrl = tt_scrlY;
		iMus = tt_musY;
		bJmp = tt_bJmpVert;
	}
	else
	{
		bJmpMode = tt_aV[JUMPHORZ];
		cmdAlt = LEFT;
		cmdOff = OFFSETX;
		cx = tt_w;
		iMax = tt_maxPosX;
		iScrl = tt_scrlX;
		iMus = tt_musX;
		bJmp = tt_bJmpHorz;
	}
	if(bJmpMode)
	{
		if(tt_aV[cmdAlt] && (!bJmp || tt_CalcPosAlt(iDim) >= iScrl + 16))
			iX = tt_PosAlt(iDim);
		else if(!tt_aV[cmdAlt] && bJmp && tt_CalcPosDef(iDim) > iMax - 16)
			iX = tt_PosAlt(iDim);
		else
			iX = tt_PosDef(iDim);
	}
	else
	{
		iX = iMus;
		if(tt_aV[cmdAlt])
			iX -= cx + tt_aV[cmdOff] - (tt_aV[SHADOW] ? tt_aV[SHADOWWIDTH] : 0);
		else
			iX += tt_aV[cmdOff];
	}
	// Prevent tip from extending past clientarea boundary
	if(iX > iMax)
		iX = bJmpMode ? tt_PosAlt(iDim) : iMax;
	// In case of insufficient space on both sides, ensure the left/upper part
	// of the tip be visible
	if(iX < iScrl)
		iX = bJmpMode ? tt_PosDef(iDim) : iScrl;
	return iX;
}
function tt_PosDef(iDim)
{
	if(iDim)
		tt_bJmpVert = tt_aV[ABOVE];
	else
		tt_bJmpHorz = tt_aV[LEFT];
	return tt_CalcPosDef(iDim);
}
function tt_PosAlt(iDim)
{
	if(iDim)
		tt_bJmpVert = !tt_aV[ABOVE];
	else
		tt_bJmpHorz = !tt_aV[LEFT];
	return tt_CalcPosAlt(iDim);
}
function tt_CalcPosDef(iDim)
{
	return iDim ? (tt_musY + tt_aV[OFFSETY]) : (tt_musX + tt_aV[OFFSETX]);
}
function tt_CalcPosAlt(iDim)
{
	var cmdOff = iDim ? OFFSETY : OFFSETX;
	var dx = tt_aV[cmdOff] - (tt_aV[SHADOW] ? tt_aV[SHADOWWIDTH] : 0);
	if(tt_aV[cmdOff] > 0 && dx <= 0)
		dx = 1;
	return((iDim ? (tt_musY - tt_h) : (tt_musX - tt_w)) - dx);
}
function tt_Fade(a, now, z, n)
{
	if(n)
	{
		now += Math.round((z - now) / n);
		if((z > a) ? (now >= z) : (now <= z))
			now = z;
		else
			tt_tFade.Timer("tt_Fade("
							+ a + "," + now + "," + z + "," + (n - 1)
							+ ")",
							tt_aV[FADEINTERVAL],
							true);
	}
	now ? tt_SetTipOpa(now) : tt_Hide();
}
function tt_SetTipOpa(opa)
{
	// To circumvent the opacity nesting flaws of IE, we set the opacity
	// for each sub-DIV separately, rather than for the container DIV.
	tt_SetOpa(tt_aElt[5], opa);
	if(tt_aElt[1])
		tt_SetOpa(tt_aElt[1], opa);
	if(tt_aV[SHADOW])
	{
		opa = Math.round(opa * 0.8);
		tt_SetOpa(tt_aElt[7], opa);
		tt_SetOpa(tt_aElt[8], opa);
	}
}
function tt_OnScrl()
{
	tt_scrlX = tt_GetScrollX();
	tt_scrlY = tt_GetScrollY();
}
function tt_OnCloseBtnOver(iOver)
{
	var css = tt_aElt[4].style;

	iOver <<= 1;
	css.background = tt_aV[CLOSEBTNCOLORS][iOver];
	css.color = tt_aV[CLOSEBTNCOLORS][iOver + 1];
}
function tt_OnLClick(e)
{
	//  Ignore right-clicks
	e = e || window.event;
	if(!((e.button && e.button & 2) || (e.which && e.which == 3)))
	{
		if(tt_aV[CLICKSTICKY] && (tt_iState & 0x4))
		{
			tt_aV[STICKY] = true;
			tt_iState &= ~0x4;
		}
		else if(tt_aV[CLICKCLOSE])
			tt_HideInit();
	}
}
function tt_Int(x)
{
	var y;

	return(isNaN(y = parseInt(x)) ? 0 : y);
}
Number.prototype.Timer = function(s, iT, bUrge)
{
	if(!this.value || bUrge)
		this.value = window.setTimeout(s, iT);
}
Number.prototype.EndTimer = function()
{
	if(this.value)
	{
		window.clearTimeout(this.value);
		this.value = 0;
	}
}
function tt_SetOpa(el, opa)
{
	var css = el.style;

	tt_opa = opa;
	if(tt_flagOpa == 1)
	{
		if(opa < 100)
		{
			// Hacks for bugs of IE:
			// 1.) Once a CSS filter has been applied, fonts are no longer
			// anti-aliased, so we store the previous 'non-filter' to be
			// able to restore it
			if(typeof(el.filtNo) == tt_u)
				el.filtNo = css.filter;
			// 2.) A DIV cannot be made visible in a single step if an
			// opacity < 100 has been applied while the DIV was hidden
			var bVis = css.visibility != "hidden";
			// 3.) In IE6, applying an opacity < 100 has no effect if the
			//	   element has no layout (position, size, zoom, ...)
			css.zoom = "100%";
			if(!bVis)
				css.visibility = "visible";
			css.filter = "alpha(opacity=" + opa + ")";
			if(!bVis)
				css.visibility = "hidden";
		}
		else if(typeof(el.filtNo) != tt_u)
			// Restore 'non-filter'
			css.filter = el.filtNo;
	}
	else
	{
		opa /= 100.0;
		switch(tt_flagOpa)
		{
		case 2:
			css.KhtmlOpacity = opa; break;
		case 3:
			css.KHTMLOpacity = opa; break;
		case 4:
			css.MozOpacity = opa; break;
		case 5:
			css.opacity = opa; break;
		}
	}
}
function tt_MovDomNode(el, dadFrom, dadTo)
{
	if(dadFrom)
		dadFrom.removeChild(el);
	if(dadTo)
		dadTo.appendChild(el);
}
function tt_Err(sErr, bIfDebug)
{
	if(tt_Debug || !bIfDebug)
		alert("Tooltip Script Error Message:\n\n" + sErr);
}

//============  EXTENSION (PLUGIN) MANAGER  ===============//
function tt_ExtCmdEnum()
{
	var s;

	// Add new command(s) to the commands enum
	for(var i in config)
	{
		s = "window." + i.toString().toUpperCase();
		if(eval("typeof(" + s + ") == tt_u"))
		{
			eval(s + " = " + tt_aV.length);
			tt_aV[tt_aV.length] = null;
		}
	}
}
function tt_ExtCallFncs(arg, sFnc)
{
	var b = false;
	for(var i = tt_aExt.length; i;)
	{--i;
		var fnc = tt_aExt[i]["On" + sFnc];
		// Call the method the extension has defined for this event
		if(fnc && fnc(arg))
			b = true;
	}
	return b;
}

tt_Init();

</script>

<div id="tudo">
    <div id="container">
    	<a href="javascript:AbrePop('requisitos_pop');" onMouseOver="Tip('<b>Requisitos de sistema</b>');" onMouseOut="UnTip()"><div id="requisitos_bt" tabindex="2">requisitos</div></a>
    	<div id="requisitos_pop"><a href="javascript:FechaPop('requisitos_pop')"><div id="bt_fechar">fechar</div></a>
       	  <div id="requisitos_box" class="requisitos_topTit">
          	<div id="reqTitulo">Sistemas operacionais suportados</div>
          </div>
          <a href="javascript:(); "onmouseover="Tip('<b>Microsoft Windows</b><br>Windows 8 (64-bit)<br>Windows 8 (32-bit)<br>Windows 7 (64-bit)<br>Windows 7 (32-bit)<br>Windows Vista (64-bit)<br>Windows Vista (32-bit)<br>Windows XP (32-bit)');" onMouseOut="UnTip()"><div id="requisitos_box" class="requisitos_topTit"></div></a>
          <a href="javascript:(); "onmouseover="Tip('<b>Apple Mac OS</b><br>Mac OSX 10.8<br>Mac OSX 10.7 <b>Lion</b><br>Mac OSX 10.6 <b>Snow Leopard</b>');" onMouseOut="UnTip()"><div id="requisitos_box" class="requisitos_topTit"></div></a>
          <div id="requisitos_box" class="requisitos_topTit">
          	<div id="reqTitulo">Navegadores suportados</div>
          </div>  
          <div id="requisitos_box" class="requisitos_topTit">
          	<p align="center">
            	<a href="http://www.microsoft.com/brasil/windows/internet-explorer/" target="_blank" class="link_alt" onMouseOver="Tip('<b>Internet Explorer</b><br>a partir da vers&atilde;o 8<br>sem habilitar o modo <br>de compatibilidade');" onMouseOut="UnTip()"><img src="https://insper.blackboard.com/login/ico_ie.png" alt="Internet Explorer" width="50" height="72"></a>
                <a href="http://www.google.com/chrome" target="_blank" class="link_alt" onMouseOver="Tip('&lt;b&gt;Google Chrome');" onMouseOut="UnTip()"><img src="https://insper.blackboard.com/login/ico_chrome.png" alt="Chrome" width="50" height="72"></a>
                <a href="http://br.mozdev.org/download/" target="_blank" class="link_alt" onMouseOver="Tip('<b>Mozila Firefox</b><br>a partir da vers&atilde;o 3.6');" onMouseOut="UnTip()"><img src="https://insper.blackboard.com/login/ico_firefox.png" alt="FireFox" width="50" height="72"></a>
            </p>
          </div>
          <div id="requisitos_box" class="requisitos_topTit">
          	<p align="center">
            	<a href="http://www.apple.com/safari/download/" target="_blank" class="link_alt" onMouseOver="Tip('<b>Safari</b><br>vers&otilde;es 4.0, 5.0, 5.1 e 6.0');" onMouseOut="UnTip()"><img src="https://insper.blackboard.com/login/ico_safari.png" alt="Safari" width="50" height="72"></a>
                <a href="http://www.google.com/chrome" target="_blank" class="link_alt" onMouseOver="Tip('&lt;b&gt;Google Chrome');" onMouseOut="UnTip()"><img src="https://insper.blackboard.com/login/ico_chrome.png" alt="Chrome" width="50" height="72"></a>
                <a href="http://br.mozdev.org/download/" target="_blank" class="link_alt" onMouseOver="Tip('<b>Mozila Firefox</b><br>a partir da vers&atilde;o 3.6');" onMouseOut="UnTip()"><img src="https://insper.blackboard.com/login/ico_firefox.png" alt="FireFox" width="50" height="72"></a></p>
          </div>
          <div id="requisitos_box" class="requisitos_top">
          	<div id="reqTitulo"><em>Plugins</em></div>
          </div>  
          <div id="requisitos_box" class="requisitos_top">
          	<p align="center">
            	<a href="http://www.java.com/pt_BR/" target="_blank" class="link_alt" onMouseOver="Tip('<b>Java</b>');" onMouseOut="UnTip()"><img src="https://insper.blackboard.com/login/ico_java.png" alt="Java" width="50" height="72"></a>
                <a href="http://get.adobe.com/br/flashplayer/" target="_blank" class="link_alt" onMouseOver="Tip('<b>Flash Player</b>');" onMouseOut="UnTip()"><img src="https://insper.blackboard.com/login/ico_flash.png" alt="Flash Player" width="50" height="72"></a>
                <a href="http://get.adobe.com/br/reader/" target="_blank" class="link_alt" onMouseOver="Tip('<b>Adobe Acrobat</b>');" onMouseOut="UnTip()"><img src="https://insper.blackboard.com/login/ico_acrobat.png" alt="Acrobat" width="50" height="72"></a>
            </p>
          </div>
          <div id="requisitos_box" class="requisitos_top">
          	<p align="center">
            	<a href="http://www.java.com/pt_BR/" target="_blank" class="link_alt" onMouseOver="Tip('<b>Java</b>');" onMouseOut="UnTip()"><img src="https://insper.blackboard.com/login/ico_java.png" alt="Java" width="50" height="72"></a>
                <a href="http://get.adobe.com/br/flashplayer/" target="_blank" class="link_alt" onMouseOver="Tip('<b>Flash Player</b>');" onMouseOut="UnTip()"><img src="https://insper.blackboard.com/login/ico_flash.png" alt="Flash Player" width="50" height="72"></a>
                <a href="http://get.adobe.com/br/reader/" target="_blank" class="link_alt" onMouseOver="Tip('<b>Adobe Acrobat</b>');" onMouseOut="UnTip()"><img src="https://insper.blackboard.com/login/ico_acrobat.png" alt="Acrobat" width="50" height="72"></a>
            </p>
          </div>
      </div>
        <div id="div_Sesq"></div>
        <div id="conteudo">
            <div id="loginBoxInsper">
              <loginUI:loginForm />          
            </div>
            <div id="erroArea"><loginUI:errorMessage /></div>
        </div>
        <div id="div_Sdir"></div>
    </div>
    
    <div id="copyArea">Copyright &copy; | Insper. Todos os Direitos Reservados</div>
</div>
</body>
</html>
</bbNG:genericPage>
