angular.module('starter.controllers')

.controller('BuscaPacientesCtrl', function($scope, NgTableParams, PacientesMock, $cordovaSQLite, database) {
    var query = "SELECT * FROM pacientes";
    database.execute(query).then(function(res) {
        // alert('success 1');
        if (res.rows.length > 0) {
            var pacientes = [];
            for (var i = 0; i < res.rows.length; i++) {
                pacientes.push({
                    id: res.rows.item(i).id,
                    nome: res.rows.item(i).nome,
                    numero_prontuario: res.rows.item(i).nu_prontuario
                });
            }
            // alert('success busca');

            var initialParams = {
                count: pacientes.length // initial page size
            };

            var initialSettings = {
                // page size buttons (right set of buttons in demo)
                counts: [],
                data: pacientes
            };
            $scope.tableParams = new NgTableParams(initialParams, initialSettings);
        } else {
            console.log("No results found");
        }
    }, function(err) {
        // alert('error BUSCA');
    });
});