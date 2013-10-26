'use strict'

angular.module('jmxRtMonApp').controller 'MainCtrl', ($scope, $routeParams, JmxRefresher) ->

    $scope.$on('$routeChangeSuccess', (next, current) ->
        JmxRefresher.connect()
        console.log "Connected"
    )
