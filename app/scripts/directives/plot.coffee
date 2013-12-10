'use strict'

angular.module('jmxRtMonApp').directive 'plot', (PlotStore) ->
	restrict: "E"
	replace: true
	scope:
		path: "="

	template: """
	<div class="plot">
		<h3>{{formattedPath()}}</h3>
		<canvas width="800px" height="200px" class="plot_canvas"></canvas>
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

		ts = new TimeSeries()
		$scope.PlotStore = PlotStore
		$scope.$watch("PlotStore", ->
			dp = PlotStore.getLatestDatapoint($scope.path)
			return unless dp
			ts.append dp.x.getTime(), dp.y
		, true)

		smoothie.addTimeSeries(ts, 
			strokeStyle:'rgb(0, 255, 0)'
			linewidth: 3
		)

		$scope.formattedPath = ->
			if $scope.path.match(/^Hadoop:service=/)
				ret = $scope.path.replace('Hadoop:service=', '')
				ret = ret.replace(',name=', '.')
				ret = ret.replace('|', '.')
				return ret
			else
				return $scope.path