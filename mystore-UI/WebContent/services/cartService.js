(function() {
    var CartService = function() {
    	
        var cart = {};
        cart.items = [];
        cart.totalItems = 0;
        cart.totalPrice = 0;

        this.getCart = function() {
            return cart;            
        };
        
        this.addItem = function(item) {
        	var index = cart.items.indexOf(item);
        	if (index != -1) {
        		cart.totalItems = cart.totalItems + item.itemQuantity;
        		cart.items[index].itemQuantity = cart.items[index].itemQuantity + item.itemQuantity;
        	} else {
             	var i = cart.items.length;
        		item.index = i;
        		cart.totalItems = cart.totalItems + item.itemQuantity;
                cart.items.push(item);        		
        	}
    		cart.totalPrice = cart.totalPrice + (item.itemQuantity * item.itemPrice);
         }
        
        this.removeItem = function(item) {
	    	var index = cart.items.indexOf(item);
	    	cart.totalItems = cart.totalItems - item.itemQuantity;
    		cart.totalPrice = cart.totalPrice - (item.itemQuantity * item.itemPrice);
            cart.items.splice(index,1);
        }
        
        // This function is never called...
        this.updateItem = function(item) {
    		cart.totalPrice = 0;
    		cart.totalItems = 0;
    		if (index != -1) {
        		cart.items[index].itemQuantity = item.itemQuantity;
        		for (i = 0; i < cart.items.length; i++) {
            		cart.totalPrice = cart.totalPrice + (cart.items[i].itemQuantity * cart.items[i].itemPrice);
            		cart.totalItems = cart.totalItems + cart.items[i].itemQuantity;
        		}
        	} 
        }
        
        this.clearCart = function() {
        	cart = {};
        	cart.items = [];
        	cart.totalItems = 0;
        	cart.totalPrice = 0;
        }
        
   };
   
    CartService.$inject = [];
    
    angular.module('mystoreSpringApp').service('CartService', CartService); 
    
}());