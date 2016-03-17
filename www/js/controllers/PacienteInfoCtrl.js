angular.module('starter.controllers')

.controller('PacienteInfoCtrl', function($q, $scope, $timeout, NgTableParams, $ionicModal, $stateParams, PacientesMock, CuidadosMock, $cordovaSQLite, $ionicTabsDelegate, $cordovaDevice, $cordovaFile, $cordovaCamera, $ionicPlatform) {
    console.log('Tab index selecionado: ' + $ionicTabsDelegate.selectedIndex());
    console.log('PacienteInfoCtrl');

    $scope.hasGenograma = false;
    $scope.srcGenograma = '';

    // models

    $scope.cuidado = {
        "id": -1,
        "id_paciente": "",
        "data": "",
        "tipo": "",
        "descricao": "",
        "articulacao": "",
        "status": ""
    };
    $scope.cuidados = [];
    $scope.paciente = {};
    $scope.demanda = {
        "id": -1
    };
    $scope.contexto = {
        "id": -1
    }

    $scope.onTabSelect = function(index) {
        console.log('Tab selecionada: ' + index);
        // alert(index);
        if (index == 0) { // cadastro
            carregaCadastro();
        } else
        if (index == 1) {
            buscaContexto();
        } else
        if (index == 2) {
            buscaDemanda();
        } else
        if (index == 3) {
            $scope.editar = false;
            $scope.cuidados_busca = true;
            $scope.cuidados_info = false;
            $scope.cuidados_add = false;
            buscaCuidados();
        }
    };

    function carregaCadastro() {
        // alert($stateParams.id);
        var db = null;
        if (window.cordova) {
            db = $cordovaSQLite.openDB({
                name: "cuidato.db"
            }); // device
        } else {
            db = window.openDatabase("cuidato.db", '1', 'cuidato', 1024 * 1024 * 100); // browser
        }
        // console.log($stateParams.id);
        var query = "SELECT * FROM pacientes WHERE id = " + $stateParams.id;
        $cordovaSQLite.execute(db, query).then(function(res) {
                if (res.rows.length > 0) {
                    for (var i = 0; i < res.rows.length; i++) {
                        $scope.paciente = {
                            id: res.rows.item(i).id,
                            nome: res.rows.item(i).nome,
                            idade: res.rows.item(i).idade,
                            nasc: new Date(res.rows.item(i).nasc),
                            numero_prontuario: res.rows.item(i).nu_prontuario,
                            telefone: res.rows.item(i).telefone,
                            escola: res.rows.item(i).escola,
                            trabalho: res.rows.item(i).trabalho,
                            respref: res.rows.item(i).respref,
                            nvulnerab: res.rows.item(i).nvulnerab
                        };
                    }
                } else {
                    console.log("No results found");
                }
                // alert('Paciente carregado com sucesso.');
            },
            function(err) {
                // exibir mensagem de erro para usuário...
                // alert('Ocorreuy um erro ao carregar o paciente.');
            });

    }



    $scope.editar = false;
    $scope.cuidados_busca = true;
    $scope.cuidados_info = false;
    $scope.cuidados_add = false;

    $scope.showEditar = function() {
        $scope.editar = true;
        console.log($scope.editar);
    };

    $scope.mostrarAdicionarCuidado = function() {
        $scope.cuidado = {
            "id": -1,
            "id_paciente": "",
            "data": "",
            "tipo": "",
            "descricao": "",
            "articulacao": "",
            "status": ""
        };
        $scope.cuidados_busca = false;
        $scope.cuidados_info = false;
        $scope.cuidados_add = true;
    };

    $scope.salvarDemanda = function() {
        var db = null;
        if (window.cordova) {
            db = $cordovaSQLite.openDB({
                name: "cuidato.db"
            }); // device
        } else {
            db = window.openDatabase("cuidato.db", '1', 'cuidato', 1024 * 1024 * 100); // browser
        }
        console.log($scope.paciente.id);
        console.log($scope.demanda);
        var query = '';
        var fields = null;
        if ($scope.demanda.id == -1) { // cria a demanda
            query = "INSERT OR REPLACE INTO demandas (id_paciente, demandas_livres, problemas_codificados) VALUES (?,?,?)";
            fields = [
                $scope.paciente.id, $scope.demanda.demandas_livres, $scope.demanda.problemas_codificados
            ];
            console.log(fields);
        } else { // atualiza a demanda
            query = "REPLACE INTO demandas (id, id_paciente, demandas_livres, problemas_codificados) VALUES (?,?,?,?)";
            fields = [
                $scope.demanda.id, $scope.paciente.id, $scope.demanda.demandas_livres, $scope.demanda.problemas_codificados
            ];
        }

        $cordovaSQLite.execute(db, query, fields).then(function(res) {
            console.log('sucesso ao salvar a demanda.');
            buscaDemanda();
        }, function(err) {
            console.log('erro');
        });
    };

    $scope.showTelaEditarCuidado = function(index) {
        console.log('Mostra tela editar cuidado: ' + index);
        $scope.cuidado = $scope.cuidados[index];
        // alert($scope.cuidado.status);
        console.log($scope.cuidado);
        console.log($scope.cuidados);
        $scope.cuidados_busca = false;
        $scope.cuidados_info = true;
        $scope.cuidados_add = false;
    };

    $scope.salvarCuidado = function() {
        console.log($scope.cuidado);
        console.log($scope.paciente);
        var db = null;
        if (window.cordova) {
            db = $cordovaSQLite.openDB({
                name: "cuidato.db"
            }); // device
        } else {
            db = window.openDatabase("cuidato.db", '1', 'cuidato', 1024 * 1024 * 100); // browser
        }

        var query = null;
        var fields = null;
        if ($scope.cuidado.id == -1) { // novo cuidado
            query = "INSERT INTO cuidados (id_paciente, data, tipo, descricao, articulacao, status) VALUES (?,?,?,?,?,?)";
            fields = [
                $scope.paciente.id, $scope.cuidado.data, $scope.cuidado.tipo, $scope.cuidado.descricao, $scope.cuidado.articulacao, $scope.cuidado.status
            ];
        } else { // atualiza cuidado
            query = "REPLACE INTO cuidados (id, id_paciente, data, tipo, descricao, articulacao, status) VALUES (?,?,?,?,?,?,?)";
            fields = [
                $scope.cuidado.id, $scope.paciente.id, $scope.cuidado.data, $scope.cuidado.tipo, $scope.cuidado.descricao, $scope.cuidado.articulacao, $scope.cuidado.status
            ];
        }
        console.log(query);
        console.log(fields);
        $cordovaSQLite.execute(db, query, fields).then(function(res) {
            console.log('sucesso');
            $scope.cuidados_busca = true;
            $scope.cuidados_info = false;
            $scope.cuidados_add = false;
            buscaCuidados();
        }, function(err) {
            //alert('erro salvarCuidado()');
        });
    };


    // tela = cadastro-info, cadastro-editar, contexto, demando, ciudados;
    console.log($stateParams.tela);
    if ($stateParams.tela == 'cuidados') {
        console.log('cuidados');
        console.log($scope.cuidados);
        $scope.cuidados_busca = true;

        $scope.cuidados_info = false;
        $scope.cuidados_add = false;
    } else if ($stateParams.tela == 'cuidados_info') {
        $scope.cuidados_busca = false;
        $scope.cuidados_info = true;
        $scope.cuidados_add = false;
        $scope.cuidado = CuidadosMock[$stateParams.id_cuidado];
    } else if ($stateParams.tela == 'cuidados_add') {
        // $scope.cuidados_busca = false;
        // $scope.cuidados_info = false;
        // $scope.cuidados_add = true;
    }

    try {
        if (cordova != null && cordova != undefined) {
            // alert('criando pastas 1');
            var path = cordova.file.externalApplicationStorageDirectory + '/files/';
            // alert(path);
            $cordovaFile.createDir(path, 'genogramas', false);
            // alert('criando pastas 2');
        };
    } catch (err) {
        // alert('erro');
    }

    function exibeGenograma() {
        try {
            if (cordova != null && cordova != undefined) {
                var pathGenograma = cordova.file.externalApplicationStorageDirectory + '/files/genogramas/';
                var fileGenograma = $stateParams.id + '_genograma.jpg';
                $cordovaFile.checkFile(pathGenograma, fileGenograma).then(function(success) {
                    //alert('sucesso checkFile ()');
                    $scope.pathGenograma = pathGenograma;
                    $scope.fileGenograma = fileGenograma;
                    $scope.srcGenograma = pathGenograma + fileGenograma;
                    // alert($scope.srcGenograma);
                    $scope.hasGenograma = true;
                    $scope.contexto.genograma = pathGenograma + fileGenograma;
                }, function(error) {
                    // error
                    //alert('erro checkFile ()');
                    $scope.hasGenograma = false;
                });
            }
        } catch (err) {
            //alert('erro exibeGenograma()');
        }
    }

    exibeGenograma();

    function optionsForType(type) {
        var source;
        switch (type) {
            case 0:
                source = Camera.PictureSourceType.CAMERA;
                break;
            case 1:
                source = Camera.PictureSourceType.PHOTOLIBRARY;
                break;
        }
        return {
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: source,
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
    }

    function saveMedia(type, id, imageURI) {
        // alert('executando saveMedia() ...');
        return $q(function(resolve, reject) {
            var options = optionsForType(type);
            var name = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            var namePath = imageURI.substr(0, imageURI.lastIndexOf('/') + 1);
            var newName = id + '_genograma.jpg';
            var newPath = cordova.file.externalApplicationStorageDirectory + '/files/genogramas/';

            $cordovaFile.copyFile(namePath, name, newPath, newName)
                .then(function(success) {
                    // alert('sucesso saveMedia()');
                    // exibeGenograma();
                    $scope.srcGenograma = imageURI;
                    $scope.hasGenograma = true;
                    // $state.go($state.currentState, {}, {reload:true});
                    resolve();
                }, function(error) {
                    // alert('erro saveMedia()');
                    reject();
                });
        });
    }

    // ok jah esta funcionando
    $scope.getPhoto = function() {
        // alert('getPhoto()');
        navigator.camera.getPicture(function(imageURI) {
            // imageURI is the URL of the image that we can use for
            // an <img> element or backgroundImage.
            saveMedia(0, $stateParams.id, imageURI).then(function() {
                $scope.$apply();
            });
        }, function(err) {
            //alert('erro getPhoto()');
        }, {});
    };

    // funcionando!!!
    $ionicModal.fromTemplateUrl('templates/paciente-genograma.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.openModal = function() {
        // alert('openModal()');
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
        // Execute action
    });

    // funcionando!!!
    $scope.compartilhar = function(paciente, cuidado) {
        if (window.plugins) {
            var mensagem = '\n' +
                'Data: ' + cuidado.data + '\n' +
                'Descrição: ' + cuidado.descricao + '\n' +
                'Articulação: ' + cuidado.articulacao + '\n' +
                'Status: ' + cuidado.status;
            var assunto = paciente.nome + '-' + paciente.numero_prontuario + '\n';
            var anexo = null;
            var link = null;

            window.plugins.socialsharing
                .share(mensagem, assunto, anexo, link) // Share via native share sheet
                .then(function(result) {
                    // Success!
                }, function(err) {
                    // exibir mensagem de erro para usuário...
                });
        }
    };

    $scope.cancelar = function() {
        carregaCadastro();
        $scope.editar = false;
    }

    $scope.salvar = function() {
        // alert('salvar');
        console.log($scope.paciente);
        var db = null;
        if (window.cordova) {
            db = $cordovaSQLite.openDB({
                name: "cuidato.db"
            }); // device
        } else {
            db = window.openDatabase("cuidato.db", '1', 'cuidato', 1024 * 1024 * 100); // browser
        }

        var query = "INSERT OR REPLACE INTO pacientes (id, nome, nu_prontuario, idade, nasc, escola, trabalho, respref, nvulnerab, telefone) VALUES (?,?,?,?,?,?,?,?,?,?)";
        var fields = [
            $scope.paciente.id, $scope.paciente.nome, $scope.paciente.numero_prontuario, $scope.paciente.idade, $scope.paciente.nasc,
            $scope.paciente.escola, $scope.paciente.trabalho, $scope.paciente.respref, $scope.paciente.nvulnerab, $scope.paciente.telefone
        ];
        $cordovaSQLite.execute(db, query, fields).then(function(res) {
            console.log('sucesso salvar');
            $scope.editar = false;
            console.log();
            // $cordovaSQLite.execute(db, query, [id, nome, nu_prontuario, idade, nasc, pront, escola, trabalho, respref, nvulnerab]).then(function(res) {

        }, function(err) {
            console.log('erro');

        });

    };

    function buscaCuidados() {
        var db = null;
        if (window.cordova) {
            db = $cordovaSQLite.openDB({
                name: "cuidato.db"
            }); // device
        } else {
            db = window.openDatabase("cuidato.db", '1', 'cuidato', 1024 * 1024 * 100); // browser
        }
        var query = "SELECT * FROM cuidados WHERE id_paciente = " + $scope.paciente.id;

        $cordovaSQLite.execute(db, query).then(function(res) {

                $scope.cuidados = [];
                if (res.rows.length > 0) {
                    for (var i = 0; i < res.rows.length; i++) {
                        $scope.cuidados.push({
                            id: res.rows.item(i).id,
                            data: new Date(res.rows.item(i).data),
                            tipo: res.rows.item(i).tipo,
                            descricao: res.rows.item(i).descricao,
                            articulacao: res.rows.item(i).articulacao,
                            status: res.rows.item(i).status
                        });
                    }
                } else {
                    console.log("Sem cuidados cadastrados.");

                }
                var initialParams = {
                    count: $scope.cuidados.length // initial page size
                };

                var initialSettings = {
                    // page size buttons (right set of buttons in demo)
                    counts: [],
                    data: $scope.cuidados
                };
                $scope.tableParams = new NgTableParams(initialParams, initialSettings);
            },
            function(err) {

                // exibir mensagem de erro para usuário...
            });
    }

    function buscaDemanda() {
        var db = null;
        if (window.cordova) {
            db = $cordovaSQLite.openDB({
                name: "cuidato.db"
            }); // device
        } else {
            db = window.openDatabase("cuidato.db", '1', 'cuidato', 1024 * 1024 * 100); // browser
        }
        console.log($stateParams.id);
        var query = "SELECT * FROM demandas WHERE id_paciente = " + $stateParams.id;
        $cordovaSQLite.execute(db, query).then(function(res) {
                if (res.rows.length > 0) {
                    for (var i = 0; i < res.rows.length; i++) {
                        $scope.demanda = {
                            id: res.rows.item(i).id,
                            id_paciente: res.rows.item(i).id_paciente,
                            demandas_livres: res.rows.item(i).demandas_livres,
                            problemas_codificados: res.rows.item(i).problemas_codificados
                        };
                    }
                } else {
                    console.log("No results found demandas");

                }
            },
            function(err) {

                // exibir mensagem de erro para usuário...
            });
    }

    $scope.salvarContexto = function() {
        console.log($scope.cuidado);
        console.log($scope.paciente);
        var db = null;
        if (window.cordova) {
            db = $cordovaSQLite.openDB({
                name: "cuidato.db"
            }); // device
        } else {
            db = window.openDatabase("cuidato.db", '1', 'cuidato', 1024 * 1024 * 100); // browser
        }

        var query = null;
        var fields = null;
        if ($scope.contexto.id == -1) { // novo contexto
            query = "INSERT INTO contextos (id_paciente, familiar, cotidiano, participacao_social, tecnologias_apoio, genograma) VALUES (?,?,?,?,?,?)";
            fields = [
                $scope.paciente.id, $scope.contexto.familiar, $scope.contexto.cotidiano, $scope.contexto.participacao_social, $scope.contexto.tecnologias_apoio, $scope.contexto.genograma
            ];
        } else { // atualiza contexto
            query = "REPLACE INTO contextos (id, id_paciente, familiar, cotidiano, participacao_social, tecnologias_apoio) VALUES (?,?,?,?,?,?,?)";
            fields = [
                $scope.contexto.id, $scope.paciente.id, $scope.contexto.familiar, $scope.contexto.cotidiano, $scope.contexto.participacao_social, $scope.contexto.tecnologias_apoio, $scope.contexto.genograma
            ];
        }
        console.log(query);
        console.log(fields);
        $cordovaSQLite.execute(db, query, fields).then(function(res) {
            console.log('sucesso contexto');
            buscaContexto();
        }, function(err) {
            console.log('erro');
        });
    }

    function buscaContexto() {
        var db = null;
        if (window.cordova) {
            db = $cordovaSQLite.openDB({
                name: "cuidato.db"
            }); // device
        } else {
            db = window.openDatabase("cuidato.db", '1', 'cuidato', 1024 * 1024 * 100); // browser
        }
        console.log($stateParams.id);
        var query = "SELECT * FROM contextos WHERE id_paciente = " + $stateParams.id;
        $cordovaSQLite.execute(db, query).then(function(res) {
                if (res.rows.length > 0) {
                    for (var i = 0; i < res.rows.length; i++) {
                        $scope.contexto = {
                            id: res.rows.item(i).id,
                            id_paciente: res.rows.item(i).id_paciente,
                            familiar: res.rows.item(i).familiar,
                            cotidiano: res.rows.item(i).cotidiano,
                            participacao_social: res.rows.item(i).participacao_social,
                            tecnologias_apoio: res.rows.item(i).tecnologias_apoio,
                            genograma: res.rows.item(i).genograma
                        };
                    }
                } else {
                    console.log("No results found contextos");

                }
            },
            function(err) {

                // exibir mensagem de erro para usuário...
            });
    }
});