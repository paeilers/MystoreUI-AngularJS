(function() {
	
    var app = angular.module('mystoreSpringApp', ['ngRoute']);
    
    app.config(function($httpProvider, $routeProvider) {  
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.withCredentials = true;
        delete $httpProvider.defaults.headers.common["X-Requested-With"];
        $httpProvider.defaults.headers.common["Accept"] = "application/json";
        $httpProvider.defaults.headers.common["Content-Type"] = "application/json";        
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html'
            })
            .when('/salesOrder/view/:salesOrderUid', {
                controller: 'ViewSalesOrderController',
                templateUrl: 'views/viewSalesOrder.html'
            })
             .when('/catalog/view', {
                controller: 'ViewCatalogController',
                templateUrl: 'views/viewCatalog.html'
            })
            .when('/cart/view', {
            	controller: 'ViewCartController',
            	templateUrl: 'views/viewCart.html'
            })
            .when('/account/login', {
                controller: 'accountLoginController',
                templateUrl: 'views/viewAccountLogin.html'
            })
            .when('/salesOrder/create', {
                controller: 'ViewSalesOrderController',
                templateUrl: 'views/viewBillingAddress.html'
            })
            .when('/salesOrder/billingAddress', {
                controller: 'ViewSalesOrderController',
                templateUrl: 'views/viewBillingAddress.html'
            })
             .when('/salesOrder/shippingInfo', {
                controller: 'ViewSalesOrderController',
                templateUrl: 'views/viewShippingInfo.html'
            })
            .when('/salesOrder/paymentInfo', {
                controller: 'ViewSalesOrderController',
                templateUrl: 'views/viewPaymentInfo.html'
            })
             .when('/salesOrder/review', {
                controller: 'ViewSalesOrderController',
                templateUrl: 'views/viewReviewSalesOrder.html'
            })
            .when('/salesOrder/confirmation', {
                controller: 'ViewSalesOrderController',
                templateUrl: 'views/viewSalesOrderConfirmation.html'
            })
        .otherwise({redirectTo: '/'});
    });

    
}());