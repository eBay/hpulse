###
Copyright 2013 eBay Software Foundation
 
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
 
    http://www.apache.org/licenses/LICENSE-2.0
 
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
###

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
