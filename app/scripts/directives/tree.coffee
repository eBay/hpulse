angular.module("jmxRtMonApp").directive "tree", ($compile) ->
    restrict: "E"
    scope:
      model: "="

    template: """
      <span class="pointable">
        <span ng-click="model.expanded = !model.expanded">
          <span ng-show="model.children && !model.expanded"> <i class="fa fa-caret-right"></i> </span>
          <span ng-show="model.children &&  model.expanded"> <i class="fa fa-caret-down"></i> </span>
          <span ng-show="model.children">
            {{model.name}}
          </span>
          <span ng-show="!model.children">
            <prototype model="model"></prototype>
          </span>
        </span>
        <div style="padding-left: 15px" ng-repeat="child in model.children" ng-show="model.expanded">
          <tree model="child"></tree>
        </div>
      </span>
    """

    compile: (tElement, tAttr) ->
      contents = tElement.contents().remove()
      compiledContents = undefined
      (scope, iElement, iAttr) ->
        compiledContents = $compile(contents)  unless compiledContents
        compiledContents scope, (clone, scope) ->
          iElement.append clone
