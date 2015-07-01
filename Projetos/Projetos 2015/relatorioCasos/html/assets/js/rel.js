var gerarRel = angular.module('relDownloadsCasos',[]);

gerarRel.controller('topCasosMeses', ['$scope', function($scope) {

	/* Total geral no mês */
	//  atualizar estes valores no arquivo main.js [gráfico]
	$scope.general = [
		{ 'Janeiro'   :  134 },
		{ 'Fevereiro' :  254 },
		{ 'Março' 	  :  552 },
		{ 'Abril' 	  :  476 },
		{ 'Maio' 	  :  488 },
		{ 'Junho' 	  :  402 },
		{ 'Julho' 	  :  0 },
		{ 'Agosto' 	  :  0 },
		{ 'Setembro'  :  0 },
		{ 'Outubro'   :  0 },
		{ 'Novembro'  :  0 },
		{ 'Dezembro'  :  0 }
	];

	/* Top caso por mês */
	$scope.topCasosJan = [
		{
			'nameCaso' : 	'Banco de Investimentos Garantia',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-ae/ae-p0010/',
			'numbCaso' : 	'15'
		},
		{
			'nameCaso' : 	'Cacau Show: marketing estratégico para o crescimento sustentável',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-mk/ae-p0021/',
			'numbCaso' : 	'12'
		},
		{
			'nameCaso' : 	'A.R. Mineira: quanto vale a empresa?',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-ff/ff-p0005/',
			'numbCaso' : 	'11'
		}
	];
	$scope.topCasosFev = [
		{
			'nameCaso' : 	'Zetrasoft: como melhorar o clima organizacional?',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-cr/cr-p0004/',
			'numbCaso' : 	'32'
		},
		{
			'nameCaso' : 	'Cacau Show: marketing estratégico para o crescimento sustentável.',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-mk/ae-p0021/',
			'numbCaso' : 	'30'
		},
		{
			'nameCaso' : 	'A.R. Mineira: quanto vale a empresa?',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-ff/ff-p0005/',
			'numbCaso' : 	'24'
		}
	];
	$scope.topCasosMar = [
		{
			'nameCaso' : 	'Cacau Show: marketing estratégico para o crescimento sustentável.',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-mk/ae-p0021/',
			'numbCaso' : 	'68'
		},
		{
			'nameCaso' : 	'Zetrasoft: como melhorar o clima organizacional?',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-cr/cr-p0004/',
			'numbCaso' : 	'56'
		},
		{
			'nameCaso' : 	'A.R. Mineira: quanto vale a empresa?',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-ff/ff-p0005/',
			'numbCaso' : 	'48'
		}
	];
	$scope.topCasosAbr = [
		{
			'nameCaso' : 	'Cacau Show: marketing estratégico para o crescimento sustentável.',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-mk/ae-p0021/',
			'numbCaso' : 	'67'
		},
		{
			'nameCaso' : 	'A.R. Mineira: quanto vale a empresa?',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-ff/ff-p0005/',
			'numbCaso' : 	'39'
		},
		{
			'nameCaso' : 	'Cadeados Papaiz.',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-mk/mk-p0004/',
			'numbCaso' : 	'39'
		}
	];
	$scope.topCasosMai = [
		{
			'nameCaso' : 	'A.R. Mineira: quanto vale a empresa?',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-ff/ff-p0005/',
			'numbCaso' : 	'57'
		},
		{
			'nameCaso' : 	'Cacau Show: marketing estratégico para o crescimento sustentável.',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-mk/ae-p0021/',
			'numbCaso' : 	'54'
		},
		{
			'nameCaso' : 	'Burger King do Brasil: os desafios da expansão.',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-mk/mk-p0002/',
			'numbCaso' : 	'42'
		}
	];
	$scope.topCasosJun = [
		{
			'nameCaso' : 	'Cacau Show: marketing estratégico para o crescimento sustentável.',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-mk/ae-p0021/',
			'numbCaso' : 	'52'
		},
		{
			'nameCaso' : 	'A.R. Mineira: quanto vale a empresa?',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-ff/ff-p0005/',
			'numbCaso' : 	'37'
		},
		{
			'nameCaso' : 	'Zetrasoft: como melhorar o clima organizacional?',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-cr/cr-p0004/',
			'numbCaso' : 	'34'
		}

	];
	$scope.topCasosJul = [
		
	];
	$scope.topCasosAgo = [
		
	];
	$scope.topCasosSet = [
		
	];
	$scope.topCasosOut = [
		
	];
	$scope.topCasosNov = [
		
	];
	$scope.topCasosDez = [
		
	];
}]);

/* Top 10 */
// 1-5
gerarRel.controller('top1-5', ['$scope', function($scope) {
	$scope.listEsq = [
		{
			'nameCaso' : 	'Cacau Show: marketing estratégico para o crescimento sustentável.',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-mk/ae-p0021/',
			'valueCaso': 	283
		},
		{
			'nameCaso' : 	'A.R. Mineira: quanto vale a empresa?',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-ff/ff-p0005/',
			'valueCaso': 	216
		},
		{
			'nameCaso' : 	'Zetrasoft: como melhorar o clima organizacional?',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-cr/cr-p0004/',
			'valueCaso': 	210
		},
		{
			'nameCaso' : 	'Burger King do Brasil: os desafios da expansão.',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-mk/mk-p0002/',
			'valueCaso': 	177
		},
		{
			'nameCaso' : 	'Cadeados Papaiz.',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-mk/mk-p0004/',
			'valueCaso': 	144
		}
	];
}]);

// 6-10
gerarRel.controller('top6-10', ['$scope', function($scope) {
	$scope.listDir = [
		{
			'nameCaso' : 	'Banco de Investimentos Garantia',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-ae/ae-p0010/',
			'valueCaso': 	117
		},
		{
			'nameCaso' : 	'Natura e o desenvolvimento de uma cadeia de fornecimento sustentável na Amazônia.',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-ae/ae-p0025/',
			'valueCaso': 	111
		},
		{
			'nameCaso' : 	'Toddynho: Expansão com Prestígio.',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-mk/mk-p0003/',
			'valueCaso': 	101
		},
		{
			'nameCaso' : 	'Laboratório Stiefel Brasil: repensando o modelo de negócios.',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-op/op-p0001/',
			'valueCaso': 	81
		},
		{
			'nameCaso' : 	'Banco Real e o desafio da sustentabilidade',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-ae/ae-p0021/',
			'valueCaso': 	74
		}
	];
}]);