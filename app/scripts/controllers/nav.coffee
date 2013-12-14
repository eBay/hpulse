'use strict'

angular.module('jmxRtMonApp').controller('NavCtrl', ($scope, $location, ConfigService) ->
	$scope.goToUrl = (name) ->
		console.log "Go to", name
		$location.path("/#{name}")
		$location.search(
			q: ConfigService.serialize()
		)
)