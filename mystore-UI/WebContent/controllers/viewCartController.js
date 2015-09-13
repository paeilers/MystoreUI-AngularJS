(function() {
    var viewCartController = function ViewCartController($scope, $log, $location, CartService, SalesOrderService) { 
    	
        function init() {
        	$scope.cart = CartService.getCart();
        }
        
        init();
        
        $scope.addCartItem = function(item) {
        	CartService.addItem(item);
        }
        
        $scope.removeCartItem = function(item) {
        	CartService.removeItem(item);
        }
        
        $scope.clearCart = function() {
        	CartService.clearCart();
        	$scope.cart = CartService.getCart();
        }
        
        $scope.createSalesOrder = function(cartItems) {
        	$scope.salesOrder = {};
        	$scope.salesOrder.lineItems = [];
        	$scope.salesOrder.totalItems = 0;
        	$scope.salesOrder.subTotal = 0;
        	// Copy cart items into the sales order
        	for (i = 0; i < cartItems.length; i++) {
        		$scope.salesOrder.lineItems[i] = {};
        		$scope.salesOrder.lineItems[i] = cartItems[i];
        		$scope.salesOrder.totalItems += $scope.salesOrder.lineItems[i].itemQuantity;
        		$scope.salesOrder.lineItems[i].extendedPrice = ( $scope.salesOrder.lineItems[i].itemPrice * $scope.salesOrder.lineItems[i].itemQuantity );
        		$scope.salesOrder.subTotal += $scope.salesOrder.lineItems[i].extendedPrice;
        	}
        	SalesOrderService.setSalesOrder($scope.salesOrder);
        	$location.path("/salesOrder/billingAddress");
        }
	    
    };
    
    viewCartController.$inject = ['$scope', '$log', '$location', 'CartService', 'SalesOrderService'];
    
    angular.module('mystoreSpringApp').controller('ViewCartController', viewCartController); 

}());