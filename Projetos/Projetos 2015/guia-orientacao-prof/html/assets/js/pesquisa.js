(function(){
    /* ******************************************************
        Tabs: Abertas | Fechadas
    ****************************************************** */
    var abertas, fechadas, tabs1, tabs2;
    abertas = document.querySelector("button[name='btn-abertas'"),
    fechadas = document.querySelector("button[name='btn-fechadas']");

    tabs1 = byId("tabs-1"), tabs2 = byId("tabs-2");

    function byId(el) { return document.getElementById(el) }

    function showHide (elAddClassActive, elRemoveClassActive, elShow, elHide) {
        elAddClassActive.className = "ui-tabs-anchor ui-state-active";
        elRemoveClassActive.className = "ui-tabs-anchor";
        elShow.style.display = "block";
        elHide.style.display = "none";
    }

    abertas.addEventListener("click", function() { showHide(this, fechadas, tabs1, tabs2) });
    fechadas.addEventListener("click", function() { showHide(this, abertas, tabs2, tabs1) });

    /* ******************************************************
        Colorindo as células das tabelas de acordo
        com a Categoria e removendo as linhas da aba
        'Abertas' para 'Fechadas' com o Deadline vencido
    ****************************************************** */

    var tableOpened = selectTable(tabs1),
        tableClosed = selectTable(tabs2),
        trOp = tableOpened.children,
        trCl = tableClosed.children;

    function selectTable (container) { return container.querySelector('table tbody'); }

    // Colorindo as linhas...
    colorRow(trOp);
    colorRow(trCl);

    function colorRow (row) {
        for(var i = 0; i < row.length; i++) {
            var td = row[i].children;
            // texto da primeira coluna - Categoria
            var tdCategoriaText = td[0].textContent;

            // Definindo as cores das categorias
            switch (tdCategoriaText) {
                case "Bolsas" :
                    applyColor(row[i], "rgba(0,188,212,.05)");
                    break;
                case "Cooperação internacional" :
                    applyColor(row[i], "rgba(255,152,0,.05)");
                    break;
                case "Eventos" :
                    applyColor(row[i], "rgba(245,65,55,.05)");
                    break;
                case "Pesquisa" :
                    applyColor(row[i], "rgba(20,150,20,.05)");
                    break;
                case "Prêmios" :
                    applyColor(row[i], "rgba(30,30,30,.05)");
                    break;
                default:
                    console.log("No momento não exige todas as 'Categorias' para colorir!");
            }

            // Aplicando as cores das categorias
            function applyColor (el, color) { el.style.backgroundColor = color; }
        }
    }

    // Movendo as linhas de datas vencidas...
    moveRow(trOp);

    function moveRow (row) {
        for(var i = 0; i < row.length; i++) {
            // Passando por todas as colunas 'Deadline' da tabela
            var td = row[i].children,
                tdDeadlineDate = td[td.length - 1];

            // se existir o atributo 'data-set'...
            if(tdDeadlineDate.getAttribute("data-set")) {
                var hoje, tdDeadlineDateParse;
                    hoje = new Date();

                // converta o attr em formato de data válido
                tdDeadLineParse = tdDeadlineDate.getAttribute("data-set");
                tdDeadLineParse = new Date(tdDeadLineParse);

                // comparando datas
                if(hoje > tdDeadLineParse) {
                    // copiando para a aba 'Fechadas'
                    var rowExpired = tdDeadlineDate.parentNode.cloneNode(true);
                    tableClosed.appendChild(rowExpired);

                    // ocultando da tabela 'Abertas'
                    tdDeadlineDate.parentNode.style.display = "none";
                }
            }
        }
    }
})();