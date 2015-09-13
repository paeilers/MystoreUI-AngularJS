(function() {
    var viewSalesOrderController = function ViewSalesOrderController($scope, $http, $q, $routeParams, $location, $log, SalesOrderService, CartService) { 

    	var salesOrderUid = $routeParams.salesOrderUid;
    	$scope.salesOrder = SalesOrderService.getSalesOrder();
   	
        $scope.getExistingSalesOrder = function(salesOrderUid) {
        	
        	// Waiting for HTTP/AJAX call to return (using the promise object) to prevent race condition
        	var soPromise = SalesOrderService.getExistingSalesOrder(salesOrderUid);
        	
        	soPromise.then(function(val) {
        		$scope.salesOrder = val;
        		SalesOrderService.setSalesOrder(val);
        		$location.path("/salesOrder/view/" + salesOrderUid);
        	}, function(reason) {
        		$log.log(reason);
        	});
           		
        }
            	
        $scope.removeOrderItem = function(lineItem) {
        	$scope.salesOrder = SalesOrderService.removeOrderItem(lineItem);
        	$scope.salesOrder.totalItems -= lineItem.itemQuantity;
        	$scope.salesOrder.subTotal -= (lineItem.itemQuantity * lineItem.itemPrice);
        }
        
        $scope.saveBillingAddress = function(salesOrder) {
        	$scope.salesOrder = SalesOrderService.saveBillingAddress(salesOrder);
        	$location.path("/salesOrder/shippingInfo");
        }
        
        $scope.copyBillingToShipping = function(order) {
        	$scope.salesOrder.shipToCity = order.billToCity;
        	$scope.salesOrder.shipToState = order.billToState;
        	$scope.salesOrder.shipToStreetName = order.billToStreetName;
        	$scope.salesOrder.shipToStreetNumber = order.billToStreetNumber;
        	$scope.salesOrder.shipToUnitNumber = order.billToUnitNumber;
        	$scope.salesOrder.shipToZipCode = order.billToZipCode;
        }

        $scope.saveShippingAddress = function(salesOrder) {
        	$scope.salesOrder = SalesOrderService.saveShippingAddress(salesOrder);
        	$location.path("/salesOrder/paymentInfo");
        }
        
        $scope.saveBillingAndShippingAddress = function(salesOrder) {
        	$scope.salesOrder = SalesOrderService.saveBillingAndShippingAddress(salesOrder);
        	$location.path("/salesOrder/paymentInfo");        	
        }
        
        $scope.savePaymentInfo = function(salesOrder) {
        	
        	console.log("Top of controller savePaymentInfo() method...");
        	
        	// Save payment information and copy cart contents to sales order
        	var soPromise;
        	
        	$scope.salesOrder = SalesOrderService.savePaymentInfo(salesOrder);
        	
        	// Calculate the order subTotal to send to server side for calculation of sales tax, shipping & discount
        	var subTotal = 0;
        	var totalItems = 0;
        	for (i = 0; i < salesOrder.lineItems.length; i++) {
        		subTotal += (salesOrder.lineItems[i].itemPrice * salesOrder.lineItems[i].itemQuantity);
        		totalItems += salesOrder.lineItems[i].itemQuantity;
        	}
        	$scope.salesOrder.subTotal = subTotal;
        	SalesOrderService.setSalesOrder($scope.salesOrder);
        		
        	// Waiting for HTTP/AJAX call to return (using the promise object) to prevent race condition        	
        	soPromise = SalesOrderService.calculateSalesOrderSummary(salesOrder);
        	soPromise.then(function(val) {
        		$scope.salesOrder.salesTax = val.salesTax;
        		$scope.salesOrder.shipping = val.shipping;
        		$scope.salesOrder.discount = val.discount;
        		$scope.salesOrder.total = val.total;
        		SalesOrderService.setSalesOrder($scope.salesOrder);
        		$location.path("/salesOrder/review/");
        	}, function(reason) {
        		$log.log(reason);
        	});
        }
        
        $scope.submitSalesOrder = function(salesOrder) {
        	SalesOrderService.submitSalesOrder(salesOrder)
        		.success(function(data, status, headers, config) {
                    $scope.salesOrder = data;
                    SalesOrderService.setSalesOrder(data);
                    $location.path("/salesOrder/confirmation");
                })
                .error(function(data, status, headers, config) {
                    $log.log(data.error + ' ' + status + config);
                });
        }    
    };
    
    viewSalesOrderController.$inject = ['$scope', '$http', '$q', '$routeParams', '$location', '$log', 'SalesOrderService', 'CartService'];
    
    angular.module('mystoreSpringApp').controller('ViewSalesOrderController', viewSalesOrderController); 

}());