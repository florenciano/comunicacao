$(function() {

    /******************************************************
    //  Workshops
    ******************************************************/
    
    //  Princípios Integradores da Graduação
    Morris.Donut({
        element: 'workshop-principios-integradores-graduacao',
        data: [{
            label: "Engenharia",
            value: 3
        }, {
            label: "DEA",
            value: 1
        }, {
            label: "Adm/Eco",
            value: 7
        }],
        resize: true
    });

    //  Design Thinking
    Morris.Donut({
        element: 'workshop-design-thinking',
        data: [{
            label: "Engenharia",
            value: 7
        }, {
            label: "DEA",
            value: 2
        }, {
            label: "Adm/Eco",
            value: 25
        }],
        resize: true
    });

    // Design Thinking - feedback participantes GOSTEI
    Morris.Bar({
        element: 'workshop-design-thinking-gostei',
        data: [{
            y: 'Prático/Aplicado',
            a: 5
        }, {
            y: 'Interação com alunos',
            a: 5
        }, {
            y: 'Foco no aluno',
            a: 3
        }, {
            y: 'Aprendizado/Novas ideias',
            a: 3
        }, {
            y: 'Condução da dinâmica',
            a: 2
        }, {
            y: 'Sair da zona do conforto',
            a: 1
        }],
        xkey: 'y',
        ykeys: ['a'],
        ymax: 5,
        numLines: 6,
        xLabelMargin: 10,
        barColors: ['#5cb85c'],
        // xLabelAngle: 25,
        labels: ['Gostei'],
        hideHover: 'auto',
        resize: true,
    });

     // Design Thinking - feedback participantes GOSTARIA
    Morris.Bar({
        element: 'workshop-design-thinking-gostaria',
        data: [{
            y: 'Receber material',
            a: 3
        }, {
            y: 'Projeto na prática',
            a: 3
        }, {
            y: 'Versão 2.0',
            a: 3
        }, {
            y: 'Ajuda individual',
            a: 3
        }, {
            y: 'Alunos de outros perfis',
            a: 3
        }, {
            y: 'Mais dinâmicas',
            a: 2
        }, {
            y: 'Tópicos mais específicos',
            a: 1
        }],
        xkey: 'y',
        ykeys: ['a'],
        ymax: 5,
        numLines: 6,
        xLabelMargin: 10,
        barColors: ['#F0AD4F'],
        // xLabelAngle: 25,
        labels: ['Gostaria'],
        hideHover: 'auto',
        resize: true,
    });

    Morris.Bar({
        element: 'workshop-design-thinking-nao-gostei',
        data: [{
            y: 'Dinâmica acelerada',
            a: 4
        }, {
            y: 'Workshop superficial',
            a: 2
        }, {
            y: 'Trocar alunos grupo',
            a: 1
        }, {
            y: 'Panelinhas',
            a: 1
        }, {
            y: 'Visão aluno como cliente',
            a: 1
        }],
        xkey: 'y',
        ykeys: ['a'],
        ymax: 5,
        numLines: 6,
        xLabelMargin: 10,
        barColors: ['#d9534f'],
        // xLabelAngle: 25,
        labels: ['Não Gostei'],
        hideHover: 'auto',
        resize: true,
    });

});
