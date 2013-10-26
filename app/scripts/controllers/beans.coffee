'use strict'

angular.module('jmxRtMonApp').controller 'BeansCtrl', ($scope, JmxRefresher) ->
    $scope.beans = []
    $scope.tree = {}
    $scope.displayTree = {
    	expanded: true
    	name: "Beans"
    	children: []
    }

    $scope.$on('$routeChangeSuccess', (next, current) ->
        JmxRefresher.connect()
    )

    $scope.$on('JmxRefresher.data_updated', (oldval, newval) ->
    	$scope.beans = _(JmxRefresher.beans).pluck("name")
    	_($scope.beans).each (it) ->
    		# Hadoop:service=JobTracker,name=QueueMetrics,q=hdmi-set
    		[toplevel, rest] = it.split(':')

    		# toplevel is Hadoop
    		# rest is service=JobTracker,name=QueueMetrics,q=hdmi-set

    		$scope.tree[toplevel] = {} unless $scope.tree[toplevel]

    		$scope.tree[toplevel][rest] = {} unless $scope.tree[toplevel][rest]

    		bean = _(JmxRefresher.beans).findWhere name: it
    		# return unless bean

    		$scope.tree[toplevel][rest] = bean

    	children = flattenTree($scope.tree, 0)
    	mergeTree($scope.displayTree, {
    		name: "Beans"
    		children: children
    	})
    	# $scope.displayTree.children = flattenTree($scope.tree)

    	# console.log $scope.displayTree
    	$scope.$apply()

    )

    mergeTree = (a, b) ->
    	# Nondestructively update a with b
    	raise 'name mismatch' if a.name != b.name

    	a.value = b.value

    	_(b.children).each (b_child) ->
    		a_child = _(a.children).findWhere name: b_child.name
    		if a_child
    			mergeTree(a_child, b_child)
    		else
    			a.children.push b_child

    flattenTree = (tree, level, memo) ->
    	arr = []

    	# Remember the bean name as we pass through level 2
    	dir = memo
    	if level == 2 && tree.name
    		dir = tree.name

    	# Recurse
    	for k, v of tree
    		if v instanceof Object
    			arr.push {
    				name: k
    				children: flattenTree(v, level+1, "#{dir}|#{k}")
    			}
    		else
    			arr.push {
    				name: k
    				value: v
    				path: "#{dir}|#{k}"
    			}

    	return arr

