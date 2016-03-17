angular.module('starter.controllers')

.controller('IndexCtrl', function($scope, $timeout, $cordovaSQLite, $state) {
    // alert('index ctrl 1');
    $scope.comecar = function() {
    	var db = null;
		    if (window.cordova) {
		        db = $cordovaSQLite.openDB({
		            name: "cuidato.db"
		        }); // device
		    } else {
		        db = window.openDatabase("cuidato.db", '1', 'cuidato', 1024 * 1024 * 100); // browser
		    }
    	// alert('comecar init');
        var query = "UPDATE identificadores SET status = 1 WHERE id = 1";
        // var fields = [
        //     'is_apresentacao_visualizada', 1
        // ];
        $cordovaSQLite.execute(db, query).then(function(res) {
            // alert('Identificador is_apresentacao_visualizada criado com sucesso 2.');
            $state.go('app.articulacao');
        }, function(err) {
            // alert('Ocorreu um erro ao criar o identificador is_apresentacao_visualizada 2.');
        });
    };
    // var db = null;
    // if (window.cordova) {
    //     db = $cordovaSQLite.openDB({
    //         name: "cuidato.db"
    //     }); // device
    // } else {
    //     db = window.openDatabase("cuidato.db", '1', 'cuidato', 1024 * 1024 * 100); // browser
    // }

    // var query = "SELECT status FROM identificadores WHERE identificador = 'is_apresentacao_visualizada'";
    // $cordovaSQLite.execute(db, query).then(function(res) {
    //     alert('success 11');
    //     if (res.rows.length > 0) {
    //         if (res.rows.item(0).status == 1) {
    //         	alert('Apresentacao já visualizada.');
    //         	$state.go('app.articulacao');
    //         } else {
    //         	alert('Apresentacao nao visualizada.');
    //         }
    //     } else {
    //         alert("No results found");
    //     }
    // }, function(err) {
    //     alert('error 11');
    // });

});