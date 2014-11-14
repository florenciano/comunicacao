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
	/*=globais */
	* {
		margin: 0;
		padding: 0;
	}
	body {
		background: #e4e4e4 url("https://inspertest.blackboard.com/bbcswebdav/users/rodrigofs3/assets/img/bg_body.jpg") repeat;
		font-family: arial, sans-serif;
	}
	/*=patterns */
	.clearfix:before {
	    content: "";
	    display: block;
	    width: 0;
	    height: 150%;
	}
	.clearfix:before,
	.clearfix:after {
	    content: " ";
	    display: table;
	}
	.clearfix:after {clear: both;}
	.clearfix {*zoom: 1;}
	
	/*=RWD */
	.grid,
	.wrapper {
		-webkit-border-radius: 4px;
	    	-moz-border-radius: 4px;
	        	border-radius: 4px;
		background: #ffffff url("https://inspertest.blackboard.com/bbcswebdav/users/rodrigofs3/assets/img/bgModal.jpg") 
		center bottom no-repeat;
		display: block;
	    margin: 20px auto 0;
		max-width: 720px;
		padding: 40px;
		height: 720px;
		width: 100%;
	}
	.wfull {
	    width: 100%;
	    max-width: 100%
	}
	.w320 { max-width: 320px }
	.w640 { max-width: 640px }
	.w960 { max-width: 960px }
	.row {
	    width: 100%;
	    margin-bottom: 20px;
	}
	.row .row {
	    width: auto;
	    margin: 0 -20px;
	}
	.c1{width:8.33%}
	.c2{width:16.66%}
	.c3{width:25%}
	.c4{width:33.33%}
	.c5{width:41.66%}
	.c6{width:50%}
	.c7{width:58.33%}
	.c8{width:66.66%}
	.c9{width:75%}
	.c10{width:83.33%}
	.c11{width:91.66%}
	.c12{width:100%}
	.c1,.c2,.c3,.c4,.c5,.c6,.c7,.c8,.c9,.c10,.c11,.c12{
	    float:left;
	    min-height:1px;
	    position:relative
	}
	/* spaces */
	.s1{margin-left:8.33%}
	.s2{margin-left:16.66%}
	.s3{margin-left:25%}
	.s4{margin-left:33.33%}
	.s5{margin-left:41.66%}
	.s6{margin-left:50%}
	.s7{margin-left:58.33%}
	.s8{margin-left:66.66%}
	.s9{margin-left:75%}
	.s10{margin-left:83.33%}
	.s11{margin-left:91.66%}
	.end{float:right!important}
	
	/* Content Login: title */
	.titleLogin h2 {
		color: #404040;
		font-size: 38px;
		font-weight: normal;
		line-height: 36px;
		text-align: center;
		margin: 20px 20px 0;
	}
	.titleLogin img {
		display: block;
		margin: 70px auto 0;
	}
	/* Content Login: title */
	.formLogin ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.formLogin ul li {
		display: block;
	}
	.formLogin ul li:first-child label {
		margin-top: 0;
	}
	.formLogin ul li label {
		display: block;
		margin: 20px 0 5px 60px;
		font-size: 14px;
		color: #000000;
		font-weight: bold;
	}
	.formLogin ul li input[type="text"],
	.formLogin ul li input[type="password"] {
		-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
				box-sizing: border-box;
		-webkit-border-radius: 4px;
	    	-moz-border-radius: 4px;
	        	border-radius: 4px;
		background-color: #f4f3f3;
		border: 1px solid #dbdbdb;
		color: #5b5b5b;
		display: block;
		font-size: 12px;
		margin: 0 auto;
		padding: 0 10px;
		line-height: 35px;
		height: 35px;
		width: 265px;
	}
	.formLogin ul li input[type="submit"] {
		-webkit-border-radius: 4px;
	    	-moz-border-radius: 4px;
	        	border-radius: 4px;
		background: #cf1432;
		background-image: none !important;
		border: none;
		color: #ffffff !important;
		cursor: pointer;
		display: block;
		font-size: 14px;
		font-weight: bold;
		padding: 0;
		margin: 30px auto 0;
		height: 45px;
		text-align: center;
		text-shadow: none;
		width: 265px;
	}
	.formLogin ul li input[type="submit"]:hover,
	.formLogin ul li input[type="submit"]:focus,
	.formLogin ul li input[type="submit"]:focus:hover {
		background: #c1132f;
	}
	.formLogin ul li .forgot a {
		border-bottom: none;
		color: #cf1432;
		margin: 20px 0 0 47px;
		display: inline-block;
		font-size: 14px;
		text-decoration: none;
	}
	.formLogin ul li a:hover {
		text-decoration: underline;
		border-bottom: none
	}
	.copy {
		color: #000;
		display: block;
		font-size: 10px;
		margin: 10px auto 0;
		text-align: center;
	}
	/* Error login */
	.formErrorLogin {
		display: block;
		height: auto;
		float: left;
		margin: 0 auto;
		width: 100%;
	}
	.formErrorLogin > div {
		-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
				box-sizing: border-box;
			-webkit-border-radius: 4px;
				-moz-border-radius: 4px;
					border-radius: 4px;
		background: #ffffff url("https://inspertest.blackboard.com/bbcswebdav/users/rodrigofs3/assets/img/icoError.png") 12px 12px no-repeat;
		border: 1px solid #cf1432;
		color: #cf1432;
		display: block;
		float: left;
		font-weight: normal !important;
		width: 265px;
		height: auto;
		margin: 30px 0 0 47px; 
		padding: 10px 10px 10px 50px;
		font-size: 12px;
	}
	/*=desktop */
	@media only screen and (max-width:960px){
	    .row .row .c1,.row .row .c2,.row .row .c3,.row .row .c4,.row .row .c5,.row .row .c6,.row .row .c7,.row .row .c8,.row .row .c9,.row .row .c10,.row .row .c11,.row .row .c12{width:100%;margin-bottom:20px}
	    .row .row > div:last-child{margin-bottom:0 !important}
	}
	/*=tablets */
	@media handheld, only screen and (max-width: 768px), only screen and (max-device-width: 768px) and (orientation:portrait){
	    
	    body{font-size:90%; min-width: 100% !important;}
	    
	    .row{margin-bottom:0!important}
	    
	    .c1,.c2,.c3,.c4,.c5,.c6,.c7,.c8,.c9,.c10,.c11,.c12{width:100%;margin-right:0;margin-left:0;margin-bottom:20px}

	    /* content */
	    .wrapper {
			height: 860px;
			margin-top: 20px;
			padding: 20px;
			width: 90%;
	    }

	    .titleLogin h2 {
	    	font-size: 32px;
			line-height: 34px;
			margin: 0px 20px 0
	    }
	    .titleLogin img {
	    	display: block;
			margin: 10px auto;
			width: 210px
	    }

	    .formLogin ul {
			display: block;
			margin: 0 auto;
			width: 30%;
	    }
	    .formLogin ul li {
	    	box-sizing: border-box;
	    	display: block;

	    }
	    .formLogin ul li label {
	    	display: inline-block;
			margin: 0 0 5px 5px;
	    }
	    .formLogin ul li input[type="text"],
	    .formLogin ul li input[type="password"] {
	    	display: inline-block;
			font-size: 12px;
			margin: 0 auto 10px;
			padding: 10px;
			line-height: 0;
			height: auto;
			width: 100%;
	    }
	    .formLogin ul li .forgot a {
	    	margin: 5px 0;
	    }
	    .formLogin ul li input[type="submit"] {
	    	display: inline-block;
			margin: 10px auto 10px;
			width: 100%;
			max-width: 214px;
	    }
		
	    .formErrorLogin > div {
	    	float: none;
	    	margin: 10px auto 0;
	    }
	}
	/*=mobile */
	@media only screen and (max-width: 480px), only screen and (max-device-width:480px) {
		.wrapper {
			background: #fff;
			height: auto;
			padding: 20px;
			margin: 20px auto 0;
			width: 86%;
			max-width: 90%
		}

		.titleLogin h2 {
			font-size: 20px;
			line-height: 1em;
		}
		.titleLogin img {width: 165px;}

		.formLogin ul { width: 80%;}
		.formLogin ul li {margin: 10px 0;}
		.formLogin ul li .forgot a {margin: 0 0 5px 0;}
		.formLogin ul li input[type="submit"] {max-width: 335px; margin: 0;}

		.formErrorLogin > div {
	    	max-width: 265px;
	    	width: 100%;
	    }
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
	<!-- box -->
	<div class="wrapper">
		<div class="wfull">
			
			<div class="row clearfix">
				<!-- column left -->
				<div class="c6 titleLogin">
					<h2>Ambiente Virtual de Aprendizagem</h2>
					<!-- link permanente -->
					<img src="https://inspertest.blackboard.com/bbcswebdav/users/rodrigofs3/assets/img/logo_insper.jpg" alt="Insper">
				</div>

				<!-- column right -->
				<div class="c6 formLogin">
					<div class="form">
						<loginUI:loginForm />
					</div>
					<div class="formErrorLogin">
						<loginUI:errorMessage />
					</div>
				</div>	
			</div>
		</div>
	</div>
	<div class="row clearfix copy">
		<p>Copyright &copy; | Insper. Todos os Direitos Reservados</p>
	</div>
</body>
</html>
</bbNG:genericPage>
