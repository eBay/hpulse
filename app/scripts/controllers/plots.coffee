'use strict'

angular.module('jmxRtMonApp').controller 'PlotsCtrl', ($scope, JmxRefresher, PlotStore) ->
	MAX_HISTORY = 100

    $scope.$on('$routeChangeSuccess', (next, current) ->
        JmxRefresher.connect()
    )

	$scope.$on("JmxRefresher.data_updated", (evt) ->
		_(PlotStore.plots).each (plot) ->
			# Deserialize the path
			path = plot.path
			[bean_name, metric_name] = path.split('|')

			# Find the metric value from the path
			bean = _(JmxRefresher.beans).find (b) -> b.name == bean_name
			metric = bean[metric_name]

			# Build a datapoint
			dp = (
				x: new Date()
				y: metric
			)

			# Add the data in
			if plot.data.push(dp) > MAX_HISTORY
				# We're at capacity
				plot.data.shift()

	)

	$scope.plots = PlotStore.plots
