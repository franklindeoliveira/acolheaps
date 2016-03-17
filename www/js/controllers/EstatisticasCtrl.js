angular.module('starter.controllers')


.controller('EstatisticasCtrl', function($scope, NgTableParams, RegistrosMock, $cordovaSQLite) {

    var estatisticas = [];
    console.log('Busca de estatisticas');
    var db = null;
    if (window.cordova) {
        db = $cordovaSQLite.openDB({
            name: "cuidato.db"
        }); // device
    } else {
        db = window.openDatabase("cuidato.db", '1', 'cuidato', 1024 * 1024 * 100); // browser
    }

    var query = "SELECT * FROM pacientes AS p JOIN cuidados AS c ON p.id = c.id_paciente";
    $cordovaSQLite.execute(db, query).then(function(res) {
        // alert('success 1');
        if (res.rows.length >= 0) {
            for (var i = 0; i < res.rows.length; i++) {
                estatisticas.push({
                    id: res.rows.item(i).id,
                    id_paciente: res.rows.item(i).id_paciente,
                    nome: res.rows.item(i).nome,
                    data: res.rows.item(i).data,
                    idade: res.rows.item(i).idade,
                    numero_prontuario: res.rows.item(i).nu_prontuario,
                });
            }
            // alert('success busca');

            var initialParams = {
                count: RegistrosMock.length // initial page size
            };

            var initialSettings = {
                // page size buttons (right set of buttons in demo)
                counts: [],
                data: RegistrosMock
            };
            $scope.tableParams = new NgTableParams(initialParams, initialSettings);
        } else {
            console.log("No results found");
        }
    }, function(err) {
        // alert('error BUSCA');
    });
    // var initialParams = {
    //   count: 10 // initial page size
    // };
    // var initialSettings = {
    //   // page size buttons (right set of buttons in demo)
    //   counts: [],
    //   // determines the pager buttons (left set of buttons in demo)
    //   paginationMaxBlocks: 13,
    //   paginationMinBlocks: 2,
    //   data: RegistrosMock
    // };
    // $scope.tableParams = new NgTableParams(initialParams, initialSettings);

    $scope.criterios = {
        idade: {
            de: 0,
            ate: null
        },
        data: {
            de: null,
            ate: null
        }
    };

    $scope.limparFiltros = function() {
        $scope.criterios = {
            idade: {
                de: 0,
                ate: null
            },
            data: {
                de: null,
                ate: null
            }
        };
    };

    $scope.estatisticasFilter = function(criterios) {
        return function(registro) {
            return (registro.idade >= criterios.idade.de) && ((registro.idade <= criterios.idade.ate) || criterios.idade.ate == null) && ( (new Date(registro.data) >= criterios.data.de)  );
        };
    };
});