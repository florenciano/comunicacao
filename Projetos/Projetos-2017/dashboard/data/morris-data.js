$(function() {

    // Morris.Area({
    //     element: 'morris-area-chart',
    //     data: [{
    //         period: '2010 Q1',
    //         iphone: 2666,
    //         ipad: null,
    //         itouch: 2647
    //     }, {
    //         period: '2010 Q2',
    //         iphone: 2778,
    //         ipad: 2294,
    //         itouch: 2441
    //     }, {
    //         period: '2010 Q3',
    //         iphone: 4912,
    //         ipad: 1969,
    //         itouch: 2501
    //     }, {
    //         period: '2010 Q4',
    //         iphone: 3767,
    //         ipad: 3597,
    //         itouch: 5689
    //     }, {
    //         period: '2011 Q1',
    //         iphone: 6810,
    //         ipad: 1914,
    //         itouch: 2293
    //     }, {
    //         period: '2011 Q2',
    //         iphone: 5670,
    //         ipad: 4293,
    //         itouch: 1881
    //     }, {
    //         period: '2011 Q3',
    //         iphone: 4820,
    //         ipad: 3795,
    //         itouch: 1588
    //     }, {
    //         period: '2011 Q4',
    //         iphone: 15073,
    //         ipad: 5967,
    //         itouch: 5175
    //     }, {
    //         period: '2012 Q1',
    //         iphone: 10687,
    //         ipad: 4460,
    //         itouch: 2028
    //     }, {
    //         period: '2012 Q2',
    //         iphone: 8432,
    //         ipad: 5713,
    //         itouch: 1791
    //     }],
    //     xkey: 'period',
    //     ykeys: ['iphone', 'ipad', 'itouch'],
    //     labels: ['iPhone', 'iPad', 'iPod Touch'],
    //     pointSize: 2,
    //     hideHover: 'auto',
    //     resize: true
    // });

    // Morris.Donut({
    //     element: 'morris-donut-chart',
    //     data: [{
    //         label: "Download Sales",
    //         value: 12
    //     }, {
    //         label: "In-Store Sales",
    //         value: 30
    //     }, {
    //         label: "Mail-Order Sales",
    //         value: 20
    //     }],
    //     resize: true
    // });

    /******************************************************
    //  Avaliação do Corpo Docente
    ******************************************************/

    /*  HISTOGRMAS */
    // Planejamento
    Morris.Bar({
        element: 'histograma-planejamento',
        data: [{
            y: '1',
            a: 0,
            b: 0
        }, {
            y: '2',
            a: 8,
            b: 0
        }, {
            y: '3',
            a: 10,
            b: 14
        }, {
            y: '4',
            a: 31,
            b: 33
        }, {
            y: '5',
            a: 3,
            b: 5
        }],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Planejamento Status 2016', 'Planejamento Meta 2017'],
        hideHover: 'auto',
        resize: true
    });
    // Dinâmicas
    Morris.Bar({
        element: 'histograma-dinamicas',
        data: [{
            y: '1',
            a: 0,
            b: 0
        }, {
            y: '2',
            a: 6,
            b: 0
        }, {
            y: '3',
            a: 15,
            b: 12
        }, {
            y: '4',
            a: 26,
            b: 22
        }, {
            y: '5',
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
            y: '1',
            a: 0,
            b: 0
        }, {
            y: '2',
            a: 6,
            b: 1
        }, {
            y: '3',
            a: 18,
            b: 18
        }, {
            y: '4',
            a: 25,
            b: 25
        }, {
            y: '5',
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
            y: '1',
            a: 0,
            b: 0
        }, {
            y: '2',
            a: 6,
            b: 4
        }, {
            y: '3',
            a: 20,
            b: 13
        }, {
            y: '4',
            a: 27,
            b: 23
        }, {
            y: '5',
            a: 7,
            b: 3
        }],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Planejamento Status 2016', 'Planejamento Meta 2017'],
        hideHover: 'auto',
        resize: true
    });
    
});
