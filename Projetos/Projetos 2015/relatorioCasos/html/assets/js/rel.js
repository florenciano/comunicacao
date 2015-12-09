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
		{ 'Julho' 	  :  300 },
		{ 'Agosto' 	  :  520 },
		{ 'Setembro'  :  633 },
		{ 'Outubro'   :  655 },
		{ 'Novembro'  :  733 },
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
		{
			'nameCaso' : 	'A.R. Mineira: quanto vale a empresa?',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-ff/ff-p0005/',
			'numbCaso' : 	'33'
		},
		{
			'nameCaso' : 	'Burger King do Brasil: os desafios da expansão.',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-mk/mk-p0002/',
			'numbCaso' : 	'33'
		},
		{
			'nameCaso' : 	'Cacau Show: marketing estratégico para o crescimento sustentável.',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-mk/ae-p0021/',
			'numbCaso' : 	'29'
		}
	];
	$scope.topCasosAgo = [
		{
			'nameCaso' : 	'Burger King do Brasil: os desafios da expansão.',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-mk/mk-p0002/',
			'numbCaso' : 	'58'
		},
		{
			'nameCaso' : 	'Cacau Show: marketing estratégico para o crescimento sustentável.',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-mk/ae-p0021/',
			'numbCaso' : 	'53'
		},
		{
			'nameCaso' : 	'A.R. Mineira: quanto vale a empresa?',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-ff/ff-p0005/',
			'numbCaso' : 	'52'
		}
	];
	$scope.topCasosSet = [
		{
			'nameCaso' : 	'Cacau Show: marketing estratégico para o crescimento sustentável.',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-mk/ae-p0021/',
			'numbCaso' : 	'73'
		},
		{
			'nameCaso' : 	'A.R. Mineira: quanto vale a empresa?',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-ff/ff-p0005/',
			'numbCaso' : 	'71'
		},
		{
			'nameCaso' : 	'Burger King do Brasil: os desafios da expansão.',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-mk/mk-p0002/',
			'numbCaso' : 	'52'
		}
	];
	$scope.topCasosOut = [
		{
			'nameCaso' : 	'A.R. Mineira: quanto vale a empresa?',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-ff/ff-p0005/',
			'numbCaso' : 	'69'
		},
		{
			'nameCaso' : 	'Burger King do Brasil: os desafios da expansão.',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-mk/mk-p0002/',
			'numbCaso' : 	'67'
		},
		{
			'nameCaso' : 	'Zetrasoft: como melhorar o clima organizacional?',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-cr/cr-p0004/',
			'numbCaso': 	'55'
		}
	];
	$scope.topCasosNov = [
		{
			'nameCaso' : 	'Casos Sabores da Serra',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-ff/caso-sabores-da-serra/',
			'numbCaso' : 	'136'
		},
		{
			'nameCaso' : 	'Cacau Show: marketing estratégico para o crescimento sustentável.',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-mk/ae-p0021/',
			'numbCaso' : 	'63'
		},
		{
			'nameCaso' : 	'A.R. Mineira: quanto vale a empresa?',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-ff/ff-p0005/',
			'numbCaso' : 	'61'
		}
		
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
			'valueCaso': 	552
		},
		{
			'nameCaso' : 	'A.R. Mineira: quanto vale a empresa?',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-ff/ff-p0005/',
			'valueCaso': 	502
		},
		{
			'nameCaso' : 	'Burger King do Brasil: os desafios da expansão.',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-mk/mk-p0002/',
			'valueCaso': 	440
		},
		{
			'nameCaso' : 	'Zetrasoft: como melhorar o clima organizacional?',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-cr/cr-p0004/',
			'valueCaso': 	428
		},
		{
			'nameCaso' : 	'Cadeados Papaiz.',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-mk/mk-p0004/',
			'valueCaso': 	288
		}
	];
}]);

// 6-10
gerarRel.controller('top6-10', ['$scope', function($scope) {
	$scope.listDir = [
		{
			'nameCaso' : 	'Banco de Investimentos Garantia',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-ae/ae-p0010/',
			'valueCaso': 	228
		},
		{
			'nameCaso' : 	'Natura e o desenvolvimento de uma cadeia de fornecimento sustentável na Amazônia.',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-ae/ae-p0025/',
			'valueCaso': 	221
		},
		{
			'nameCaso' : 	'Toddynho: Expansão com Prestígio.',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-mk/mk-p0003/',
			'valueCaso': 	214
		},
		{
			'nameCaso' : 	'Casos Sabores da Serra.',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-ff/ff-p0005/',
			'valueCaso': 	185
		},
		{
			'nameCaso' : 	'Sucesso e continuidade do Habibs.',
			'linkCaso' : 	'http://www.insper.edu.br/casos/colecao-ae/ae-p0026/',
			'valueCaso': 	171
		}
	];
}]);