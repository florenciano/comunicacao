/* 
    http://portaldoprofessor.insper.edu.br/?page_id=1588/ Guia de ambientaÃ§Ã£o

    http://portaldoprofessor.insper.edu.br/?page_id=1593/ ContrataÃ§Ã£o
    http://portaldoprofessor.insper.edu.br/?page_id=1596/ QuestÃµes operacionais
    http://portaldoprofessor.insper.edu.br/?page_id=1598/ Consulta rÃ¡pida
*/


if (typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function () {
        return this.replace(/^\s*(\S*(?:\s+\S+)*)\s*$/,"$1");
    };
}

/*
    //http://javascript.crockford.com/
    function para varrer o DOM em busca das ocorrências encontradas
*/
var walkTheDOM = function walkTheDOM (node, func) {
    func(node);
    node = node.firstChild; // todos os filhos de node
    while (node) {
        walkTheDOM(node, func);
        node = node.nextSibling; // caso seja o ultimo filho veja os irmão de node
    }
};

(function () {

    // declaração de variaveis
    "use strict";
    var request, url, ready, response, memory, locations, dictionary, requestsArray, requests, buildSearch, processText, chars, config, results;

    /*
        Aqui se configura a qtde de caracteres antes e depois
        do termo encontrando nos resultados de busca
    */
    chars = {
        before : function () {
            return window.outerWidth > 800 ? 10 : 5;
        },
        after : function () {
            return window.outerWidth > 800 ? 120 : 50;
        }
    };

    /* Número limite de ocorrências no resultado de busca */
    config = {
        ocurrences : 3
    };

    results = [];
    memory = [];

    // URL default de busca, substituir pela URL do blackboard
    url = "https://insper.blackboard.com/bbcswebdav/institution/DEA/guia-ambientacao/"; // http://portaldoprofessor.insper.edu.br/

    // páginas que serão solicitadas
    locations = {
        "contratacao"           : "contratacao/index.html",
        "questoes-operacionais" : "questoes-operacionais/index.html",
        "consulta-rapida"       : "consulta-rapida/index.html"
    };

    // título das páginas que irá aparecer no resultado da busca. Agrupará os termos da respectiva página
    dictionary = {
        "contratacao" : "Contratação",
        "questoes-operacionais" : "Questões operacionais",
        "consulta-rapida" : "Consulta rápida"
    };

    /*
        Ao digita no campo de busca:
        - ignorar caracteres especiais;
        - transformar em minúsculo;
        - remove os espços em brancos antes e final do termo
    */
    processText = function (input) {
        var output = input.replace(/^\s+|^\n+|(?:\s+\s+)|\n+|\n+$|\s+$/g, " ");

        return {
            makeLowerCase : function () { return output.toLowerCase().trim(); },
            forDisplay : function () { return output; }
        }
    };

    /*
        Construindo o sistema de busca
    */
    buildSearch = function () {

        // Qdo digitar o 3º caracteres...
        if (memory.length === 3) {
            var main, input, search, templates, container, lastValue;
            // local que iniciara a varredura
            main = $("#main"); //jQuery("#main");
            
            // modelo dos componentes do resultado de busca
            // Aqui podemos mudar o estilo... alguns são do boostrap, outros são do fixes.css
            templates = {
                input : "<div class='input-group ajax-search'><p><h3 class='title'>O que você procura?</h3></p><input type='text' class='form-control' placeholder='Faça uma busca' id='ajax-search'><span class='input-group-btn'></span></div><!-- /input-group -->",
                responseContainer : "<div id='responseContainer'></div>", // criando um modelo responsivo para o resultado de busca
                responseList : {
                    open: "<ul class='list-group'>",
                    title: function (page) {
                        return "<li class='list-group-title'><strong>" + dictionary[page] + ":</strong></li>";
                },
                item: function (string, link, page) {
                    return "<li class='list-group-item'><a href=" + link + ">(...) " + string + " (...)</a></li>";
                },
                itens: "",
                close: "</ul>"
                }
            };

            // criando o busca como filho de div#main
            // container e input
            main.prepend(templates.responseContainer).prepend(templates.input);

            /* 
                var responsável pelo elemento input e seu container
                será útil nas futuras func
            */
            input = main.find("#ajax-search");
            container = $( "#responseContainer" ); //jQuery("#responseContainer");

            /*
                Realizando a busca...
            */
            search = function (term) {
                // declaração de variavies
                var i, length, isValid, buildOcurrences, j, k, item, content, buildText;

                // autoexec qdo 'term' estiver no 3º caractere
                isValid = (function () {
                    return term.length > 2;
                }());

                content = "";
                container.html(""); // container da busca esta vazio

                /*
                    Realizando as comparações entre termo digitado e o conteúdo da página
                */
                buildText = function (term, response) {
                    // declaração de variaveis
                    var comparisonSource, comparisonTerm, termInSource;

                    comparisonSource = processText(response).makeLowerCase(); // = response em minusculo
                    comparisonTerm = processText(term).makeLowerCase(); // = term em minusculo = ele ficara em destaque 'magenta'

                    // termInSource é o fragmento [substring] encontrado resultante da comparações entre o termo digitado e o conteúdo encontrado na página
                    termInSource = processText(response).forDisplay().substring(comparisonSource.indexOf(comparisonTerm), comparisonSource.indexOf(comparisonTerm) + comparisonTerm.length + 1);

                    // retorna uma resposta entre o termo encontrado menos a qtde de carcateres antes... e o termo encontrado mais a qtde caracteres depois
                    // em seguida aplica um 'strong' no termodigitado
                    return response.substring(comparisonSource.indexOf(comparisonTerm) - chars.before(), comparisonSource.indexOf(comparisonTerm) + comparisonTerm.length + chars.after())
                           .replace(termInSource, "<strong>" + termInSource + "</strong>");
                };
                // isValid aqui contém já os 3 caracateres necessário pra iniciar a busca...
                if (isValid) {
                    length = memory.length; // length é os 3 itens 'seção de páginas' encontrados no dom aqui agrupados no array
                    container.html(""); // container da busca esta vazio
                    templates.responseList.itens = ""; // não tem nenhum item

                    results = [];

                    for (i = 0; i < memory.length; i += 1) {

                        results.push([]);
                        walkTheDOM(memory[i].element, function (node) {

                        // se achar no DOM, e se for 'p' e o conteúdo do texto não for inexistente
                        if ( node.nodeType === 1 && node.nodeName.toLowerCase() === "p" && node.innerText.toLowerCase().indexOf(term.toLowerCase()) !== -1 ) {
                            // enquanto for menor que 3... insira no 'array' results
                            if (results[i].length < config.ocurrences) {
                                results[i].push(node);
                            }
                        }
                    });
                };

                container.html(templates.responseContainer); // agora container possui o container do template do resultado da busca

                // para cada seção de página dento do array
                for (j = 0; j < results.length; j += 1) {
                    if (results[j].length) {
                        content += templates.responseList.open; // inicia a listagem
                        content += templates.responseList.title(memory[j].id); // insira o título da página =~ não entendi este 'id'

                        // para cada item da listagem dentro de cada seção de página
                        for (k = 0; k < results[j].length; k += 1) {
                            content += templates.responseList.item(buildText(term, results[j][k].innerText), memory[j].location, memory[j].id);
                        }
                    content += templates.responseList.close; // fim da listagem
                }
            }
        
            // insira no container do resultado da busca
            $(container.children()[0]).html(content); // jQuery(container.children()[0]).html(content);

            // se a qtde digitada no input for inferior a 3
            //  resetar o container da busca
        } else {
            container.html("");
            templates.responseList.itens = "";
            results = [];
        }
    };

    /*
        Evento: keyup
    */
    input.on("keyup", function () {
        search($(this).val());
    });

    /*
        Durante o scroll da página...
    */
    $(window).on("scroll", function () {
        if ($( ".menu-lateral" ).hasClass("fixed-menu")) {
            if (input.val().length > 0) {
                lastValue = input.val();
            }
            input.val("").trigger( "keyup" );
        } else {
            if (lastValue && lastValue !== input.val()) {
                input.val(lastValue).trigger( "keyup" );
                // console.log(lastValue);
            }
        }
    });

    }
};

    /*
        Ao carregar a página faça uma requisião ajax
    */
    ready = function (request, location) {
        var fragment, container, select;

        if (request.readyState === 4 && request.status === 200) {
            response = request.responseText;

            if (response) {
                fragment = document.createDocumentFragment();
                container = document.createElement("div");

                container.innerHTML = response.toString();
                fragment.appendChild(container);
                select = fragment.getElementById(location);

                $(select).find( ".menu-global" ).remove();
                $(select).find( ".breadcrumb" ).remove(); // estilo para impressão
                $(select).find( ".menu-lateral" ).remove();
                memory.push({
                    id        : location, 
                    response  : select.innerText,
                    fragment  : select,
                    location  : locations[location],
                    element   : select
                });
                // chama a func que fica na espera da inserção de texto
                buildSearch(); 
            }
        }
    };

    /*
        Qtde de requisições = qtde de páginas
    */
    requestsArray = [
        new XMLHttpRequest(),
        new XMLHttpRequest(),
        new XMLHttpRequest()
    ];

    requests = function () {
        var location, makeRequest, count;
        makeRequest = function (request, url, location) {
            request.open("GET", url, true);
            request.setRequestHeader("Content-type","application/x-www-form-urlencoded"); // verificar com o item 'Ajax no Bb'
            request.send();
            request.onreadystatechange = function () {
                ready(request, location);
        };
    };

    count = 0;

    for (location in locations) {
            // location = key
            if (locations.hasOwnProperty(location)) {
                makeRequest(requestsArray[count], url + locations[location], location);
                count += 1;
            }
        }
    };
    requests();

}());


























