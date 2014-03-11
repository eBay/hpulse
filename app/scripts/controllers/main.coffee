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

angular.module('jmxRtMonApp').controller('MainCtrl', ($scope, $location, ConfigService, JmxRefresher) ->
	$scope.$on('$routeChangeSuccess', ->
		JmxRefresher.disconnect()
	)

	$scope.address = ConfigService.settings.url

	$scope.goToAddress = ->
		ConfigService.set(ConfigService.URL_KEY, $scope.address)
		$location.path("/beans")
		$location.search(
			q: ConfigService.serialize()
		)

	$scope.MainCtrl = $scope
	return $scope
)