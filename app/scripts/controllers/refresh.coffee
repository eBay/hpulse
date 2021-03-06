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

angular.module('jmxRtMonApp').controller 'RefreshCtrl', ($scope, JmxRefresher, $location, ConfigService, PlotStore) ->
	$scope.JmxRefresher = JmxRefresher
	$scope.$on('$routeChangeSuccess', (next, current) ->
		console.log "Refresh?", $scope.once
		ConfigService.deserialize()
		if $scope.once
			JmxRefresher.disconnect()
			JmxRefresher.fetch_data()
		else
			JmxRefresher.connect()
	)

	$scope.RefreshCtrl = $scope