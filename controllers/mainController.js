(function (app) {
    var controllerId = "mainController";
    function mainController(searchClient) {
       var vm = this;

       vm.init = function(){
           searchClient.init();
       }   

    }
    app.controller(controllerId, ["searchClient", mainController]);
})(angular.module("watchthefudge"));