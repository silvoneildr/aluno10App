angular.module('app.dao',[])
    .factory('daoFactory', function() {
    var db = new DbFactory(DbProxies.LOCALSTORAGE),
        alunos = db.createDataSet('alunos'),
        escolas = db.createDataSet('escolas'),
        disciplinas = db.createDataSet('disciplinas'),
        turmas = db.createDataSet('turmas');
    
    return {
        getAlunos: function() {
            return alunos.open();
        },
        getEscolas: function() {
            return escolas.open();
        },
        getDisciplinas: function() {
            return disciplinas.open();
        },
        getTurmas: function(){
            return turmas.open();
        }
    }
});