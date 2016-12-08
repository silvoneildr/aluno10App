angular.module('app.alunos.disciplinas', [])
.controller('alunos_disciplinasCtrl', function($scope, $stateParams, $ionicModal, daoFactory, msgFactory){

	$scope.disciplinas = daoFactory.getDisciplinas();
	$scope.disciplina = daoFactory.getDisciplinas().getById(parseInt($stateParams.id));
	$scope.alunos = daoFactory.getAlunos();
	$scope.selected = false;
		
	$ionicModal.fromTemplateUrl('app/views/addAlunos.html', {
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

	$scope.showAlunos = function(){
		for (var i = 0; i < $scope.alunos.data.length ; i++) {
			$scope.alunos.data[i].isChecked = false;
		}
		$scope.modal.show();
	};

	$scope.checkAll = function(){
		$scope.selected = !$scope.selected;
		for (var i = 0; i < $scope.alunos.data.length ; i++) {
			$scope.alunos.data[i].isChecked = $scope.selected; 
		}
	};

	$scope.addAlunos = function(){
		
		if (!$scope.disciplina.alunos){
			$scope.disciplina.alunos = [];
		};
			
		for (var i = 0; i < $scope.alunos.data.length ; i++) {
			for (var j = 0; j < $scope.disciplina.alunos.length ; j++) {
				if ($scope.disciplina.alunos[j] === $scope.alunos.data[i]){
					return;
				}
			}
			if ($scope.alunos.data[i].isChecked){
				$scope.disciplina.alunos.push($scope.alunos.data[i]);
			}
		};
		
		$scope.disciplinas.save($scope.disciplina);
        $scope.disciplinas.post();
        $scope.closeModal();
	};

	$scope.deleteAluno = function(aluno){
		//
	};
});