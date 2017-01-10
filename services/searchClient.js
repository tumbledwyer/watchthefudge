(function (app) {
    var serviceId = "searchClient";
    function searchClient($http) {
       var vm = this;

       function init(){
           $http.post("localhost:9999/init").then(function(){
               alert("meow");
           });
           
       }
       return {
           init: init
       }
    }
    app.service(serviceId, ["$http", searchClient]);
})(angular.module("watchthefudge"));