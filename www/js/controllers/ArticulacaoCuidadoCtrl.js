angular.module('starter.controllers')

.controller('ArticulacaoCuidadoCtrl', function($scope, NgTableParams, CuidadosMock, PacientesMock, $cordovaSQLite) {
    var articulacoes = [];
    console.log('Busca de articulacoes');
    var db = null;
    if (window.cordova) {
        db = $cordovaSQLite.openDB({
            name: "cuidato.db"
        }); // device
    } else {
        db = window.openDatabase("cuidato.db", '1', 'cuidato', 1024 * 1024 * 100); // browser
    }

    var query = "SELECT * FROM pacientes AS p JOIN cuidados AS c ON p.id = c.id_paciente WHERE c.status = 'afazer'";
    $cordovaSQLite.execute(db, query).then(function(res) {
        // alert('success 1');
        if (res.rows.length > 0) {
            for (var i = 0; i < res.rows.length; i++) {
                articulacoes.push({
                    id: res.rows.item(i).id,
                    id_paciente: res.rows.item(i).id_paciente,
                    paciente: res.rows.item(i).nome,
                    descricao: res.rows.item(i).descricao,
                    status: res.rows.item(i).status,
                    articulacao: res.rows.item(i).articulacao
                });
            }
            // alert('success busca');

            var initialParams = {
                count: articulacoes.length // initial page size
            };

            var initialSettings = {
                // page size buttons (right set of buttons in demo)
                counts: [],
                data: articulacoes
            };
            $scope.tableParams = new NgTableParams(initialParams, initialSettings);
        } else {
            console.log("No results found");
        }
    }, function(err) {
        // alert('error BUSCA');
    });
});