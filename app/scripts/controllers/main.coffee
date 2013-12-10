'use strict'

angular.module('jmxRtMonApp').controller('MainCtrl', ($scope, $location, ConfigService, JmxRefresher) ->
    $scope.$on('$routeChangeSuccess', ->
        JmxRefresher.disconnect()
    )

    $scope.address = ""

    $scope.goToAddress = ->
        console.log "Go to path"
        ConfigService.set(ConfigService.URL_KEY, $scope.address)
        $location.path("/beans/#{ConfigService.serialize()}")

    return $scope
)