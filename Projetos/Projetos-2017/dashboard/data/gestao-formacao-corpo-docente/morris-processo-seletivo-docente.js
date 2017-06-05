$(function() {

    /******************************************************
    //  Aula teste
    ******************************************************/

    var graf = Morris.Bar({
        element: 'dados-aula-teste',
        data: [{
            y: '2016-1',
            a: 8,
            b: 5,
            f: 3
        }, {
            y: '2016-2',
            a: 2,
            b: 4,
            c: 11,
            d: 1,
            e: 5
        }, {
            y: '2016-3',
            a: 6,
            b: 10,
            c: 13
        }, {
            y: '2016-4',
            a: 4,
            b: 4,
            c: 3,
            d: 8,
            e: 1,
            f: 5
        }, {
            y: '2017-1',
            a: 4,
            b: 4,
            c: 2
        }, {
            y: '2017-2',
            a: 3,
            b: 1,
            c: 5,
            d: 7,
            e: 1
        }],
        xkey: 'y',
        ykeys: ['a', 'b', 'c', 'd', 'e', 'f'],
        labels: ['PGLS: MBA', 'PGLS: Direito', 'PGLS: Cert.', 'PGLS: APF', 'Mestrado', 'Graduação'],
        ymax: 40, // valor máximo da escala
        xLabelMargin: 10, // ajuda a mostrar mais labels in axisX
        stacked: true,
        resize: true,
        hideHover: 'auto'
    });
    // console.log(graf.options);

    /*
        Criando legenda abaixo do gráfico
        // graf.options.labels
        // graf.options.barColors
    */
    graf.options.labels.forEach( function(index, i) {
        var legendItem = $("<span></span>").text(index).prepend("<i>&nbsp;</i>");
        legendItem.find("i").css("background-color", graf.options.barColors[i]);
        $("#legend").append(legendItem);
    });

});
