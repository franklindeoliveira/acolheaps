angular.module('starter.controllers')
    .factory('database', database);

function database($cordovaSQLite) {

    console.log('Busca de pacientes');
    var db = null;
    if (window.cordova) {
        db = $cordovaSQLite.openDB({
            name: "cuidato.db"
        }); // device
    } else {
        db = window.openDatabase("cuidato.db", '1', 'cuidato', 1024 * 1024 * 100); // browser
    }

    var service = {
        execute: execute
    };

    return service;

    function execute(query) {
        return $cordovaSQLite.execute(db, query).then(success, error);
    }

    function success(data) {
        console.log('DatabaseService carregado com sucesso.');
        return data;
    }

    function error(data) {
        console.log('Ocorreu um erro ao carregar o serviço DatabaseService.');
        return data;
    }
};