angular.module("jmxRtMonApp").directive "prototype", ($compile, PlotStore) ->
    restrict: "E"
    scope:
      model: "="


    template: """
    <span ng-class="{'label-primary': selected, 'label-default': is_numeric, label: is_numeric}" ng-click="toggle()">
      {{model.name}} = <code>{{model.value}}</code>
    </span>
    """

    link: ($scope, iElement, iAttrs, controller) ->
      $scope.is_numeric = true if typeof $scope.model.value == "number"

      $scope.toggle = ->
        return unless $scope.is_numeric
        $scope.selected = !$scope.selected
        PlotStore.toggle($scope.model.path, $scope.selected)
