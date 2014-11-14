Para estilizar a tela do login do blackboard:
1- Defina os estilos css na própria página html;
2- Suba as imgs para content collection. E pega os links das imgs que estão lá;
3- Copie os estilos e a novo html para o arquivo login.js que pode ser baixado pelo blackboard no seguinte caminho:
	1- Administração do Sistema;
	2- Marcas e Temas;
	3- Personalizar Página de Início de Sessão;
	4- Pesquisar meu computador;
	5- Selecione o arquivo .js para substituir o atual do blackboard

É isso!


Para aplicar um novo tema no blackboard:
1- Administração do Sistema;
2- Marcas e Temas;
3- Gerenciar Marcas;
4- Criar Marca;
	i- preencha os campos como solicitado para indentificação
	do novo tema proposto


Para estilzar o tema "Insper 2013"
Basta mudar o tema baixado no pacote

Obs: O tema atualmente esta chamando o arquivo theme.css.
theme.css por sua vez importa dois arquivos css ["theme1.css", "theme2.css"]. O "theme1.css" é o próprio pacote, o "theme2.css", 'aparentemente' é o mesmo pacote usado no primeiro tema, porém, sem o "core.css". Esta estrutura é incorporada automaticamente após subir o pacote.zip contendo as folhas de estilos.
**** @import url("theme1.css?v=9.1.130093.0");@import url("theme2.css?v=9.1.130093.0");

Obs: A ausência de comentários impossibilia identificar as competências de cada arquivo importado.

Obs: Paleta de cores, é um recurso do BB para personalização dos códigos de cores do tema usado. Para evitar interferência na aplicação do tema 'Insper2013' foi configurada uma paleta vazia, e respectivamente, um folha de estilo vazia.