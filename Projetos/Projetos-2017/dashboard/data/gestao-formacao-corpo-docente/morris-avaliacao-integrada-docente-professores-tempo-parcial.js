$(function() {

    /******************************************************
    //  Avaliação do Corpo Docente - Tempo parcial
    ******************************************************/
    // Planejamento
    Morris.Bar({
        element: 'histograma-planejamento',
        data: [{
            y: 'Inadequado',
            a: 0
        }, {
            y: 'Em desenvolvimento',
            a: 8
        }, {
            y: 'Essencial',
            a: 10
        }, {
            y: 'Exemplar',
            a: 31
        }, {
            y: 'Inovador',
            a: 3
        }],
        xkey: 'y',
        ykeys: ['a'],
        ymax: 40, // valor máximo da escala
        xLabelMargin: 10, // ajuda a mostrar mais labels in axisX
        labels: ['Status 2016'],
        hideHover: 'auto',
        resize: true,
    });
    // Dinâmicas
    Morris.Bar({
        element: 'histograma-dinamicas',
        data: [{
            y: 'Inadequado',
            a: 0
        }, {
            y: 'Em desenvolvimento',
            a: 6
        }, {
            y: 'Essencial',
            a: 15
        }, {
            y: 'Exemplar',
            a: 26
        }, {
            y: 'Inovador',
            a: 5
        }],
        xkey: 'y',
        ykeys: ['a'],
        ymax: 40,
        xLabelMargin: 10,
        labels: ['Status 2016'],
        hideHover: 'auto',
        resize: true
    });
    // Avaliação
    Morris.Bar({
        element: 'histograma-avaliacao',
        data: [{
            y: 'Inadequado',
            a: 0
        }, {
            y: 'Em desenvolvimento',
            a: 6
        }, {
            y: 'Essencial',
            a: 18
        }, {
            y: 'Exemplar',
            a: 25
        }, {
            y: 'Inovador',
            a: 3
        }],
        xkey: 'y',
        ykeys: ['a'],
        ymax: 40,
        xLabelMargin: 10,
        labels: ['Status 2016'],
        hideHover: 'auto',
        resize: true
    });
    // Feedback
    Morris.Bar({
        element: 'histograma-feedback',
        data: [{
            y: 'Inadequado',
            a: 0
        }, {
            y: 'Em desenvolvimento',
            a: 6
        }, {
            y: 'Essencial',
            a: 20
        }, {
            y: 'Exemplar',
            a: 27
        }, {
            y: 'Inovador',
            a: 7
        }],
        xkey: 'y',
        ykeys: ['a'],
        ymax: 40,
        xLabelMargin: 10,
        labels: ['Status 2016'],
        hideHover: 'auto',
        resize: true
    });

});
