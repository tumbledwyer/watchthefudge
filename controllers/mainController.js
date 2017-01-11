(function (app) {
    var controllerId = "mainController";
    function mainController(searchClient) {
       var vm = this;

       vm.price = 0;       

       vm.init = function(){
           searchClient.init();
       }

       vm.search = function(){
           var searchTo = createSearchTo();
           searchClient.search(searchTo).then(function(results){
               vm.searchResult = results.data;
           });
       }  

       function createSearchTo(){
           return {
               searchText: vm.searchText,
               priceMax: vm.price,
               oneYear: vm.oneYear,
               threeYear: vm.threeYear
           }
       } 

    }
    app.controller(controllerId, ["searchClient", mainController]);
})(angular.module("watchthefudge"));