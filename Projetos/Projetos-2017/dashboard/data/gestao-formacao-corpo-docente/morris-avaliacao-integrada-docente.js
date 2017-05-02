$(function() {

    /******************************************************
    //  Avaliação do Corpo Docente
    ******************************************************/

    /*  HISTOGRMAS */

    // Dinâmicas
    Morris.Bar({
        element: 'histograma-dinamicas',
        data: [{
            y: '1: Inadequado',
            a: 0,
            b: 0
        }, {
            y: '2: Em desenvolvimento',
            a: 6,
            b: 0
        }, {
            y: '3: Essencial',
            a: 15,
            b: 12
        }, {
            y: '4: Exemplar',
            a: 26,
            b: 22
        }, {
            y: '5: Inovador',
            a: 5,
            b: 18
        }],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Planejamento Status 2016', 'Planejamento Meta 2017'],
        hideHover: 'auto',
        resize: true
    });
    // Avaliação
    Morris.Bar({
        element: 'histograma-avaliacao',
        data: [{
            y: '1: Inadequado',
            a: 0,
            b: 0
        }, {
            y: '2: Em desenvolvimento',
            a: 6,
            b: 1
        }, {
            y: '3: Essencial',
            a: 18,
            b: 18
        }, {
            y: '4: Exemplar',
            a: 25,
            b: 25
        }, {
            y: '5: Inovador',
            a: 3,
            b: 8
        }],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Planejamento Status 2016', 'Planejamento Meta 2017'],
        hideHover: 'auto',
        resize: true
    });
    // Feedback
    Morris.Bar({
        element: 'histograma-feedback',
        data: [{
            y: '1: Inadequado',
            a: 0,
            b: 0
        }, {
            y: '2: Em desenvolvimento',
            a: 6,
            b: 4
        }, {
            y: '3: Essencial',
            a: 20,
            b: 13
        }, {
            y: '4: Exemplar',
            a: 27,
            b: 23
        }, {
            y: '5: Inovador',
            a: 7,
            b: 3
        }],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Planejamento Status 2016', 'Planejamento Meta 2017'],
        hideHover: 'auto',
        resize: true
    });

    // Planejamento
    Morris.Bar({
        element: 'histograma-planejamento',
        data: [{
            y: '1: Inadequado',
            a: 0,
            b: 0
        }, {
            y: '2: Em desenvolvimento',
            a: 8,
            b: 0
        }, {
            y: '3: Essencial',
            a: 10,
            b: 14
        }, {
            y: '4: Exemplar',
            a: 31,
            b: 33
        }, {
            y: '5: Inovador',
            a: 3,
            b: 5
        }],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Planejamento Status 2016', 'Planejamento Meta 2017'],
        hideHover: 'auto',
        resize: true
    });
    
});
