angular.module("jmxRtMonApp").directive "prototype", ($compile, ConfigService, PlotStore) ->
    restrict: "E"
    scope:
      model: "="


    template: """
    <span ng-class="{'label-primary': isSelected(), 'label-default': is_numeric, label: is_numeric}" ng-click="toggle()">
      {{model.name}} = <code>{{model.value}}</code>
    </span>
    """

    link: ($scope, iElement, iAttrs, controller) ->
      $scope.is_numeric = true if typeof $scope.model.value == "number"

      $scope.isSelected = ->
        return unless $scope.is_numeric

        plots = ConfigService.get(ConfigService.PLOTS_KEY)
        _(plots).contains $scope.model.path

      $scope.toggle = ->
        return unless $scope.is_numeric

        plots = ConfigService.get(ConfigService.PLOTS_KEY)
        path = $scope.model.path

        if _(plots).contains path
          # Remove from list
          elem = _(plots).find (it) -> it == path
          idx = plots.indexOf(elem)
          plots.splice(idx, 1) if idx > -1
        else
          plots.push path
