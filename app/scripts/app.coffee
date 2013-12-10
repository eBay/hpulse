'use strict'

angular.module('jmxRtMonApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize'
]).config( ($routeProvider) ->
  $routeProvider
    .when '/beans/:config',
      templateUrl: 'views/beans.html'
      controller: 'BeansCtrl'
      tabname: 'beans'
    .when '/plots/:config',
      templateUrl: 'views/plots.html'
      controller: 'PlotsCtrl'
      tabname: 'plots'
    .when '/',
      templateUrl: 'views/main.html'
      controller: 'MainCtrl'
      tabname: 'home'
    .otherwise
      redirectTo: '/'
).run( ($rootScope, $route) ->
  # Expose location to the root scope so we can check our url anywhere
  $rootScope.$route = $route
)
