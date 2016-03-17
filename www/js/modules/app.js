// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngTable', 'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite, $state) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

        // cria o banco de dados.
        var db = null;
        if (window.cordova) {
            db = $cordovaSQLite.openDB({
                name: "cuidato.db"
            }); // device
        } else {
            db = window.openDatabase("cuidato.db", '1', 'cuidato', 1024 * 1024 * 100); // browser
        }
        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS identificadores (id INTEGER PRIMARY KEY, identificador TEXT, status INTEGER);");
        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS pacientes (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, nu_prontuario TEXT, idade TEXT, nasc TEXT, escola TEXT, trabalho TEXT, respref TEXT, nvulnerab TEXT, telefone TEXT);");
        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS cuidados (id INTEGER PRIMARY KEY AUTOINCREMENT, id_paciente INTEGER, data TEXT, tipo TEXT, descricao TEXT, articulacao TEXT, status TEXT, FOREIGN KEY(id_paciente) REFERENCES pacientes(id));");
        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS demandas (id INTEGER PRIMARY KEY AUTOINCREMENT, id_paciente INTEGER, demandas_livres TEXT, problemas_codificados TEXT, FOREIGN KEY(id_paciente) REFERENCES pacientes(id));");
        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS contextos (id INTEGER PRIMARY KEY AUTOINCREMENT, id_paciente INTEGER, familiar TEXT, cotidiano TEXT, participacao_social TEXT, tecnologias_apoio TEXT, genograma TEXT, FOREIGN KEY(id_paciente) REFERENCES pacientes(id));");


        // inicializa o banco de dados.
        var query = '';
        var query = "SELECT * FROM identificadores WHERE identificador = 'is_apresentacao_visualizada'";
        $cordovaSQLite.execute(db, query).then(function(res) {
            // alert('success 1');
            // alert(res.rows.length);
            if (res.rows.length > 0) { // se identificador jah existe...
                // alert(res.rows.item(0).status);
                if (res.rows.item(0).status == 1) { // ... oculta a apresentação se ela já foi visualizada ...
                    // alert('Apresentacao já visualizada.');
                    $state.go('app.articulacao'); // vai para tela de articulacoes do cuidado.
                } else { // ... senão, exibe a apresentação
                    // alert('Apresentacao nao visualizada.');
                }
            } else { // cria o identificador
                query = "INSERT OR REPLACE INTO identificadores (id, identificador, status) VALUES (?,?,?)";
                var fields = [
                    1, 'is_apresentacao_visualizada', 0
                ];
                $cordovaSQLite.execute(db, query, fields).then(function(res) {
                    // alert('Identificador is_apresentacao_visualizada criado com sucesso.');
                }, function(err) {
                    // alert('Ocorreu um erro ao criar o identificador is_apresentacao_visualizada.');
                });
            }
        }, function(err) {
            // alert('error 1');
        });
    });

})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    // $ionicConfigProvider.views.maxCache(0); // desabilita o cache.. obs: utilizar cache futuramente
    $stateProvider
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'AppCtrl'
        })
        .state('app.busca', {
            url: '/busca/pacientes',
            views: {
                'menuContent': {
                    templateUrl: 'templates/busca-pacientes.html',
                    controller: 'BuscaPacientesCtrl'
                }
            }
        })
        .state('app.articulacao', {
            url: '/articulacao/cuidado',
            views: {
                'menuContent': {
                    templateUrl: 'templates/articulacao-cuidado.html',
                    controller: 'ArticulacaoCuidadoCtrl'
                }
            }
        })
        .state('app.estatisticas', {
            url: '/estatisticas',
            views: {
                'menuContent': {
                    templateUrl: 'templates/estatisticas.html',
                    controller: 'EstatisticasCtrl'
                }
            }
        })
        .state('app.sobre', {
            url: '/sobre',
            views: {
                'menuContent': {
                    templateUrl: 'templates/sobre.html'
                }
            }
        })
        .state('app.paciente-info', {
            url: '/paciente-info/:id/:tela/:id_cuidado',
            params: {
                id_cuidado: null
            },
            views: {
                'menuContent': {
                    templateUrl: 'templates/paciente-info.html',
                    controller: 'PacienteInfoCtrl'
                }
            }
        })
        .state('app.paciente-add', {
            url: '/paciente-add',
            views: {
                'menuContent': {
                    templateUrl: 'templates/paciente-add.html',
                    controller: 'PacienteAddCtrl'
                }
            }
        });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app');
});