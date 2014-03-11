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

angular.module('jmxRtMonApp').controller 'PlotCtrl', ($scope, JmxRefresher, $location, ConfigService, PlotStore) ->
	$scope.formattedPath = ->
		path = $scope.plot.key
		if path.match(/^Hadoop:service=/)
			path = path.replace('Hadoop:service=', '')
			path = path.replace(',name=', '.')
			path = path.replace('|', '.')

		if $scope.plot.derivative_mode
			path = "Δ " + path

		return path

	# Menu options
	$scope.toggleDetails = ->
		$scope.plot.show_details = !$scope.plot.show_details
		$scope.$emit("ConfigService.request_location_update")

	$scope.titleForToggleDetails = ->
		details = $scope.plot.show_details
		return "Show Details" unless details
		return "Hide Details"

	$scope.toggleDerivative = ->
		$scope.plot.derivative_mode = !$scope.plot.derivative_mode
		$scope.$emit("ConfigService.request_location_update")

	$scope.titleForToggleDerivative = ->
		deriv = $scope.plot.derivative_mode
		return "Plot Derivative" unless deriv
		return "Plot Absolute"

	# Details
	$scope.mostRecentValue = ->
		dp = PlotStore.getLatestDatapoint $scope.plot.key
		return 0 unless dp
		return dp.y

	# Let this controller be explicitly mentioned
	$scope.PlotCtrl = $scope
