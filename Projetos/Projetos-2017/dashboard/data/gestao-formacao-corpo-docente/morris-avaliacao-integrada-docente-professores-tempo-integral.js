$(function() {

    /******************************************************
    //  Avaliação do Corpo Docente
    ******************************************************/

    // Planejamento
    Morris.Bar({
        element: 'histograma-planejamento',
        data: [{
            y: 'Inadequado',
            a: 0,
            b: 0
        }, {
            y: 'Em desenvolvimento',
            a: 8,
            b: 0
        }, {
            y: 'Essencial',
            a: 10,
            b: 14
        }, {
            y: 'Exemplar',
            a: 31,
            b: 33
        }, {
            y: 'Inovador',
            a: 3,
            b: 5
        }],
        xkey: 'y',
        ykeys: ['a', 'b'],
        ymax: 40, // valor máximo da escala
        xLabelMargin: 10, // ajuda a mostrar mais labels in axisX
        labels: ['Status 2016', 'Meta 2017'],
        hideHover: 'auto',
        resize: true,
    });
    // Dinâmicas
    Morris.Bar({
        element: 'histograma-dinamicas',
        data: [{
            y: 'Inadequado',
            a: 0,
            b: 0
        }, {
            y: 'Em desenvolvimento',
            a: 6,
            b: 0
        }, {
            y: 'Essencial',
            a: 15,
            b: 12
        }, {
            y: 'Exemplar',
            a: 26,
            b: 22
        }, {
            y: 'Inovador',
            a: 5,
            b: 18
        }],
        xkey: 'y',
        ykeys: ['a', 'b'],
        ymax: 40,
        xLabelMargin: 10,
        labels: ['Status 2016', 'Meta 2017'],
        hideHover: 'auto',
        resize: true
    });
    // Avaliação
    Morris.Bar({
        element: 'histograma-avaliacao',
        data: [{
            y: 'Inadequado',
            a: 0,
            b: 0
        }, {
            y: 'Em desenvolvimento',
            a: 6,
            b: 1
        }, {
            y: 'Essencial',
            a: 18,
            b: 18
        }, {
            y: 'Exemplar',
            a: 25,
            b: 25
        }, {
            y: 'Inovador',
            a: 3,
            b: 8
        }],
        xkey: 'y',
        ykeys: ['a', 'b'],
        ymax: 40,
        xLabelMargin: 10,
        labels: ['Status 2016', 'Meta 2017'],
        hideHover: 'auto',
        resize: true
    });
    // Feedback
    Morris.Bar({
        element: 'histograma-feedback',
        data: [{
            y: 'Inadequado',
            a: 0,
            b: 0
        }, {
            y: 'Em desenvolvimento',
            a: 6,
            b: 4
        }, {
            y: 'Essencial',
            a: 20,
            b: 13
        }, {
            y: 'Exemplar',
            a: 27,
            b: 23
        }, {
            y: 'Inovador',
            a: 7,
            b: 3
        }],
        xkey: 'y',
        ykeys: ['a', 'b'],
        ymax: 40,
        xLabelMargin: 10,
        labels: ['Status 2016', 'Meta 2017'],
        hideHover: 'auto',
        resize: true
    });
    
});
