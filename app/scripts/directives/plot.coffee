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

angular.module('jmxRtMonApp').directive 'plot', (PlotStore) ->
	restrict: "E"
	replace: true
	scope:
		settings: "="

	template: """
	<div class="plot">
		<div>
			<canvas width="800px" height="200px" class="plot_canvas"></canvas>
		</div>
	</div>
	"""

	link: ($scope, iElement, iAttrs, controller) ->
		canvas = iElement.find('.plot_canvas')[0]
		smoothie = new SmoothieChart(
			maxValueScale: 1.2
			interpolation: 'linear'
			minValue: 0
			millisPerPixel:100
		)
		smoothie.streamTo(canvas, 300)

		$scope.ts = new TimeSeries()
		$scope.PlotStore = PlotStore
		$scope.$watch("PlotStore", ->
			dp = null

			if $scope.settings.derivative_mode
				# Add the difference
				dp = PlotStore.getLatestDifference($scope.settings.key)
			else
				# Add the absolute value
				dp = PlotStore.getLatestDatapoint($scope.settings.key)

			return unless dp
			$scope.ts.append dp.x.getTime(), dp.y
		, true)

		$scope.$watch("settings.derivative_mode", ->
			console.log "Deriv mode changed"
			# Remove existing timeseries
			smoothie.removeTimeSeries($scope.ts)

			$scope.ts = new TimeSeries()
			smoothie.addTimeSeries($scope.ts, 
				strokeStyle:'rgb(0, 255, 0)'
				linewidth: 3
			)

		)