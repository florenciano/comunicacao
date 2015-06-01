var gerarRel = angular.module('relDownloadsCasos',[]);

gerarRel.controller('topCasosMeses', ['$scope', function($scope) {

	/* Total geral no mês */
	$scope.general = [
		{ 'Janeiro'   :  368 },
		{ 'Fevereiro' :  442 },
		{ 'Março' 	  :  573 },
		{ 'Abril' 	  :  610 },
		{ 'Maio' 	  :  547 },
		{ 'Junho' 	  :  0 },
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
			'nameCaso' : 	'Mextra Engenharia Extrativa de Metais (A): uma nova liderança reinventa o modelo de negócios.',
			'linkCaso' : 	'#1',
			'numbCaso' : 	'99'
		},
		{
			'nameCaso' : 	'Cacau Show: marketing estratégico para o crescimento sustentável.',
			'linkCaso' : 	'#2',
			'numbCaso' : 	'82'
		},
		{
			'nameCaso' : 	'Natura e o desenvolvimento de uma cadeia de fornecimento sustentável na Amazônia.',
			'linkCaso' : 	'#3',
			'numbCaso' : 	'56'
		}
	];
	$scope.topCasosFev = [
		{
			'nameCaso' : 	'Mextra Engenharia Extrativa de Metais (A): uma nova liderança reinventa o modelo de negócios.',
			'linkCaso' : 	'#1',
			'numbCaso' : 	'99'
		},
		{
			'nameCaso' : 	'Cacau Show: marketing estratégico para o crescimento sustentável.',
			'linkCaso' : 	'#2',
			'numbCaso' : 	'82'
		},
		{
			'nameCaso' : 	'Natura e o desenvolvimento de uma cadeia de fornecimento sustentável na Amazônia.',
			'linkCaso' : 	'#3',
			'numbCaso' : 	'56'
		}
	];
	$scope.topCasosMar = [
		{
			'nameCaso' : 	'Mextra Engenharia Extrativa de Metais (A): uma nova liderança reinventa o modelo de negócios.',
			'linkCaso' : 	'#1',
			'numbCaso' : 	'99'
		},
		{
			'nameCaso' : 	'Cacau Show: marketing estratégico para o crescimento sustentável.',
			'linkCaso' : 	'#2',
			'numbCaso' : 	'82'
		},
		{
			'nameCaso' : 	'Natura e o desenvolvimento de uma cadeia de fornecimento sustentável na Amazônia.',
			'linkCaso' : 	'#3',
			'numbCaso' : 	'56'
		}
	];
	$scope.topCasosAbr = [
		{
			'nameCaso' : 	'Mextra Engenharia Extrativa de Metais (A): uma nova liderança reinventa o modelo de negócios.',
			'linkCaso' : 	'#1',
			'numbCaso' : 	'99'
		},
		{
			'nameCaso' : 	'Cacau Show: marketing estratégico para o crescimento sustentável.',
			'linkCaso' : 	'#2',
			'numbCaso' : 	'82'
		},
		{
			'nameCaso' : 	'Natura e o desenvolvimento de uma cadeia de fornecimento sustentável na Amazônia.',
			'linkCaso' : 	'#3',
			'numbCaso' : 	'56'
		}
	];
	$scope.topCasosMai = [
		{
			'nameCaso' : 	'Mextra Engenharia Extrativa de Metais (A): uma nova liderança reinventa o modelo de negócios.',
			'linkCaso' : 	'#1',
			'numbCaso' : 	'99'
		},
		{
			'nameCaso' : 	'Cacau Show: marketing estratégico para o crescimento sustentável.',
			'linkCaso' : 	'#2',
			'numbCaso' : 	'82'
		},
		{
			'nameCaso' : 	'Natura e o desenvolvimento de uma cadeia de fornecimento sustentável na Amazônia.',
			'linkCaso' : 	'#3',
			'numbCaso' : 	'56'
		}
	];
	$scope.topCasosJun = [
		{
			'nameCaso' : 	'Mextra Engenharia Extrativa de Metais (A): uma nova liderança reinventa o modelo de negócios.',
			'linkCaso' : 	'#1',
			'numbCaso' : 	'99'
		},
		{
			'nameCaso' : 	'Cacau Show: marketing estratégico para o crescimento sustentável.',
			'linkCaso' : 	'#2',
			'numbCaso' : 	'82'
		},
		{
			'nameCaso' : 	'Natura e o desenvolvimento de uma cadeia de fornecimento sustentável na Amazônia.',
			'linkCaso' : 	'#3',
			'numbCaso' : 	'56'
		}
	];
	$scope.topCasosJul = [
		{
			'nameCaso' : 	'Mextra Engenharia Extrativa de Metais (A): uma nova liderança reinventa o modelo de negócios.',
			'linkCaso' : 	'#1',
			'numbCaso' : 	'99'
		},
		{
			'nameCaso' : 	'Cacau Show: marketing estratégico para o crescimento sustentável.',
			'linkCaso' : 	'#2',
			'numbCaso' : 	'82'
		},
		{
			'nameCaso' : 	'Natura e o desenvolvimento de uma cadeia de fornecimento sustentável na Amazônia.',
			'linkCaso' : 	'#3',
			'numbCaso' : 	'56'
		}
	];
	$scope.topCasosAgo = [
		{
			'nameCaso' : 	'Mextra Engenharia Extrativa de Metais (A): uma nova liderança reinventa o modelo de negócios.',
			'linkCaso' : 	'#1',
			'numbCaso' : 	'99'
		},
		{
			'nameCaso' : 	'Cacau Show: marketing estratégico para o crescimento sustentável.',
			'linkCaso' : 	'#2',
			'numbCaso' : 	'82'
		},
		{
			'nameCaso' : 	'Natura e o desenvolvimento de uma cadeia de fornecimento sustentável na Amazônia.',
			'linkCaso' : 	'#3',
			'numbCaso' : 	'56'
		}
	];
	$scope.topCasosSet = [
		{
			'nameCaso' : 	'Mextra Engenharia Extrativa de Metais (A): uma nova liderança reinventa o modelo de negócios.',
			'linkCaso' : 	'#1',
			'numbCaso' : 	'99'
		},
		{
			'nameCaso' : 	'Cacau Show: marketing estratégico para o crescimento sustentável.',
			'linkCaso' : 	'#2',
			'numbCaso' : 	'82'
		},
		{
			'nameCaso' : 	'Natura e o desenvolvimento de uma cadeia de fornecimento sustentável na Amazônia.',
			'linkCaso' : 	'#3',
			'numbCaso' : 	'56'
		}
	];
	$scope.topCasosOut = [
		{
			'nameCaso' : 	'Mextra Engenharia Extrativa de Metais (A): uma nova liderança reinventa o modelo de negócios.',
			'linkCaso' : 	'#1',
			'numbCaso' : 	'99'
		},
		{
			'nameCaso' : 	'Cacau Show: marketing estratégico para o crescimento sustentável.',
			'linkCaso' : 	'#2',
			'numbCaso' : 	'82'
		},
		{
			'nameCaso' : 	'Natura e o desenvolvimento de uma cadeia de fornecimento sustentável na Amazônia.',
			'linkCaso' : 	'#3',
			'numbCaso' : 	'56'
		}
	];
	$scope.topCasosNov = [
		{
			'nameCaso' : 	'Mextra Engenharia Extrativa de Metais (A): uma nova liderança reinventa o modelo de negócios.',
			'linkCaso' : 	'#1',
			'numbCaso' : 	'99'
		},
		{
			'nameCaso' : 	'Cacau Show: marketing estratégico para o crescimento sustentável.',
			'linkCaso' : 	'#2',
			'numbCaso' : 	'82'
		},
		{
			'nameCaso' : 	'Natura e o desenvolvimento de uma cadeia de fornecimento sustentável na Amazônia.',
			'linkCaso' : 	'#3',
			'numbCaso' : 	'56'
		}
	];
	$scope.topCasosDez = [
		{
			'nameCaso' : 	'Mextra Engenharia Extrativa de Metais (A): uma nova liderança reinventa o modelo de negócios.',
			'linkCaso' : 	'#1',
			'numbCaso' : 	'99'
		},
		{
			'nameCaso' : 	'Cacau Show: marketing estratégico para o crescimento sustentável.',
			'linkCaso' : 	'#2',
			'numbCaso' : 	'82'
		},
		{
			'nameCaso' : 	'Natura e o desenvolvimento de uma cadeia de fornecimento sustentável na Amazônia.',
			'linkCaso' : 	'#3',
			'numbCaso' : 	'56'
		}
	];
}]);

/* Top 10 */
// 1-5
gerarRel.controller('top1-5', ['$scope', function($scope) {
	$scope.listEsq = [
		{
			'nameCaso' : 	'Cacau Show: marketing estratégico para o crescimento sustentável.',
			'linkCaso' : 	'*11',
			'valueCaso': 	1259
		},
		{
			'nameCaso' : 	'Zetrasoft: como melhorar o clima organizacional?',
			'linkCaso' : 	'*12',
			'valueCaso': 	1076
		},
		{
			'nameCaso' : 	'A.R. Mineira: quanto vale a empresa?',
			'linkCaso' : 	'*13',
			'valueCaso': 	963
		},
		{
			'nameCaso' : 	'Sucesso e continuidade do Habibs.',
			'linkCaso' : 	'*14',
			'valueCaso': 	834
		},
		{
			'nameCaso' : 	'Braskem: a construção de uma petroquímica de porte global.',
			'linkCaso' : 	'*15',
			'valueCaso': 	798
		}
	];
}]);

// 6-10
gerarRel.controller('top6-10', ['$scope', function($scope) {
	$scope.listDir = [
		{
			'nameCaso' : 	'Meu UDB: um funcionário, uma idéia e sua luta para implementá-la.',
			'linkCaso' : 	'*16',
			'valueCaso': 	657
		},
		{
			'nameCaso' : 	'Cooxup e a indústria mundial do café: estratégias para aumentar a receita do produtor.',
			'linkCaso' : 	'*17',
			'valueCaso': 	524
		},
		{
			'nameCaso' : 	'Mextra Engenharia Extrativa de Metais (A): uma nova liderança reinventa o modelo de negócios.',
			'linkCaso' : 	'*18',
			'valueCaso': 	310
		},
		{
			'nameCaso' : 	'SThe Biocultural Diversity Conservancy: Identificando Caminhos para Retribuir Comunidade.',
			'linkCaso' : 	'*19',
			'valueCaso': 	209
		},
		{
			'nameCaso' : 	'Martima Seguros: oferta pública inicial ou outra alternativa?',
			'linkCaso' : 	'*20',
			'valueCaso': 	78
		}
	];
}]);