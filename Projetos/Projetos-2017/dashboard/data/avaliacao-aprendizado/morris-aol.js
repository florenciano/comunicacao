$(function(){
	/******************************************************
    //  Gestão e Formação do Corpo Docente
    ******************************************************/

    /*  AOL */
    // Objetivo Lorem ipsum
    Morris.Bar({
        element: 'objetivo-model',
        data: [{
            y: '2013',
            a: 2,
            b: 19,
            c: 49,
            d: 22,
            e: 8
        }, {
            y: '2014',
            a: 12,
            b: 26,
            c: 10,
            d: 33,
            e: 19
        }, {
            y: '2015',
            a: 23,
            b: 18,
            c: 32,
            d: 6,
            e: 21
        }, {
            y: '2016',
            a: 18,
            b: 19,
            c: 33,
            d: 23,
            e: 7
        }],
        xkey: 'y',
        ykeys: ['a', 'b', 'c', 'd', 'e'],
        labels: ['Inadequado', 'Insatisfatório', 'Domínio Básico', 'Domínio Esperado', 'Avançado'],
        hideHover: 'auto',
        resize: true,
        stacked: true
    });
});