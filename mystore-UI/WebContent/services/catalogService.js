(function() {
    var CatalogService = function($http) {
        var catalog = {};
        var urlBase = 'http://localhost:9090/mystore';
        var headerConfig = {headers: {
							'Accept': 'application/json;odata=verbose'
        					}};
        
        this.getCatalog = function() {
        	url = urlBase + '/catalog';
            return $http.get(url, headerConfig);            
        };
        
        this.getCatalogProductCategories = function(catalogUid) {
        	url = urlBase + '/catalog/' + catalogUid + '/productCategories';
        	return $http.get(url, headerConfig);
        }

        this.getAllProductCategories = function() {
        	url = urlBase + '/productCategories';
        	return $http.get(url, headerConfig);
        }
        
        this.getProductCategoryItems = function(categoryUid) {
        	url = urlBase + '/productCategories/' + categoryUid + '/productCategoryItems';
        	return $http.get(url, headerConfig);
        }
        
        this.getAllProductCategoryItems = function() {
        	url = urlBase + 'productCategories/productCategoryItems';
        	return $http.get(url, headerConfig);
        }
   };
   
    CatalogService.$inject = ['$http'];
    
    angular.module('mystoreSpringApp').service('CatalogService', CatalogService); 
    
}());