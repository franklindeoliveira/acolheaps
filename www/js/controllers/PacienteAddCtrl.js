angular.module('starter.controllers')

.controller('PacienteAddCtrl', function($scope, $cordovaSQLite) {
    $scope.paciente = {
        nome: '',
        idade: '',
        nasc: '',
        numero_prontuario: '',
        telefone: '',
        escola: '',
        trabalho: '',
        respref: '',
        nvulnerab: ''
    };

    $scope.insert = function() {
        var db = null;
        if (window.cordova) {
            db = $cordovaSQLite.openDB({
                name: "cuidato.db"
            }); // device
        } else {
            db = window.openDatabase("cuidato.db", '1', 'cuidato', 1024 * 1024 * 100); // browser
        }

        var query = "INSERT OR REPLACE INTO pacientes (nome, nu_prontuario, idade, nasc, escola, trabalho, respref, nvulnerab, telefone) VALUES (?,?,?,?,?,?,?,?,?)";
        var fields = [
            $scope.paciente.nome, $scope.paciente.numero_prontuario, $scope.paciente.idade, $scope.paciente.nasc,
            $scope.paciente.escola, $scope.paciente.trabalho, $scope.paciente.respref, $scope.paciente.nvulnerab, $scope.paciente.telefone
        ];
        $cordovaSQLite.execute(db, query, fields).then(function(res) {
            console.log('Paciente cadastrado com sucesso.');
        }, function(err) {
            // exibir mensagem de erro ao usuário.
            console.log('Ocorreu um erro ao cadastrar o paciente.');
        });

    };
});