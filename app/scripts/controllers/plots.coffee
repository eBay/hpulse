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

angular.module('jmxRtMonApp').controller 'PlotsCtrl', ($scope, JmxRefresher, $location, ConfigService, PlotStore) ->
	$scope.JmxRefresher = JmxRefresher
	$scope.$on('$routeChangeSuccess', (next, current) ->
		ConfigService.deserialize($location.search().q)
		JmxRefresher.connect()
	)

	$scope.$on("JmxRefresher.data_updated", (evt, result) ->
		plots = ConfigService.get(ConfigService.PLOTS_KEY)
		_(plots).each (plot) ->
			path = plot.key

			# Deserialize the path
			[bean_name, metric_name] = path.split('|')

			# Find the metric value from the path
			bean = _(result).find (b) -> b.name == bean_name
			metric = bean[metric_name]

			# Build a datapoint
			dp = (
				x: new Date()
				y: metric
			)

			# Add the data in
			PlotStore.addDatapoint(path, dp)
	)

	$scope.$watch("ConfigService.settings", ->
		$scope.plots = ConfigService.get(ConfigService.PLOTS_KEY)
	)

	$scope.removePlot = (plot) ->
		idx = _($scope.plots).indexOf plot
		$scope.plots.splice(idx, 1) if idx > -1
		$scope.$emit("ConfigService.config_changed")

	$scope.PlotsCtrl = $scope