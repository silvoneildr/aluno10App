angular.module('app.frequencias', [])
.controller('frequenciasCtrl', function($scope, $ionicModal, $ionicPopover, $stateParams, daoFactory, msgFactory){
    $scope.refresh = function(){
        $scope.listaFrequencias = daoFactory.getFrequencias()
            .filter({ disciplinaId: parseInt($stateParams.disciplinaId)});
    };

    $scope.refresh();

    $scope.disciplina = daoFactory.getDisciplinas()
        .getById(parseInt($stateParams.disciplinaId));
        
    $scope.frequencias = daoFactory.getFrequencias();

    $ionicModal.fromTemplateUrl('app/frequencia/cad_frequencias.html',{
        scope: $scope
    }).then(function(modal){
        $scope.modal = modal;
    });
        
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    
    $scope.closeModal = function() {
        $scope.modal.hide();
    };

    $scope.addRecord = function() {
        $scope.frequencia = {};
        $scope.inserting = true;
        $scope.modal.show();
    };

    $scope.saveRecord = function(){
        $scope.frequencia.disciplinaId = $stateParams.disciplinaId;
        $scope.frequencias.save($scope.frequencia);
        $scope.frequencias.post();
        $scope.closeModal();
        $scope.refresh();
    };
    
    $scope.deleteRecord = function(frequencia){
        msgFactory.confirm('Deseja excluir a frequencia?').then(function(res) {
            if (!res) return;
            $scope.frequencias.delete(frequencia);
            $scope.frequencias.post();
            $scope.refresh();
        });
    };
})