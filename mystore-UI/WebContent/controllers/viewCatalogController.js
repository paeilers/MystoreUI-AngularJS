(function() {
    var viewCatalogController = function ViewCatalogController($scope, $http, $routeParams, $log, CatalogService, CartService) { 
    	
        $scope.catalog = {};
        $scope.catalogCategories = [];
        $scope.catalogCategoryItems = [];
        $scope.selectedItem = {};
        
        function init() {
            CatalogService.getCatalog()
                .success(function(data, status, headers, config) {
                    $scope.catalog = data;
                })
                .error(function(data, status, headers, config) {
                    $log.log(data.error + ' ' + status + config);
                });
        }
        
        init();
        
        $scope.addCartItem = function(item) {
        	item.itemQuantity = 1;
        	CartService.addItem(item);        	
        }

    };
    
    viewCatalogController.$inject = ['$scope', '$http', '$routeParams', '$log', 'CatalogService', 'CartService'];
    
    angular.module('mystoreSpringApp').controller('ViewCatalogController', viewCatalogController); 

}());