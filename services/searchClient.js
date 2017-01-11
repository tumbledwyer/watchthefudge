(function (app) {
    var serviceId = "searchClient";
    function searchClient($http) {
        var vm = this;

        function init() {
            $http.post("http://localhost:9999/init").then(function () {
                alert("Db seeded. Clicking this again will create duplicates");
            });
        }

        function search(searchTo) {
            return $http.post("http://localhost:9999/search", searchTo);
        }

        return {
            init: init,
            search: search
        }
    }
    app.service(serviceId, ["$http", searchClient]);
})(angular.module("watchthefudge"));