'use strict'

angular.module('jmxRtMonApp').controller('MainCtrl', ($scope, $location, ConfigService, JmxRefresher) ->
    $scope.$on('$routeChangeSuccess', ->
        JmxRefresher.disconnect()
    )

    $scope.address = ""

    $scope.goToAddress = ->
        ConfigService.set(ConfigService.URL_KEY, $scope.address)
        $location.path("/beans")
        $location.search(
        	q: ConfigService.serialize()
        )

    return $scope
)