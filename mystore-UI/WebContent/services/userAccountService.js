(function() {
    var UserAccountService = function($http) {
        var urlBase = 'http://localhost:9090/mystore';
        var userAccount = {};
        
        this.getUserAccount = function(userAccountUid) {
            var url = urlBase + '/userAccounts/' + userAccountUid;
            var headerConfig = {headers: {
            					'Accept': 'application/json;odata=verbose'
            }};
            return $http.get(url, headerConfig);        
        };

    };
   
    UserAccountService.$inject = ['$http'];
    
    angular.module('mystoreSpringApp').service('UserAccountService', UserAccountService); 
    
}());