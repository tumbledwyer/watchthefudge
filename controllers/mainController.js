(function (app) {
    var controllerId = "mainController";
    function mainController(searchClient) {
       var vm = this;

       vm.init = function(){
           searchClient.init();
       }

       vm.search = function(text){
           searchClient.search(text).then(function(results){
               vm.searchResult = results.data;
           });
       }   

    }
    app.controller(controllerId, ["searchClient", mainController]);
})(angular.module("watchthefudge"));