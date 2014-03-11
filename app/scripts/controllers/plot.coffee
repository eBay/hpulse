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

	$scope.boundsExist = ->
		($scope.plot.minY or $scope.plot.minY is 0) or ($scope.plot.maxY or $scope.plot.maxY is 0)

	# This function can be called as many times an necessary, but will commit only once the requisite
	# time has passed
	$scope.updatefn = _.debounce(->
		$scope.$emit("ConfigService.request_location_update")
	, 1000)

	$scope.$watch('plot.minY + plot.maxY', ->
		# We want to persist the changes, but not on every update. Instead we will debounce so that
		# we don't flood the ConfigService with location updates
		$scope.updatefn()
	)

	$scope.titleForToggleBounds = ->
		if $scope.boundsExist()
			return "Remove Y Bounds"
		else
			return "Pin Y Axis"

	$scope.toggleBounds = ->
		if $scope.boundsExist()
			# Get rid of our bounds
			delete $scope.plot["minY"]
			delete $scope.plot["maxY"]
		else
			$scope.plot.minY = 0
			$scope.plot.maxY = NaN

		$scope.$emit("ConfigService.request_location_update")

	# Details
	$scope.mostRecentValue = ->
		dp = PlotStore.getLatestDatapoint $scope.plot.key
		return 0 unless dp
		return dp.y

	# Let this controller be explicitly mentioned
	$scope.PlotCtrl = $scope
