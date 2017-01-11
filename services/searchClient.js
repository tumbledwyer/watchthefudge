(function (app) {
    var serviceId = "searchClient";
    function searchClient($http) {
        var vm = this;

        function init() {
            $http.post("http://localhost:9999/init").then(function () {
                alert("meow");
            });
        }

        function search(text) {
            return $http.post("http://localhost:9999/search",
                { searchText: text }
            );
        }
        
        return {
            init: init,
            search: search
        }
    }
    app.service(serviceId, ["$http", searchClient]);
})(angular.module("watchthefudge"));