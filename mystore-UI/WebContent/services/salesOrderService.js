(function() {
    var SalesOrderService = function($http, $q) {
        var urlBase = 'http://localhost:9090/mystore';
    	var salesOrder = {};
    	salesOrder.lineItems = [];

    	this.getSalesOrder = function() {
         	return salesOrder;   			 		
        }
    	
    	this.setSalesOrder = function(order) {
    		salesOrder = order;
    		return salesOrder;
    	}
        
    	this.getExistingSalesOrder = function(orderUid) {
    		var deferred = $q.defer();
    		var url = urlBase + '/salesOrders/' + orderUid;
            var headerConfig = {headers: {
            					'Accept': 'application/json;odata=verbose'
            					}};
            //return $http.get(url, headerConfig);
            $http.get(url, headerConfig)
            	.success(function(data, status, headers, config) {
            		deferred.resolve(data);
            	})
            	.error(function(data, status, headers, config) {
            		deferred.reject(status);
            	});
            return deferred.promise;
        }
       
    	this.calculateSalesOrderSummary = function(order) {
    		
    		var deferred = $q.defer();
    		var urlConfig = urlBase + '/salesOrders/review';
    		var headerConfig = {headers: {
            					'Accept': 'application/json'
            					}};
    		
    		$http({
    			method: "GET",
    			url: urlConfig,
    			headers: headerConfig,
    			params: {salesOrder: order}
    		})
            	.success(function(data, status, headers, config) {
            		deferred.resolve(data);
            	})
            	.error(function(data, status, headers, config) {
            		deferred.reject(status);
            	});

            return deferred.promise;
        }

    	this.saveBillingAndShippingAddress = function(order) {
    		
        	salesOrder.billToCity = order.billToCity;
        	salesOrder.billToState = order.billToState;
        	salesOrder.billToStreetName = order.billToStreetName;
        	salesOrder.billToStreetNumber = order.billToStreetNumber;
        	salesOrder.billToUnitNumber = order.billToUnitNumber;
        	salesOrder.billToZipCode = order.billToZipCode;
        	
        	salesOrder.shipToCity = order.billToCity;
        	salesOrder.shipToState = order.billToState;
        	salesOrder.shipToStreetName = order.billToStreetName;
        	salesOrder.shipToStreetNumber = order.billToStreetNumber;
        	salesOrder.shipToUnitNumber = order.billToUnitNumber;
        	salesOrder.shipToZipCode = order.billToZipCode;
        	
        	return salesOrder;
    		
    	}
    	
        this.saveBillingAddress = function(order) {
        	salesOrder.billToCity = order.billToCity;
        	salesOrder.billToState = order.billToState;
        	salesOrder.billToStreetName = order.billToStreetName;
        	salesOrder.billToStreetNumber = order.billToStreetNumber;
        	salesOrder.billToUnitNumber = order.billToUnitNumber;
        	salesOrder.billToZipCode = order.billToZipCode;
        	
        	return salesOrder;
        }
        
        this.saveShippingAddress = function(order) {
        	salesOrder.shipToCity = order.billToCity;
        	salesOrder.shipToState = order.billToState;
        	salesOrder.shipToStreetName = order.billToStreetName;
        	salesOrder.shipToStreetNumber = order.billToStreetNumber;
        	salesOrder.shipToUnitNumber = order.billToUnitNumber;
        	salesOrder.shipToZipCode = order.billToZipCode;
        	
        	return salesOrder;
        }
        
        this.copyBillingToShipping = function(order) {
        	salesOrder.shipToCity = order.shipToCity;
        	salesOrder.shipToState = order.shipToState;
        	salesOrder.shipToStreetName = order.shipToStreetName;
        	salesOrder.shipToStreetNumber = order.shipToStreetNumber;
        	salesOrder.shipToUnitNumber = order.shipToUnitNumber;
        	salesOrder.shipToZipCode = order.shipToZipCode;
        	
        	return salesOrder;
        	
        }

        this.savePaymentInfo = function(order) {
        	salesOrder.creditCardCsv = order.creditCardCsv;
        	salesOrder.creditCardExpiruYear = order.expiryYear;
        	salesOrder.creditCardNumber = order.creditCardNumber
        	salesOrder.creditCardType = order.creditCardType
        	salesOrder.nameOnCreditCard = order.nameOnCreditCard
        	salesOrder.promoCode = order.promoCode
        	salesOrder.emailAddress = order.emailAddress;  		
        	
         	return salesOrder;
        }

        this.submitSalesOrder = function(salesOrder) {
        	var jsonSalesOrder = angular.toJson(salesOrder);
        	var urlConfig = urlBase + '/salesOrders';
    		var headerConfig = {headers: {
            					'Accept': 'application/json',
            					'Content-Type': 'application/json'
            					}};
    		return $http({
    			method: "POST",
    			url: urlConfig,
    			headers: headerConfig,
    			data: jsonSalesOrder
    		});

    }
        
        this.removeOrderItem = function(item) {
	    	var index = salesOrder.lineItems.indexOf(item);
            salesOrder.lineItems.splice(index,1);
            // Need to recalculate summary fields
            return salesOrder;
        }

    };
   
    SalesOrderService.$inject = ['$http', '$q'];
    
    angular.module('mystoreSpringApp').service('SalesOrderService', SalesOrderService); 
    
}());