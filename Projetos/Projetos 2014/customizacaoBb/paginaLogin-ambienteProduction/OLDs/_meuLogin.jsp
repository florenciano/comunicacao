<%@ include file="/webapis/ui/doctype.jspf" %>

<%@ taglib uri="/bbNG" prefix="bbNG" %>
<%@ taglib uri="/bbUI" prefix="bbUI" %>
<%@ taglib uri="/loginUI" prefix="loginUI" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<c:set var="productName" value="${ loginUI:getProductName() }" />

<%--
  This is a standard wrapper for all AS pages.  It is recommended that you keep this tag.
  --%>
<bbNG:genericPage authentication="N" wrapper="false" onLoad="loadLoginPage()" bodyClass="login-page" globalNavigation="false">
<!doctype html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Blackboard Learn - Insper</title>
    <link href="css/screen.css" media="screen, projection" rel="stylesheet" type="text/css" />
    <!--[if lt IE 9]>
        <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
        <script>window.html5 || document.write('<script src="js/libs/html5shiv.js"><\/script>')</script>
    <![endif]-->

<%--   
<%@ include file="/webapis/ui/cookie-disclosure-login.jspf"%>
   
  <bbNG:jsBlock>
    <script type="text/javascript">
      function loadLoginPage()
      {
    	  if ( top != self )
    	  {
    		  top.location.replace( self.location.href );
    		}
    	  if(document.forms.login.user_id != undefined)
    		{
    		  document.forms.login.user_id.focus();
    		}
    	  setTimeout("triggerScreenreaderAlert()", 500);
      }
      
      function triggerScreenreaderAlert()
      {
    	if ( document.getElementById( 'loginErrorMessage' ) )
  	    {
    	  $( 'loginErrorMessage' ).update( $('loginErrorMessage').innerHTML );
  	    }
      }
    </script>
  </bbNG:jsBlock>
--%>
<%-- 
  If you need to customize styles defined in login.css, you can place your changes
  within the following <style> block.  The JSP comment markers surrounding the <bbNG:cssBlock> element
  must be removed before the changes will take effect.
--%>

  <style type="text/css">
  /* reset */
  html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video { margin: 0; padding: 0; border: 0; font: inherit; font-size: 100%; vertical-align: baseline; }
  html { line-height: 1; }
  ol, ul { list-style: none; }
  table { border-collapse: collapse; border-spacing: 0; }
  caption, th, td { text-align: left; font-weight: normal; vertical-align: middle; }
  q, blockquote { quotes: none; }
  q:before, q:after, blockquote:before, blockquote:after { content: ""; content: none; }
  a img { border: none; }
  article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section, summary { display: block; }

  .icos-sprite, .icos-acrobat32x32, .icos-crhome42x42, .icos-firefox42x42, .icos-flash32x32, .icos-ie42x42, .icos-java52x32, .icos-macOSX62x52, .icos-safari42x42, .icos-windows62x52 { background: url('https://insper.blackboard.com/bbcswebdav/users/rodrigofs3/pagLogin/img/icos-s4b245febab.png') no-repeat; }

  .icos-acrobat32x32 { background-position: 0 -252px; }

  .icos-crhome42x42 { background-position: 0 -178px; }

  .icos-firefox42x42 { background-position: 0 -84px; }

  .icos-flash32x32 { background-position: 0 -284px; }

  .icos-ie42x42 { background-position: 0 0; }

  .icos-java52x32 { background-position: 0 -220px; }

  .icos-macOSX62x52 { background-position: 0 -126px; }

  .icos-safari42x42 { background-position: 0 -42px; }

  .icos-windows62x52 { background-position: 0 -316px; }

  * { box-sizing: border-box; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; }

  body { font: normal 14px/1.6875 "verdana", "arial", "sans-serif"; background: #e6e7e8 url("https://insper.blackboard.com/bbcswebdav/users/rodrigofs3/pagLogin/img/bg_texture_insper.png") no-repeat center top; }

  .wrapper { background-color: #fff; margin: 0 auto; border: 1px solid #bcbec0; border-radius: 5px; box-shadow: 0 0 10px rgba(1, 1, 1, 0.1); -moz-box-shadow: 0 0 10px rgba(1, 1, 1, 0.1); -webkit-box-shadow: 0 0 10px rgba(1, 1, 1, 0.1); width: 910px; height: 760px; position: absolute; left: 50%; margin-left: -455px; top: 50%; margin-top: -380px; }

  header[role="banner"] { margin-bottom: 20px; padding: 20px; }
  header[role="banner"] .logos h1 { display: inline-block; width: 200px; }
  header[role="banner"] .logos .right { float: right; max-height: 72px; margin-right: 20px; }
  header[role="banner"] .libraryInsperLogin { display: block; background: transparent url("https://insper.blackboard.com/bbcswebdav/users/rodrigofs3/pagLogin/img/bibliotecaInsper.jpg") no-repeat 10px center; width: 100%; height: 200px; }
  header[role="banner"] .libraryInsperLogin:before, header[role="banner"] .libraryInsperLogin:after { content: ""; display: table; }
  header[role="banner"] .libraryInsperLogin:after { clear: both; }

  .contentLogin { position: relative; margin-bottom: 170px; }
  .contentLogin .titlePage { margin-top: 45px; background: #414042 url("https://insper.blackboard.com/bbcswebdav/users/rodrigofs3/pagLogin/img/bg_texture_login.png") no-repeat center center; display: block; width: 100%; height: 165px; }
  .contentLogin .titlePage img { margin: 45px 0 0 80px; }
  .contentLogin .formLogin { width: 325px; background-color: #ffffff; position: relative; border-radius: 5px; box-shadow: 0 0 20px rgba(1, 1, 1, 0.3); -moz-box-shadow: 0 0 20px rgba(1, 1, 1, 0.3); -webkit-box-shadow: 0 0 20px rgba(1, 1, 1, 0.3); float: right; margin-top: -210px; margin-right: 80px; }
  .contentLogin .formLogin h4 { background-color: #c4161c; border-radius: 5px 5px 0px 0px; color: #fff; width: 100%; padding: 10px 10px 10px 20px; margin: 0; font: normal 14px "verdana", "arial", "sans-serif"; height: 45px; line-height: 25px; }
  .contentLogin .formLogin form { padding: 20px; border: 1px solid #e6e7e8; }
  .contentLogin .formLogin label, .contentLogin .formLogin input[type="text"], .contentLogin .formLogin input[type="password"] { display: block; width: 100%; }
  .contentLogin .formLogin label { font: normal 14px "verdana", "arial", "sans-serif"; color: #414042; margin-bottom: 5px; }
  .contentLogin .formLogin input[type="text"], .contentLogin .formLogin input[type="password"] { border: 1px solid #d2d3d4; color: #414042; padding: 10px; font: bold 12px "verdana", "arial", "sans-serif"; box-shadow: inset 0 0 5px rgba(1, 1, 1, 0.2); -moz-box-shadow: inset 0 0 5px rgba(1, 1, 1, 0.2); -webkit-box-shadow: inset 0 0 5px rgba(1, 1, 1, 0.2); border-radius: 5px; }
  .contentLogin .formLogin input[type="text"]:focus, .contentLogin .formLogin input[type="password"]:focus { background-color: #f0f0f0; }
  .contentLogin .formLogin input[type="text"] { margin-bottom: 15px; }
  .contentLogin .formLogin #erroArea { border: 1px solid #c4161c; background-color: #fff; color: #c4161c; margin: 20px 0; width: 100%; padding: 10px 22px; border-radius: 5px; font: normal 12px "verdana", "arial", "sans-serif"; text-align: center; visibility: hidden; }
  .contentLogin .formLogin input[type="submit"] { background-color: #c4161c; border: none; color: #ffffff; font: 400 12px "verdana", "arial", "sans-serif"; border-radius: 5px; padding: 10px 25px; margin: 0; cursor: pointer; }
  .contentLogin .formLogin input[type="submit"]:hover, .contentLogin .formLogin input[type="submit"]:focus { background-color: #db191f; text-shadow: 0 0.2em 1px rgba(1, 1, 1, 0.3); transition: all 0.3s linear; -moz-transition: all 0.3s linear; -webkit-transition: all 0.3s linear; }
  .contentLogin .formLogin .forgot { background-color: #414042; border: none; margin: 0; padding: 0; display: inline-block; border-radius: 5px; position: absolute; right: 20px; bottom: 20px; }
  .contentLogin .formLogin .forgot a { color: #ffffff; font: normal 12px "verdana", "arial", "sans-serif"; padding: 10px 25px; text-decoration: none; display: block; width: 100%; height: 100%; }
  .contentLogin .formLogin .forgot:hover { background-color: #4e4d4f; text-shadow: 0 0.2em 1px rgba(1, 1, 1, 0.3); transition: all 0.4s linear; -moz-transition: all 0.4s linear; -webkit-transition: all 0.4s linear; }

  .linksOut { position: absolute; width: 55%; bottom: -130px; text-align: center; font: normal 11px "verdana", "arial", "sans-serif"; }
  .linksOut a { color: #414042; text-decoration: none; }
  .linksOut a:hover { text-decoration: underline; }
  .linksOut a.acessibility:after { content: ""; display: inline-block; background: transparent url("https://insper.blackboard.com/bbcswebdav/users/rodrigofs3/pagLogin/img/ico_linkOut.png") no-repeat center center; width: 12px; height: 12px; margin: 0 2px 0 5px; }

  footer[role="contentinfo"] { clear: both; display: block; width: 90%; border-top: 1px solid #bcbec0; padding: 20px; margin: 0 auto; font: normal 10px "verdana", "arial", "sans-serif"; text-align: center; color: #414042; }

  .bg-modal { display: none; background: transparent url("https://insper.blackboard.com/bbcswebdav/users/rodrigofs3/pagLogin/img/bg-modal-ie.png") repeat center center; background: rgba(1, 1, 1, 0.25); width: 100%; height: 100%; position: absolute; }

  .containerReqSistema, .perfilUsuario { background-color: #fff; padding: 20px; border: 1px solid #e6e7e8; font: normal 10px "verdana", "arial", "sans-serif"; border-radius: 5px; box-shadow: 0 0 80px rgba(1, 1, 1, 0.8); -moz-box-shadow: 0 0 80px rgba(1, 1, 1, 0.8); -webkit-box-shadow: 0 0 80px rgba(1, 1, 1, 0.8); }

  .containerReqSistema { display: none; width: 645px; height: 505px; position: absolute; top: 50%; left: 50%; margin-top: -252px; margin-left: -322px; }

  .close { display: block; width: 100%; }
  .close span { float: right; width: 25px; height: 2em; text-align: center; }
  .close span a { background-color: #c4161c; color: #fff; text-decoration: none; display: block; height: 100%; width: 100%; padding-top: 1px; border-radius: 5px; font: bold 13px "verdana", "arial", "sans-serif"; transition: all 0.4s linear; -moz-transition: all 0.4s linear; -webkit-transition: all 0.4s linear; }
  .close span a:hover { background-color: #d2181e; text-shadow: 0 0.1em 1px rgba(1, 1, 1, 0.3); }

  .containerReqSistema table, .perfilUsuario table { clear: both; border: 0; border-spacing: 0; border-collapse: collapse; padding: 0; width: 560px; margin: 0 auto; display: block; vertical-align: top; }
  .containerReqSistema table caption, .perfilUsuario table caption { text-align: center; color: #414042; font: bold 16px "verdana", "arial", "sans-serif"; margin-bottom: 20px; }

  .containerReqSistema table tr td:nth-child(1) { width: 20%; }
  .containerReqSistema table tr td:nth-child(2) { width: 39.5%; }
  .containerReqSistema table tr td { vertical-align: top; }
  .containerReqSistema table tr td h5 { font: bold 11px "verdana", "arial", "sans-serif"; color: #414042; margin: 0; padding: 0; }
  .containerReqSistema table tr td strong { font-weight: bold; color: #414042; }
  .containerReqSistema table tr td .browser { display: block; float: left; margin-bottom: 10px; }
  .containerReqSistema table tr td .ico, .containerReqSistema table tr td .icoBrowser, .containerReqSistema table tr td .icoPlugin { width: 52px; height: 52px; display: inline-block; float: left; margin: 2px 5px 2px 0; clear: left; }
  .containerReqSistema table tr td .icoBrowser { width: 42px; height: 42px; }
  .containerReqSistema table tr td .icoPlugin { width: 32px; height: 32px; }
  .containerReqSistema table tr td .description { display: inline-block; width: 150px; float: left; margin: 0 0 0 10px; }
  .containerReqSistema table tr td .description span { font: normal 10px "verdana", "arial", "sans-serif"; display: block; }
  .containerReqSistema table tr td .plugins { float: left; width: 30%; text-align: center; }
  .containerReqSistema table tr td .plugins span { font: bold 10px "verdana", "arial", "sans-serif"; }
  .containerReqSistema table tr td .plugins .icoPlugin { float: none; }
  .containerReqSistema table tr .labelBrowser { font: bold 11px "verdana", "arial", "sans-serif"; color: #414042; }
  .containerReqSistema table tr .labelBrowser ~ td { padding-top: 10px; }
  .containerReqSistema table .respiro { height: 20px; border-bottom: 1px solid #bcbec0; }
  .containerReqSistema table .respiro + tr { height: 5px; font-size: 1px; }

  .alinh01 { margin-top: 1.2em; }

  .alinh02 { margin-top: 1.2em; }

  .alinh03 { margin-top: 1.5em; display: block; }

  .alinh04 { margin-top: 1.2em; display: block; }

  .alinh04 { margin-top: 1.2em; display: block; }

  .perfilUsuario { display: none; width: 312px; height: 220px; position: absolute; top: 50%; left: 50%; margin-top: -110px; margin-left: -156px; }
  .perfilUsuario h5 { text-align: center; color: #414042; font: bold 16px "verdana", "arial", "sans-serif"; margin: 30px 20px 20px; }
  .perfilUsuario ul { margin-top: 20px; padding: 0 20px; }
  .perfilUsuario ul li { width: 49%; display: inline-block; text-align: center; }
  .perfilUsuario ul li .perfis { width: 85px; height: 85px; background: #fafafa; border: 1px solid #e6e6e6; border-radius: 5px; margin: 0 auto; transition: all 0.4s linear; -moz-transition: all 0.4s linear; -webkit-transition: all 0.4s linear; }
  .perfilUsuario ul li .perfis a { display: block; height: 100%; width: 100%; text-decoration: none; font: bold 11px "verdana", "arial", "sans-serif"; color: #414042; }
  .perfilUsuario ul li .perfis a:hover { color: #fff; }
  .perfilUsuario ul li .perfis a span { padding-top: 50px; display: block; }
  .perfilUsuario ul li .icoProfessor { background: url("https://insper.blackboard.com/bbcswebdav/users/rodrigofs3/pagLogin/img/perfis/professor_target.png") no-repeat center 40%; }
  .perfilUsuario ul li .icoAluno { background: url(".https://insper.blackboard.com/bbcswebdav/users/rodrigofs3/pagLogin/img/perfis/aluno_target.png") no-repeat center 40%; }
  .perfilUsuario ul li .perfis:hover, .perfilUsuario ul li .perfis:focus { background-color: #414042; transition: all 0.4s linear; -moz-transition: all 0.4s linear; -webkit-transition: all 0.4s linear; }
  .perfilUsuario ul li .perfis:hover .icoProfessor, .perfilUsuario ul li .perfis:focus .icoProfessor { background-image: url("https://insper.blackboard.com/bbcswebdav/users/rodrigofs3/pagLogin/img/perfis/professor_hover.png"); }
  .perfilUsuario ul li .perfis:hover .icoAluno, .perfilUsuario ul li .perfis:focus .icoAluno { background-image: url("https://insper.blackboard.com/bbcswebdav/users/rodrigofs3/pagLogin/img/perfis/aluno_hover.png"); }

  @-moz-document url-prefix() { .containerReqSistema { height: 535px; margin-top: -267px; }
    .containerReqSistema .description span { font-size: 8.75px !important; }
    .close span { height: 22px; width: 26px; } }
  </style>

  </head>
<body>

<%--
  It is recommended that any text passed to the loginUI tags be localized.  The following
  is an example of loading a localized phrase from the security.properties resource bundle:
     
    <fmt:message var="strMyLoginText" key="my.login.text.key" bundle="${bundles.security}" />
  
  Once loaded, this phrase can be referenced as a JSTL variable:
  
    <loginUI:loginForm loginText="${strMyLoginText}" />
--%>

<%--
  Each of the <loginUI:*> elements used below can safely be rearranged to suit your needs.
  If you change the structure significantly, you may need to update the inline styles above.
  --%>
<%--
<div id="loginPageContainer">
  <div id="loginPane">

    <div id="loginContainer">
      <div id="loginHeader" class="clearfix">
        <h1 class="hideoff">${productName}</h1>
        <img src="/images/ci/logos/Bb_newLogo_060.png" alt="${productName}" class="productLogo" />
        <loginUI:accessibility />
      </div>

      <div id="loginLang" class="clearfix">
        <loginUI:localePicker />
      </div>

      <div class="clearfix loginBody">
        <loginUI:errorMessage />

        <div id="loginBox">
          <loginUI:loginForm />          
        </div>

        <div id="loginOptions">
          <loginUI:gatewayButtons />
        </div>
      </div>

      <loginUI:welcomeArea />
	    
    </div>

  </div>
  
  <loginUI:systemAnnouncements maxItems="5" />

  <bbNG:copyright />
</div>
--%>
  <div class="wrapper" role="main">
      <header class="headerLogin" role="banner">
          <div class="logos">
              <h1><img src="https://insper.blackboard.com/bbcswebdav/users/rodrigofs3/pagLogin/img/logoInsper.png" alt="Logo Insper" title="Insper" class="left"></h1>
              <img src="https://insper.blackboard.com/bbcswebdav/users/rodrigofs3/pagLogin/img/logoBlackboard.png" alt="Logo Blackboard" class="right">
          </div>
          <div class="libraryInsperLogin"></div>
      </header>
      <section class="contentLogin">
          <div class="titlePage"><img src="https://insper.blackboard.com/bbcswebdav/users/rodrigofs3/pagLogin/img/titleForm.png" alt="Ambiente Virtual de Aprendizagem" title="Ambiente Virtual de Aprendizagem"></div>
          
          <!-- container do form de login -->
          <div class="formLogin" id="loginInsper">
              <h4>Acesso ao ambiente</h4>
              <!-- html expirrado do Bb -->
              <loginUI:loginForm />
              <%-- 
              <noscript>
                  &lt;div class="receipt bad editmode"&gt;Ative o JavaScript no seu navegador para que o aplicativo Blackboard funcione.&lt;/div&gt;
              </noscript>
              <!-- action="https://insper.blackboard.com/webapps/login/" -->
              <form action="" method="POST" name="login">
                  <div id="loginFormFields" class="clearfix">
                      <ul id="loginFormList" class="clearfix">
                          <li class="clearfix">
                          <label for="user_id">Nome de usuário:</label>
                          <input type="text" name="user_id" id="user_id" size="25" maxlength="50" tabindex="1" autofocus>
                          </li>
                          <li class="clearfix">
                              <label for="password">Senha:</label>
                              <input size="25" name="password" id="password" type="password" autocomplete="off" tabindex="2">
                          </li>
                          
                          <!-- área da mensagem de erro -->
                          <li class="clearfix">
                              <div id="erroArea">
                                  <div id="loginErrorMessage" class="receipt bad editmode" role="alert">O nome de usuário ou senha fornecido é inválido. Tente novamente.</div>
                              </div>
                          </li>
                          
                          <li class="clearfix">
                              <input type="submit" value="Logon" name="login" class="submit button-1" tabindex="3">
                          </li>
                          <li class="clearfix">
                              <span class="forgot"><a href="#" tabindex="4">Esqueceu sua senha?</a></span>
                          </li>
                      </ul>
                  </div>
              </form>
              --%>
              <div id="erroArea"><loginUI:errorMessage /></div>
          </div>

          <div class="linksOut">
              <a href="http://www.blackboard.com/Platforms/Learn/Resources/Accessibility.aspx" class="acessibility" target="_blank">Informações de acessibilidade</a> | <a href="#" id="requisitos">Requisitos do sistema</a>
          </div>
      </section>
      <footer class="copyright" role="contentinfo">Copyright &#169; | Insper. Todos os Direitos Reservados</footer>
  </div>

  <!-- modais -->
  <div class="bg-modal">&nbsp;</div>
  <div class="containerReqSistema">
      <div class="close"><span><a href="#" title="Fechar janela" id="close-modal-reqSistema">x</a></span></div>
      <table>
          <caption>Sistemas operacionais suportados</caption>
          <tbody>
              <tr>
                  <td class="col1">&nbsp;</td>
                  <td class="col2">
                      <h5>Windows</h5>
                      <div class="ico icos-windows62x52"></div>
                      <div class="description">Windows <strong>8</strong> (64 bits)<br>Windows <strong>8</strong> (32 bits)<br>Windows <strong>7</strong> (64 bits)<br>Windows <strong>7</strong> (32 bits)<br>Windows <strong>Vista</strong> (64 bits)<br>Windows <strong>Vista</strong> (32 bits)<br>Windows <strong>XP</strong> (32 bits)
                      </div>
                  </td>
                  <td class="col3">
                      <h5>Mac OS</h5>
                      <div class="ico icos-macOSX62x52"></div>
                      <div class="description">Mac OS X <strong>10.8</strong><br>Mac OS X <strong>10.8 Lion</strong><br>Mac OS X <strong>10.6 Snow Leopard</strong>
                      </div>
                  </td>
              </tr>
              <tr class="respiro">
                  <td colspan=3>&nbsp;</td>
              </tr>
              <tr>
                  <td colspan=3>&nbsp;</td>
              </tr>
              <tr>
                  <td class="labelBrowser">Navegadores suportados</td>
                  <td>
                      <div class="browser">
                          <div class="icoBrowser icos-ie42x42"></div>
                          <div class="description">
                              <strong>Internet Explorer</strong><span>A partir da versão 8 sem habilitar o modo de  compatibilidade</span>
                          </div>
                      </div>
                      <div class="browser">
                          <div class="icoBrowser icos-crhome42x42"></div>
                          <div class="description">
                              <strong class="alinh03">Google Chrome</strong>
                          </div>
                      </div>
                      <div class="browser">
                          <div class="icoBrowser icos-firefox42x42"></div>
                          <div class="description">
                              <strong class="alinh04">Mozilla Firefox</strong>
                              A partir da versão 3.6
                          </div>
                      </div>
                  </td>
                  <td>
                      <div class="browser">
                          <div class="icoBrowser icos-safari42x42"></div>
                          <div class="description">
                              <strong class="alinh04">Safari</strong>
                              Versoões 4.0, 5.0, 5.1 e 6.0
                          </div>
                      </div>
                      <div class="browser">
                          <div class="icoBrowser icos-crhome42x42"></div>
                          <div class="description">
                              <strong class="alinh03">Google Chrome</strong>
                          </div>
                      </div>
                      <div class="browser">
                          <div class="icoBrowser icos-firefox42x42"></div>
                          <div class="description">
                              <strong class="alinh04">Mozilla Firefox</strong>
                              A partir da versão 3.6
                          </div>
                      </div>
                  </td>
              </tr>
              <tr class="respiro">
                  <td colspan=3>&nbsp;</td>
              </tr>
              <tr>
                  <td colspan=3>&nbsp;</td>
              </tr>
              <tr>
                  <td class="labelBrowser">Plugins</td>
                  <td>
                      <div class="plugins">
                          <span>Adobe Acrobat</span><br>
                          <div class="icoPlugin icos-acrobat32x32"></div>
                      </div>
                      <div class="plugins alinh01">
                          <span>Flash</span><br>
                          <div class="icoPlugin icos-flash32x32"></div>
                      </div>
                      <div class="plugins alinh02">
                          <span>Java</span><br>
                          <div class="icoPlugin icos-java52x32"></div>
                      </div>
                  </td>
                  <td>
                      <div class="plugins">
                          <span>Adobe Acrobat</span><br>
                          <div class="icoPlugin icos-acrobat32x32"></div>
                      </div>
                      <div class="plugins alinh01">
                          <span>Flash</span><br>
                          <div class="icoPlugin icos-flash32x32"></div>
                      </div>
                      <div class="plugins alinh02">
                          <span>Java</span><br>
                          <div class="icoPlugin icos-java52x32"></div>
                      </div>
                  </td>    
              </tr>
          </tbody>
      </table>
  </div>
  <div class="perfilUsuario">
      <div class="close"><span><a href="#" title="Fechar janela" id="close-modal-perfil">x</a></span></div>
      <h5>Escolha o seu perfil</h5>
      <ul>
          <li>
              <div class="perfis professor">
                  <a href="#" title="Recuperar senha: professor" class="icoProfessor"><span>Professor</span></a>
              </div>
          </li>
          <li>
              <div class="perfis aluno">
                  <a href="http://portaldoaluno.insper.edu.br/gestaocadastral/RecuperarSenha.aspx" title="Recuperar senha: aluno" class="icoAluno"><span>Aluno</span></a>
              </div>
          </li>
      </ul>
  </div>

  <!-- Scripts -->
  <script>navigator.userAgent.match("MSIE")&&document.write('<script src="js/libs/jquery-1.9.1.min.js"><\/script>')||document.write('<script src="js/libs/jquery-2.0.2.min.js"><\/script>');</script>
  <!-- <script src="js/plugins.js"></script> -->
  <script src="js/main.js" async></script>

</body>
</html>

</bbNG:genericPage>
