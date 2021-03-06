###
Copyright 2013 eBay Software Foundation
 
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
 
		http://www.apache.org/licenses/LICENSE-2.0
 
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
###

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
			reloadOnSearch: false
		.when '/plots',
			templateUrl: 'views/plots.html'
			controller: 'PlotsCtrl'
			tabname: 'plots'
			reloadOnSearch: false
		.when '/faq',
			templateUrl: 'views/faq.html'
			tabname: 'faq'
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
