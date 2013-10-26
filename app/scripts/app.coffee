'use strict'

angular.module('jmxRtMonApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize'
]).config( ($routeProvider) ->
  $routeProvider
    .when '/beans',
      templateUrl: 'views/beans.html'
      controller: 'BeansCtrl'
      tabname: 'beans'
    .when '/plots',
      templateUrl: 'views/plots.html'
      controller: 'PlotsCtrl'
      tabname: 'plots'
    .otherwise
      redirectTo: '/beans'
).run( ($rootScope, $route) ->
  # Expose location to the root scope so we can check our url anywhere
  $rootScope.$route = $route
)
