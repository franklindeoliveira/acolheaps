angular.module('starter.controllers')

.controller('AppCtrl', function($cordovaSQLite) {

    // // cria o banco de dados.
    // var db = null;
    // if (window.cordova) {
    //     db = $cordovaSQLite.openDB({
    //         name: "cuidato.db"
    //     }); // device
    // } else {
    //     db = window.openDatabase("cuidato.db", '1', 'cuidato', 1024 * 1024 * 100); // browser
    // }
    // $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS identificadores (id INTEGER PRIMARY KEY AUTOINCREMENT, identificador TEXT, status INTEGER DEFAULT 0);");
    // $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS pacientes (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, nu_prontuario TEXT, idade TEXT, nasc TEXT, escola TEXT, trabalho TEXT, respref TEXT, nvulnerab TEXT, telefone TEXT);");
    // $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS cuidados (id INTEGER PRIMARY KEY AUTOINCREMENT, id_paciente INTEGER, data TEXT, tipo TEXT, descricao TEXT, articulacao TEXT, status TEXT, FOREIGN KEY(id_paciente) REFERENCES pacientes(id));");
    // $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS demandas (id INTEGER PRIMARY KEY AUTOINCREMENT, id_paciente INTEGER, demandas_livres TEXT, problemas_codificados TEXT, FOREIGN KEY(id_paciente) REFERENCES pacientes(id));");
    // $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS contextos (id INTEGER PRIMARY KEY AUTOINCREMENT, id_paciente INTEGER, familiar TEXT, cotidiano TEXT, participacao_social TEXT, tecnologias_apoio TEXT, genograma TEXT, FOREIGN KEY(id_paciente) REFERENCES pacientes(id));");

    // // inicializa o banco de dados.
    // var query = '';
    // var query = "SELECT id FROM identificadores WHERE identificador = 'is_apresentacao_visualizada'";
    // $cordovaSQLite.execute(db, query).then(function(res) {
    //     alert('success 1');
    //     if (res.rows.length > 0) {// se identificador jah existe...
    //         if (res.rows.item(0).status == 1) {// ... oculta a apresentação se ela já foi visualizada ...
    //             alert('Apresentacao já visualizada.');
    //         } else {// ... senão, exibe a apresentação
    //             alert('Apresentacao nao visualizada.');
    //         }
    //     } else {// cria o identificador
    //         query = "INSERT OR REPLACE INTO identificadores (identificador, status) VALUES (?,?)";
    //         var fields = [
    //             'is_apresentacao_visualizada', 0
    //         ];
    //         $cordovaSQLite.execute(db, query, fields).then(function(res) {
    //             alert('Identificador is_apresentacao_visualizada criado com sucesso.');
    //         }, function(err) {
    //             alert('Ocorreu um erro ao criar o identificador is_apresentacao_visualizada.');
    //         });
    //     }
    // }, function(err) {
    //     alert('error 1');
    // });

    
});