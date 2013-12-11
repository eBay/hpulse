'use strict'

angular.module('jmxRtMonApp').controller 'PlotsCtrl', ($scope, JmxRefresher, $routeParams, ConfigService, PlotStore) ->
	$scope.plots = ->
		ConfigService.get(ConfigService.PLOTS_KEY)

	$scope.JmxRefresher = JmxRefresher
	$scope.$on('$routeChangeSuccess', (next, current) ->
		ConfigService.deserialize($routeParams.config)
		JmxRefresher.connect()
	)

	$scope.$on("JmxRefresher.data_updated", (evt, result) ->
		plots = ConfigService.get(ConfigService.PLOTS_KEY)
		_(plots).each (path) ->
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

