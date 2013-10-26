'use strict'

angular.module('jmxRtMonApp').factory('PlotStore', ($timeout, $rootScope) ->
	self = {}

	self.plots = []

	self.toggle = (path, enable) ->
		if enable
			# Add to plots
			self.plots.push {
				path: path
				data: []
			}
		else
			elem = _(self.plots).find (it) -> it.path == path
			idx = self.plots.indexOf(elem)
			self.plots.splice(idx, 1) if idx > -1

	return self
)