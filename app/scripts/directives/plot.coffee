'use strict'

angular.module('jmxRtMonApp').directive 'plot', ->
	restrict: "E"
	replace: true
	scope:
		path: "="

	template: """
	<div class="plot">
		<h3>{{path.path}}</h3>
		<div>
			<code>avg = {{avg_val() | number: 2}}</code>
		</div>
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
		$scope.$watch("path.data", ->
			dp = _.last($scope.path.data)
			return unless dp
			ts.append dp.x.getTime(), dp.y
		, true)

		smoothie.addTimeSeries(ts, 
			strokeStyle:'rgb(0, 255, 0)'
			linewidth: 3
		)

		$scope.avg_val = ->
			sum = _($scope.path.data).reduce ((memo, num) -> 
				memo + num.y
			), 0
			return sum / $scope.path.data.length

		# nv.addGraph ->
		# 	$scope.chart = nv.models.lineChart()

		# 	$scope.chart.xAxis.axisLabel("Time").tickFormat( (d) -> d3.time.format('%X.%L')(new Date(d)) );

		# 	return $scope.chart

		# $scope.$watch("path.data", ->
		# 	d3.select(svg).datum([
		# 		(
		# 			key: $scope.path.path
		# 			values: $scope.path.data
		# 		)
		# 	]).call($scope.chart)
		# , true)
