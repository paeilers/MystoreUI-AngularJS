(function() {
    var viewUserAccountController = function ViewUserAccountController($scope, $log, UserAccountService) { 
    	
        function init() {
        	$scope.userAccount = UserAccountService.getUserAccount();
        }
        
        init();
        
    };
    
    viewUserAccountController.$inject = ['$scope', '$log', 'UserAccountService'];
    
    angular.module('mystoreSpringApp').controller('ViewUserAccountController', viewUserAccountController); 

}());